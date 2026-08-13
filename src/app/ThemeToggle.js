'use client';

import { useEffect } from 'react';
import { getTheme, setTheme, useTheme } from '../lib/storage';

// Mirrors the blocking inline script in layout.js: reflects the stored
// theme (or system preference, if never overridden) onto <html data-theme>
// so every page's CSS custom properties (globals.css) pick it up.
function applyTheme(theme) {
  document.documentElement.dataset.theme = theme === 'system'
    ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    : theme;
}

export default function ThemeToggle() {
  const theme = useTheme();

  useEffect(() => {
    applyTheme(theme);

    if (theme !== 'system') return undefined;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme(getTheme());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, [theme]);

  function toggle() {
    const isDark = document.documentElement.dataset.theme === 'dark';
    setTheme(isDark ? 'light' : 'dark');
  }

  return (
    <button
      type="button"
      className="theme-toggle-btn"
      onClick={toggle}
      aria-label="切換黑夜/白天模式"
      title="切換黑夜/白天模式"
    >
      <span className="theme-toggle-icon theme-toggle-icon-sun">☀️</span>
      <span className="theme-toggle-icon theme-toggle-icon-moon">🌙</span>
    </button>
  );
}
