import { NextResponse } from 'next/server'
import { initiatePayheroPayment } from '@/lib/payhero'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const result = await initiatePayheroPayment(body)

    return NextResponse.json(result, {
      status: result.success ? 200 : 400,
    })
  } catch (error) {
    console.error('Payhero API route error:', error)
    return NextResponse.json(
      { success: false, message: 'Server error while initiating payment.' },
      { status: 500 },
    )
  }
}
