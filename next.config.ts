import type { NextConfig } from 'next';

const supabaseHost = process.env.NEXT_PUBLIC_SUPABASE_URL
  ? new URL(process.env.NEXT_PUBLIC_SUPABASE_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  // `pnpm dev` uses .next; verification builds (`pnpm build:check`) use .next-check so they never
  // overwrite a running dev server's output (which causes "__webpack_modules__[moduleId] is not a function").
  distDir: process.env.NEXT_DIST_DIR || '.next',
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      ...(supabaseHost
        ? [{ protocol: 'https' as const, hostname: supabaseHost, pathname: '/storage/v1/object/public/**' }]
        : []),
    ],
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'radix-ui'],
  },
};

export default nextConfig;
