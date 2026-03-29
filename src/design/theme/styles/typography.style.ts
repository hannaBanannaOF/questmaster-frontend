import { Cinzel, Nunito } from 'next/font/google';

export const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading',
});

export const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-body',
});

export type ThemeTypography = {
  heading: {
    fontFamily: string;
  };
  body: {
    fontFamily: string;
  };
};

export const themeTypography: ThemeTypography = {
  heading: {
    fontFamily: 'var(--font-heading)',
  },
  body: {
    fontFamily: 'var(--font-body)',
  },
};
