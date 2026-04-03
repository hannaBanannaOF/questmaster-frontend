import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getEnv } from './lib/env';
import { createHttpClient } from './lib/http/http.client';
import { isHttpError } from './lib/http/http.types';
import { Microservices } from './lib/http/services.types';

type CoreSlugResolve = {
  id: number;
};

export async function proxy(req: NextRequest) {
  const url = req.nextUrl.clone();
  const matchCampaings = url.pathname.match(/^\/campaings\/([^/]+)$/);
  if (matchCampaings) {
    const slug = matchCampaings[1];

    const cookieStore = await cookies();

    const sessionToken = cookieStore.get(
      getEnv('SESSION_COOKIE_NAME') ?? '',
    )?.value;
    const client = createHttpClient(
      Microservices.core,
      sessionToken,
      url.pathname + url.search,
    );
    try {
      const resolved = await client.get<CoreSlugResolve>(
        `campaing/resolve/${slug}`,
      );
      url.pathname = `/campaings/${resolved.id}`;
      return NextResponse.rewrite(url);
    } catch (error) {
      if (isHttpError<string>(error) && error.data) {
        return NextResponse.redirect(error.data);
      }
      url.pathname = '/campaigns';
      return NextResponse.redirect(url);
    }
  }

  const matchCharacterSheet = url.pathname.match(/^\/characters\/([^/]+)$/);
  if (matchCharacterSheet) {
    const slug = matchCharacterSheet[1];
    const cookieStore = await cookies();

    const sessionToken = cookieStore.get(
      getEnv('SESSION_COOKIE_NAME') ?? '',
    )?.value;
    const client = createHttpClient(
      Microservices.core,
      sessionToken,
      url.pathname + url.search,
    );
    try {
      const resolved = await client.get<CoreSlugResolve>(
        `character/resolve/${slug}`,
      );
      url.pathname = `/characters/${resolved.id}`;
      return NextResponse.rewrite(url);
    } catch (error) {
      if (isHttpError<string>(error) && error.status === 401 && error.data) {
        return NextResponse.redirect(error.data);
      }
      url.pathname = '/characters';
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/campaings/:path*', '/characters/:path*'],
};
