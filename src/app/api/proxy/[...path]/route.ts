// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

async function handleProxy(request: NextRequest, { params }: { params: { path: string[] } }) {
  // 1. Pega a URL base do servidor Docker em runtime
  const baseUrl = process.env.CORE_API_URL;

  if (!baseUrl) {
    return NextResponse.json({ message: 'CORE_API_URL não configurada no servidor' }, { status: 500 });
  }

  // 2. Reconstrói o caminho original (ex: auth/api/v1/users)
  const path = params.path.join('/');
  const searchParams = request.nextUrl.search;
  const targetUrl = `${baseUrl}/${path}${searchParams}`;

  // 3. Clona os headers da requisição original
  const headers = new Headers(request.headers);
  headers.delete('host'); // Remove o host do Next.js para não conflitar no destino

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.body,
      // @ts-ignore - necessário em algumas versões do Node para repassar stream de body
      duplex: 'half',
    });

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json({ message: 'Erro de comunicação com a API' }, { status: 502 });
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;