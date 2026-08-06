import '../app/globals.css';
import RegisterSW from './RegisterSW';

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
    <html lang="zh-TW">
      <body>
        <RegisterSW />
        {children}
      </body>
    </html>
  );
}
