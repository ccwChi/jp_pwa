// Shared drawing for every generated app icon (favicon, apple-touch-icon,
// manifest icons). Kept to Latin glyphs and flat shapes — ImageResponse
// (Satori) has no bundled CJK font, so kanji here would render as tofu.
export function IconMark({ size }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#a83c2b',
      }}
    >
      <div
        style={{
          width: size * 0.6,
          height: size * 0.6,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#ece7da',
          color: '#a83c2b',
          fontSize: size * 0.4,
          fontFamily: 'sans-serif',
          fontWeight: 700,
        }}
      >
        N
      </div>
    </div>
  );
}
