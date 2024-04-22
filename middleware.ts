import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authCookie = cookies().get('auth');
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
