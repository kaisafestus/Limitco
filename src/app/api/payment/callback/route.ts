import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Log the callback for debugging
    console.log('Payhero Payment Callback:', body);
    
    // Extract relevant callback data
    const {
      checkout_request_id,
      merchant_request_id,
      result_code,
      result_description,
      transaction_id,
      amount,
      phone_number,
      account_reference,
      status
    } = body;

    // Process the payment result
    if (result_code === '0' || status === 'completed') {
      // Payment successful
      console.log(`Payment successful: ${transaction_id} for KES ${amount}`);
      
      // Here you would typically:
      // 1. Update database with payment status
      // 2. Send confirmation SMS/email
      // 3. Update user's Fuliza limit
      // 4. Send webhook to frontend
      
      return NextResponse.json({
        success: true,
        message: 'Payment processed successfully',
        transaction_id,
        status: 'completed'
      });
      
    } else {
      // Payment failed
      console.log(`Payment failed: ${result_description}`);
      
      return NextResponse.json({
        success: false,
        message: result_description || 'Payment failed',
        status: 'failed'
      });
    }
    
  } catch (error) {
    console.error('Payment callback error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Callback processing failed'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  return NextResponse.json({
    message: 'Payhero payment callback endpoint',
    status: 'active'
  });
}
