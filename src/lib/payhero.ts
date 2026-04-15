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
    return false;
  }
  
  return true;
};

// Payment request interface
export interface PaymentRequest {
  amount: number;
  phoneNumber: string;
  externalReference: string;
  customerName: string;
  callbackUrl?: string;
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

// Format phone number for Payhero
export const formatPhoneNumberForPayhero = (phone: string): string => {
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Handle different formats
  if (cleaned.startsWith('254') && cleaned.length === 12) {
    return cleaned; // Already in correct format
  } else if (cleaned.startsWith('0') && cleaned.length === 10) {
    return '254' + cleaned.substring(1); // Convert 07XX... to 2547XX...
  } else if (cleaned.startsWith('7') && cleaned.length === 9) {
    return '254' + cleaned; // Convert 7XX... to 2547XX...
  } else if (cleaned.startsWith('+254') && cleaned.length === 13) {
    return cleaned.substring(1); // Remove + from +254...
  }
  
  return cleaned; // Return as-is if no pattern matches
};

// Initiate Payhero STK Push
export async function initiatePayheroPayment(paymentData: PaymentRequest): Promise<PaymentResponse> {
  try {
    // Validate configuration
    if (!validatePayheroConfig()) {
      return {
        success: false,
        message: 'Payhero configuration is incomplete. Please check environment variables.',
      };
    }
    
    console.log('Initiating Payhero payment with data:', paymentData);
    
    const response = await fetch(`${PAYHERO_CONFIG.BASE_URL}/api/v2/payments`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': PAYHERO_CONFIG.BASIC_AUTH_TOKEN,
      },
      body: JSON.stringify({
        amount: paymentData.amount,
        phone_number: paymentData.phoneNumber,
        channel_id: parseInt(PAYHERO_CONFIG.CHANNEL_ID),
        provider: "m-pesa",
        external_reference: paymentData.externalReference,
        customer_name: paymentData.customerName,
        callback_url: paymentData.callbackUrl || PAYHERO_CONFIG.CALLBACK_URL,
      }),
    });

    const result = await response.json();
    console.log('Payhero API response:', result);

    if (response.ok && result.success) {
      return {
        success: true,
        message: result.message || 'Payment initiated successfully',
        transactionId: result.transaction_id,
        checkoutRequestID: result.checkout_request_id,
        merchantRequestID: result.merchant_request_id,
        responseCode: result.response_code,
        responseDescription: result.response_description,
      };
    } else {
      return {
        success: false,
        message: result.message || 'Payment initiation failed',
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
    const response = await fetch(`${PAYHERO_CONFIG.BASE_URL}/api/v1/transaction/status/${checkoutRequestID}`, {
      method: 'GET',
      headers: {
        'Authorization': PAYHERO_CONFIG.BASIC_AUTH_TOKEN,
      },
    });

    const result = await response.json();

    if (response.ok) {
      return {
        success: result.status === 'completed',
        message: result.message || 'Status checked successfully',
        transactionId: result.transaction_id,
        responseCode: result.response_code,
        responseDescription: result.response_description,
      };
    } else {
      return {
        success: false,
        message: result.message || 'Status check failed',
      };
    }
  } catch (error) {
    console.error('Payhero status check error:', error);
    return {
      success: false,
      message: 'Status check service unavailable',
    };
  }
}
