import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  compiler: {
    styledComponents: true,
  },
  experimental: {
    globalNotFound: true,
  },
};

export default withNextIntl(nextConfig);
