'use client';

import { useEffect, useState } from 'react';
import { saveNote } from '@/lib/storage';

// Wire this into any page where the user should be able to select Japanese
// text and right-click it straight into a note (front = selected text, back
// left blank for them to fill in later from /notes). `containerRef` scopes
// the capture to one part of the page — e.g. the exam questions but not the
// nav chrome — since a right-click with no relevant selection should still
// fall through to the browser's normal context menu.
export default function SelectionNoteCapture({ containerRef }) {
  const [menu, setMenu] = useState(null);
  const [toast, setToast] = useState(false);

  useEffect(() => {
    function selectedTextWithin() {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed) return '';
      const text = sel.toString().trim();
      if (!text) return '';
      const container = containerRef.current;
      if (container && sel.anchorNode && !container.contains(sel.anchorNode)) return '';
      return text;
    }

    function onContextMenu(e) {
      const text = selectedTextWithin();
      if (!text) return;
      e.preventDefault();
      const x = Math.min(Math.max(e.clientX, 80), window.innerWidth - 80);
      const y = Math.max(e.clientY, 48);
      setMenu({ x, y, text });
    }

    document.addEventListener('contextmenu', onContextMenu);
    return () => document.removeEventListener('contextmenu', onContextMenu);
  }, [containerRef]);

  useEffect(() => {
    if (!menu) return;
    function close() {
      setMenu(null);
    }
    function onKey(e) {
      if (e.key === 'Escape') close();
    }
    document.addEventListener('click', close);
    document.addEventListener('scroll', close, true);
    window.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('click', close);
      document.removeEventListener('scroll', close, true);
      window.removeEventListener('keydown', onKey);
    };
  }, [menu]);

  function handleAdd(e) {
    e.stopPropagation();
    saveNote({ content: menu.text });
    setMenu(null);
    setToast(true);
    setTimeout(() => setToast(false), 1500);
  }

  return (
    <>
      {menu && (
        <div className="selection-note-menu" style={{ top: menu.y, left: menu.x }} onClick={e => e.stopPropagation()}>
          <button type="button" className="selection-note-menu-btn" onClick={handleAdd}>
            ＋ 加入筆記
          </button>
        </div>
      )}
      {toast && <div className="selection-note-toast">已加入筆記，稍後可到「筆記」補上意思 ✓</div>}
    </>
  );
}
