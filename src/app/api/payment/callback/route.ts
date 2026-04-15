import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const callbackPayload = await request.json()
    console.log('PayHero callback received:', callbackPayload)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('PayHero callback error:', error)
    return NextResponse.json({ success: false, message: 'Invalid callback payload' }, { status: 400 })
  }
}
