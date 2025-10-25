import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Exemplo: intercepta URLs do tipo /sessions/:slug
  const matchSessions = url.pathname.match(/^\/sessions\/([^\/]+)$/);
  if (matchSessions) {
    const slug = matchSessions[1];

    const sessionCookie = req.cookies.get("QUESTMASTER_SESSION")?.value || ""

    const headers: Record<string, string> = { 'Original-Url': url.pathname + url.search }
    if (sessionCookie) {
      headers['Cookie'] = `QUESTMASTER_SESSION=${sessionCookie}` 
    }

    // Chama o backend para resolver o slug para core_id
    const res = await fetch(`http://localhost:8081/core/api/v1/session/resolve/${slug}`, {
      headers
    })
    if (res.status == 401) {
      var { redirectUrl } = await res.json()
      return NextResponse.redirect(redirectUrl)
    }
    if (!res.ok) {
      return NextResponse.rewrite(new URL('/404', req.url));
    }

    const { core_id } = await res.json();

    // Redireciona internamente para a rota que renderiza pelo core_id
    url.pathname = `/sessions/${core_id}`;
    return NextResponse.rewrite(url);
  }

  const matchCharacterSheet = url.pathname.match(/^\/character-sheets\/([^\/]+)$/);
  if (matchCharacterSheet) {
    const slug = matchCharacterSheet[1];

    const sessionCookie = req.cookies.get("QUESTMASTER_SESSION")?.value || ""

    const headers: Record<string, string> = { 'Original-Url': url.pathname + url.search }
    if (sessionCookie) {
      headers['Cookie'] = `QUESTMASTER_SESSION=${sessionCookie}` 
    }

    // Chama o backend para resolver o slug para core_id
    const res = await fetch(`http://localhost:8081/core/api/v1/character-sheet/resolve/${slug}`, {
      headers
    })
    if (res.status == 401) {
      var { redirectUrl } = await res.json()
      return NextResponse.redirect(redirectUrl)
    }
    if (!res.ok) {
      return NextResponse.rewrite(new URL('/404', req.url));
    }

    const { core_id } = await res.json();

    // Redireciona internamente para a rota que renderiza pelo core_id
    url.pathname = `/character-sheets/${core_id}`;
    return NextResponse.rewrite(url);
  }

  return NextResponse.next();
}

// Aplica o middleware apenas para /fichas/*
export const config = {
  matcher: ['/sessions/:path*', '/character-sheets/:path*'],
};