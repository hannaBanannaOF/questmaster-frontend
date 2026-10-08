import { Cinzel, Nunito } from 'next/font/google';

const heading = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
});

const body = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
});

/** Classes que expõem as fontes como variáveis CSS; aplicar no <body>. */
export const fontVariables = `${heading.variable} ${body.variable}`;
