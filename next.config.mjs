import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverExternalPackages: ['three'],
  outputFileTracingRoot: path.join(__dirname),
  /**
   * Do not set `allowedDevOrigins` here: defining it switches Next dev to *block* cross-origin
   * requests to `/_next/*`. Cursor’s Simple Browser (and some tunnels) use an Origin host that
   * is not in a hand-maintained list → blank page / “could not open”. Default = warn-only.
   * @see https://nextjs.org/docs/app/api-reference/config/next-config-js/allowedDevOrigins
   */
  images: {
    domains: [
      'customer-assets.emergentagent.com',
      'images.unsplash.com',
      'images.pexels.com',
      'cdn.sanity.io',
      'upload.wikimedia.org',
      'logo.clearbit.com',
    ],
  },
};

export default nextConfig;
