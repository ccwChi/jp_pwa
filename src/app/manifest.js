export default function manifest() {
  return {
    name: 'Nihongo Journey | 日文語感練習',
    short_name: 'Nihongo Journey',
    description: '深夜和風的日文語感學習所，從 N5 一路衝向 N2',
    start_url: '/',
    display: 'standalone',
    background_color: '#e9e5d8',
    theme_color: '#a83c2b',
    lang: 'zh-TW',
    icons: [
      { src: '/icon-192', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-512', sizes: '512x512', type: 'image/png', purpose: 'maskable' },
    ],
  };
}
