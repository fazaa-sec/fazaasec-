import { NextResponse, type NextRequest } from 'next/server';

// Sensitive paths that must never be reachable. Answer with a plain 404 so nothing leaks.
const BLOCKED = /^\/(\.env[^/]*|\.git(\/.*)?|admin(\/.*)?|api\/internal(\/.*)?)\/?$/i;

function notFound() {
  return new NextResponse('Not Found', {
    status: 404,
    headers: { 'content-type': 'text/plain; charset=utf-8' },
  });
}

export function middleware(req: NextRequest) {
  let path = req.nextUrl.pathname;
  try {
    path = decodeURIComponent(path); // catch %2e / %2F style bypasses
  } catch {
    return notFound();
  }
  path = path.replace(/\/{2,}/g, '/');

  if (BLOCKED.test(path)) return notFound();
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
