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
        background: '#0d4d31',
        borderRadius: '50%',
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
          color: '#ece7da',
          fontSize: size * 0.5,
          fontWidth: 'bolder',
          fontFamily: 'sans-serif',
          fontWeight: 700,
        }}
      >
        N
      </div>
    </div>
  );
}
