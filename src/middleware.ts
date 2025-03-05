'use server'

import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { adminAuth } from './config/firebase-admin';

export async function middleware(request: NextRequest) {
  const user = request.cookies.get('session');
  const uid = request.cookies.get('uid');

  

  const isAuthPage = request.nextUrl.pathname.startsWith('/auth')

  if (!user && !uid && !isAuthPage) {
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }

  try {
    const verifiedToken = await adminAuth.verifySessionCookie(user?.value || '', true);

    if (user && uid && isAuthPage) {
      return NextResponse.redirect(new URL('/', request.url))
    } 
  
    return NextResponse.next()
  } catch (error) {
    console.log(error)
    return NextResponse.redirect(new URL('/auth/login', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
} 