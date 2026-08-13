import { Noto_Sans_JP, Noto_Sans_TC } from 'next/font/google';
import '../app/globals.css';
import RegisterSW from './RegisterSW';
import ThemeToggle from './ThemeToggle';

const notoSansJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-jp',
  display: 'swap',
});

const notoSansTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-zh',
  display: 'swap',
});

// Runs before hydration so the page never flashes the wrong theme: mirrors
// the nj_theme localStorage key (see storage.js / ThemeToggle) onto
// <html data-theme>, the same attribute ThemeToggle keeps in sync afterward.
const noFlashThemeScript = `(function () {
  try {
    var theme = JSON.parse(localStorage.getItem('nj_theme') || '"system"');
    var effective = theme === 'system'
      ? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : theme;
    document.documentElement.dataset.theme = effective;
  } catch (e) {}
})();`;

export const metadata = {
  title: "Nihongo Journey | 日文語感練習",
  description: "深夜和風的日文語感學習所，從 N5 一路衝向 N2",
  appleWebApp: {
    title: 'Nihongo Journey',
    statusBarStyle: 'black-translucent',
  },
};

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#e9e5d8' },
    { media: '(prefers-color-scheme: dark)', color: '#1c1a16' },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW" className={`${notoSansJP.variable} ${notoSansTC.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashThemeScript }} />
      </head>
      <body>
        <RegisterSW />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
