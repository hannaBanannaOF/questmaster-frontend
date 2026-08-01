import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json(
    {
      CORE_API_URL: process.env.CORE_API_URL ?? '',
      SESSION_COOKIE_NAME: process.env.SESSION_COOKIE_NAME ?? '',
    },
    {
      headers: {
        // Evita que o navegador ou o Next.js façam cache da resposta do env
        'Cache-Control': 'no-store, max-age=0',
      },
    }
  );
}