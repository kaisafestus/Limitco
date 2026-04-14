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

// Generate Basic Auth token from username and password
export const getBasicAuthToken = () => {
  // First try the pre-encoded token if available
  if (PAYHERO_CONFIG.BASIC_AUTH_TOKEN) {
    console.log('Using pre-encoded Basic Auth token');
    return PAYHERO_CONFIG.BASIC_AUTH_TOKEN;
  }
  
  // Fallback to generating from username/password
  const username = PAYHERO_CONFIG.API_USERNAME;
  const password = PAYHERO_CONFIG.API_PASSWORD;
  const credentials = `${username}:${password}`;
  const token = `Basic ${Buffer.from(credentials).toString('base64')}`;
  
  // Debug logging
  console.log('Payhero Auth Debug:');
  console.log('Username:', username);
  console.log('Password:', password ? '***' : 'MISSING');
  console.log('Credentials:', credentials);
  console.log('Generated Token:', token);
  
  return token;
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
