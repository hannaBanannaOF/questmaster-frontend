// app/api/proxy/[...path]/route.ts
import { NextRequest, NextResponse } from 'next/server';

async function handleProxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> } // <-- params agora é Promise!
) {
  // 1. Resolve a Promise para obter a lista de caminhos
  const { path: pathSegments } = await context.params;

  // 2. Pega a URL base do servidor Docker em runtime
  const baseUrl = process.env.CORE_API_URL;

  if (!baseUrl) {
    return NextResponse.json(
      { message: 'CORE_API_URL não configurada no servidor' },
      { status: 500 }
    );
  }

  // 3. Reconstrói o caminho original (ex: auth/api/v1/users)
  const path = pathSegments.join('/');
  const searchParams = request.nextUrl.search;
  const targetUrl = `${baseUrl}/${path}${searchParams}`;

  // 4. Clona os headers da requisição original
  const headers = new Headers(request.headers);
  headers.delete('host'); // Remove o host do Next.js para evitar conflitos no destino

  try {
    const response = await fetch(targetUrl, {
      method: request.method,
      headers,
      body: request.body,
      // @ts-ignore - necessário para repassar stream de body sem buffer em requisições com corpo
      duplex: 'half',
    });

    return new NextResponse(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  } catch (error) {
    return NextResponse.json(
      { message: 'Erro de comunicação com a API' },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;