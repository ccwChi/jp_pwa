export const dynamic = 'force-static';

export default function manifest() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';
  return {
    name: 'Nihongo Journey | 日文語感練習',
    short_name: 'Nihongo Journey',
    description: '深夜和風的日文語感學習所，從 N5 一路衝向 N2',
    start_url: `${basePath}/`,
    display: 'standalone',
    background_color: '#e9e5d8',
    theme_color: '#a83c2b',
    lang: 'zh-TW',
    icons: [
      { src: `${basePath}/icon-192`, sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: `${basePath}/icon-512`, sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: `${basePath}/icon-512`, sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
