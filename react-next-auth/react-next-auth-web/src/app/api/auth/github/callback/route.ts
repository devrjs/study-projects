import { api } from '@/lib/axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const code = searchParams.get('code')

  const authResponse = await api.post('/sessions', {
    provider: 'github',
    code,
  })

  const { access_token: accessToken } = authResponse.data.backendTokens

  const redirectURL = new URL('/dashboard', request.url)

  const cookieExpiresInSeconds = 60 * 60 * 24 * 30

  return NextResponse.redirect(redirectURL, {
    headers: {
      'Set-Cookie': `token=${accessToken}; Path=/; max-age=${cookieExpiresInSeconds};`,
    },
  })
}
