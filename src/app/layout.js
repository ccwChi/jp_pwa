import '../app/globals.css';

export const metadata = {
  title: "Nihongo Journey | 日文語感練習",
  description: "深夜和風的日文語感學習所，從 N5 一路衝向 N2",
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-TW">
      <body>{children}</body>
    </html>
  );
}
