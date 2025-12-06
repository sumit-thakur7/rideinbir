import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db'
import User from '@/lib/models/User'

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and Password required' }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 401 })
    }

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return NextResponse.json({ error: 'Wrong Password' }, { status: 401 })
    }

    // --- SUCCESS ---
    const response = NextResponse.json({ 
      success: true,
      user: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        role: user.role
      }
    }, { status: 200 })

    // --- 15 MINUTE AUTO LOGOUT LOGIC ---
    // maxAge: 15 * 60 = 900 seconds
    response.cookies.set('auth_token', 'secure-admin-token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60, // Yahan set kiya hai 15 minute
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Login Error:', error)
    return NextResponse.json({ error: 'Server Error' }, { status: 500 })
  }
}
