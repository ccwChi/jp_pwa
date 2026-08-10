// GitHub Pages is a plain static file host (no Node server), so the
// production deploy builds with `output: 'export'` and a `/jp_pwa` basePath
// (this repo is served as a project page at ccwchi.github.io/jp_pwa/).
// Local dev/build stay untouched — this only activates when the deploy
// workflow sets NEXT_STATIC_EXPORT=true.
const isStaticExport = process.env.NEXT_STATIC_EXPORT === 'true';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  ...(isStaticExport && {
    output: 'export',
    trailingSlash: true,
    images: { unoptimized: true },
    basePath,
  }),
};

export default nextConfig;
