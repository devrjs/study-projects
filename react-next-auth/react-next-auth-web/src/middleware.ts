import { NextRequest, NextResponse } from 'next/server'

const publicRoutes = ['/', '/sign-in', '/sign-up']
const protectedRoutes = ['/dashboard']

export function middleware(request: NextRequest) {
  // const token = request.cookies.get('accessToken')?.value
  const token = request.cookies.get('authjs.session-token')?.value
  const pathname = request.nextUrl.pathname

  // redirect to APP when authenticated
  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // redirect to SIGN-IN when not authenticated
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL('/sign-in', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
