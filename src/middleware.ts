import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const authToken = request.cookies.get('auth-token');
  const isAuthenticated = !!authToken;

  // Rotas que requerem autenticação
  const protectedRoutes = ['/conta', '/pedidos', '/enderecos'];
  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));

  // Rotas apenas para visitantes (não autenticados)
  const guestOnlyRoutes = ['/auth', '/login', '/cadastro'];
  const isGuestOnlyRoute = guestOnlyRoutes.some(route => pathname.startsWith(route));

  // Redirecionar usuários não autenticados tentando acessar rotas protegidas
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL('/auth', request.url);
    url.searchParams.set('redirect', pathname);
    return NextResponse.redirect(url);
  }

  // Redirecionar usuários autenticados tentando acessar rotas de visitante
  if (isGuestOnlyRoute && isAuthenticated) {
    return NextResponse.redirect(new URL('/conta', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)',
  ],
};