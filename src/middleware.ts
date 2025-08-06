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
  const guestOnlyRoutes = ['/login', '/cadastro', '/recuperar-senha'];
  const isGuestOnlyRoute = guestOnlyRoutes.some(route => pathname.startsWith(route));
  
  // Exceções - rotas que devem funcionar independente do status de autenticação
  const publicRoutes = ['/auth/verify-email', '/auth/reset-password'];
  const isPublicRoute = publicRoutes.some(route => pathname.startsWith(route));

  // Rotas públicas devem sempre ser acessíveis
  if (isPublicRoute) {
    return NextResponse.next();
  }

  // Redirecionar usuários não autenticados tentando acessar rotas protegidas
  if (isProtectedRoute && !isAuthenticated) {
    const url = new URL('/login', request.url);
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