import { NextRequest, NextResponse } from 'next/server';

const privateRoutes = ['/profile', '/notes'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isPrivateRoute = privateRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const isPublicRoute = publicRoutes.some((route) =>
    pathname.startsWith(route)
  );

  const accessToken = request.cookies.get('accessToken')?.value;
  const refreshToken = request.cookies.get('refreshToken')?.value;

  if (accessToken) {
    if (isPublicRoute) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
  }

  if (refreshToken) {
    const sessionResponse = await fetch(
      'https://notehub-api.goit.study/auth/session',
      {
        headers: {
          Cookie: request.headers.get('cookie') ?? '',
        },
      }
    );

    if (sessionResponse.ok) {
      const response = isPublicRoute
        ? NextResponse.redirect(new URL('/', request.url))
        : NextResponse.next();

      const setCookie = sessionResponse.headers.get('set-cookie');

      if (setCookie) {
        response.headers.set('Set-Cookie', setCookie);
      }

      return response;
    }
  }

  if (isPrivateRoute) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/profile/:path*', '/notes/:path*', '/sign-in', '/sign-up'],
};