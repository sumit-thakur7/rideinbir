import { NextResponse } from 'next/server'

export async function POST() {
  const response = NextResponse.json({ 
    success: true, 
    message: 'Logged out from all sessions' 
  })
  
  // 1. Admin Cookie Delete karein (Expire karke)
  response.cookies.set('auth_token', '', {
    httpOnly: true,
    expires: new Date(0), // Turant expire
    path: '/' // Poore site se hata do
  })

  // 2. Agar koi User cookie bhi hai, use bhi delete karein (Safety ke liye)
  // (Yahan hum common names try kar rahe hain)
  response.cookies.set('token', '', { expires: new Date(0), path: '/' })
  response.cookies.set('session', '', { expires: new Date(0), path: '/' })

  return response
}
