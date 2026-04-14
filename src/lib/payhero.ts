// Payhero Payment Integration Configuration
export const PAYHERO_CONFIG = {
  API_USERNAME: process.env.PAYHERO_API_USERNAME || "",
  API_PASSWORD: process.env.PAYHERO_API_PASSWORD || "",
  ACCOUNT_ID: process.env.PAYHERO_ACCOUNT_ID || "",
  BASIC_AUTH_TOKEN: process.env.PAYHERO_BASIC_AUTH_TOKEN || "",
  CHANNEL_ID: process.env.PAYHERO_CHANNEL_ID || "",
  ACCOUNT_NUMBER: process.env.PAYHERO_ACCOUNT_NUMBER || "",
  CALLBACK_URL: process.env.PAYHERO_CALLBACK_URL || "",
  BASE_URL: process.env.PAYHERO_BASE_URL || "https://backend.payhero.co.ke"
};

// Validate environment variables
export const validatePayheroConfig = () => {
  const missing = [];
  
  if (!PAYHERO_CONFIG.API_USERNAME) missing.push('PAYHERO_API_USERNAME');
  if (!PAYHERO_CONFIG.API_PASSWORD) missing.push('PAYHERO_API_PASSWORD');
  if (!PAYHERO_CONFIG.CHANNEL_ID) missing.push('PAYHERO_CHANNEL_ID');
  
  if (missing.length > 0) {
    console.error('Missing Payhero environment variables:', missing);
    console.error('Please add these to your Vercel environment variables');
    return false;
  }
  
  return true;
};

// Generate Basic Auth token from username and password
export const getBasicAuthToken = () => {
  const username = PAYHERO_CONFIG.API_USERNAME;
  const password = PAYHERO_CONFIG.API_PASSWORD;
  
  // Try multiple authentication methods
  const methods = [
    // Method 1: Pre-encoded token
    PAYHERO_CONFIG.BASIC_AUTH_TOKEN,
    
    // Method 2: Manual encoding
    `Basic ${Buffer.from(`${username}:${password}`).toString('base64')}`,
    
    // Method 3: URL-safe encoding
    `Basic ${Buffer.from(`${username}:${password}`).toString('base64').replace(/\+/g, '-').replace(/\//g, '_')}`,
  ];
  
  // Debug all methods
  console.log('Payhero Auth Debug - All Methods:');
  console.log('Username:', username);
  console.log('Password:', password ? '***' : 'MISSING');
  console.log('Method 1 (Pre-encoded):', methods[0]);
  console.log('Method 2 (Manual):', methods[1]);
  console.log('Method 3 (URL-safe):', methods[2]);
  
  // Return the pre-encoded token if available, otherwise try manual
  return methods[0] || methods[1];
};

// Payment request interface
export interface PaymentRequest {
  amount: number;
  phoneNumber: string;
  externalReference: string;
  customerName: string;
  callbackUrl: string;
}

// Payment response interface
export interface PaymentResponse {
  success: boolean;
  message?: string;
  transactionId?: string;
  checkoutRequestID?: string;
  merchantRequestID?: string;
  responseCode?: string;
  responseDescription?: string;
}

// Initiate Payhero STK Push
export async function initiatePayheroPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    // Validate configuration before making request
    if (!validatePayheroConfig()) {
      return {
        success: false,
        message: 'Payhero configuration is incomplete. Please check environment variables.',
      };
    }
    
    const response = await fetch(`${PAYHERO_CONFIG.BASE_URL}/api/v2/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': getBasicAuthToken(),
      },
      body: JSON.stringify({
        amount: paymentData.amount,
        phone_number: paymentData.phoneNumber,
        channel_id: PAYHERO_CONFIG.CHANNEL_ID,
        provider: "m-pesa",
        external_reference: paymentData.externalReference,
        customer_name: paymentData.customerName,
        callback_url: paymentData.callbackUrl,
      }),
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || 'Payment initiated successfully',
        transactionId: result.transaction_id,
        checkoutRequestID: result.checkout_request_id,
        merchantRequestID: result.merchant_request_id,
      };
    } else {
      return {
        success: false,
        message: result.message || 'Failed to initiate payment',
        responseCode: result.response_code,
        responseDescription: result.response_description,
      };
    }
  } catch (error) {
    console.error('Payhero payment error:', error);
    return {
      success: false,
      message: 'Payment service unavailable',
    };
  }
}

// Check payment status
export async function checkPaymentStatus(checkoutRequestID: string): Promise<PaymentResponse> {
  try {
    const response = await fetch(`${PAYHERO_CONFIG.BASE_URL}/v1/transaction/status/${checkoutRequestID}`, {
      method: 'GET',
      headers: {
        'Authorization': getBasicAuthToken(),
      },
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: result.status === 'completed',
        message: result.message || 'Status checked successfully',
        transactionId: result.transaction_id,
        responseCode: result.status,
        responseDescription: result.status_description,
      };
    } else {
      return {
        success: false,
        message: 'Failed to check payment status',
      };
    }
  } catch (error) {
    console.error('Payment status check error:', error);
    return {
      success: false,
      message: 'Status check service unavailable',
    };
  }
}

// Format phone number for Payhero (remove +254 and ensure 10 digits)
export function formatPhoneNumberForPayhero(phone: string): string {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // If starts with 254, remove it
  if (cleaned.startsWith('254')) {
    return cleaned.substring(2);
  }
  
  // If starts with 0, keep it (Kenyan format)
  if (cleaned.startsWith('0')) {
    return cleaned;
  }
  
  // If 9 digits, add 0 at beginning
  if (cleaned.length === 9) {
    return '0' + cleaned;
  }
  
  return cleaned;
}
