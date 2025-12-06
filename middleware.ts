import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // 1. Agar user '/admin' folder me ja raha hai
  if (path.startsWith('/admin')) {
    
    // Lekin agar wo already Login page par hai, to mat roko
    if (path === '/admin/login') {
      return NextResponse.next()
    }

    // 2. Cookie check karo (Ticket hai ya nahi?)
    const token = request.cookies.get('auth_token')?.value

    // 3. Agar Ticket nahi hai -> Login page par bhejo
    if (!token) {
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*']
}
