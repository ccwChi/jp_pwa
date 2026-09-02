'use client';

import { useEffect, useRef, useState } from 'react';
import { parseFurigana, readingOf, toRomaji } from '@/lib/reading/furigana';
import { buildVocabSegments } from '@/lib/reading/vocabMatch';
import { saveNote } from '@/lib/storage';
import { playAudioOrSpeak } from '@/lib/audio/playback';

export default function Sentence({ jp, zh, showRomaji, blurZh, dictationMode, vocab, rate, audioUrl, onVocabEnter, onVocabLeave, onVocabClick }) {
  const parts = parseFurigana(jp);
  const segments = buildVocabSegments(parts, vocab);
  const [isPlaying, setIsPlaying] = useState(false);
  const [looping, setLooping] = useState(false);
  const loopRef = useRef(false);
  const [isSaved, setIsSaved] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [jpRevealed, setJpRevealed] = useState(false);

  function speak() {
    playAudioOrSpeak({
      url: audioUrl,
      text: readingOf(jp),
      lang: 'ja-JP',
      rate: rate || 1,
      onStart: () => setIsPlaying(true),
      onEnd: () => setIsPlaying(false),
    });
  }

  async function toggleLoop() {
    if (loopRef.current) {
      loopRef.current = false;
      setLooping(false);
      return;
    }
    loopRef.current = true;
    setLooping(true);
    while (loopRef.current) {
      await new Promise(resolve => {
        playAudioOrSpeak({
          url: audioUrl,
          text: readingOf(jp),
          lang: 'ja-JP',
          rate: rate || 1,
          onStart: () => setIsPlaying(true),
          onEnd: () => { setIsPlaying(false); resolve(); },
        });
      });
      if (loopRef.current) await new Promise(r => setTimeout(r, 500));
    }
  }

  useEffect(() => () => { loopRef.current = false; }, []);

  function handleSaveNote() {
    const plainJp = parts.map(p => p.text).join('');
    saveNote({ content: `${plainJp}\n${zh}` });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 1500);
  }

  const zhHidden = blurZh && !revealed;
  const jpHidden = dictationMode && !jpRevealed;

  return (
    <div className="sentence">
      <div className="sentence-actions">
        <button
          type="button"
          className={`play-btn${isPlaying ? ' playing' : ''}`}
          onClick={speak}
          aria-label="播放這句發音"
        >
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button
          type="button"
          className={`play-btn loop-btn${looping ? ' playing' : ''}`}
          onClick={toggleLoop}
          aria-label="重複播放這句"
          title="重複播放這句"
        >
          🔁
        </button>
        <button
          type="button"
          className={`save-note-btn${isSaved ? ' saved' : ''}`}
          onClick={handleSaveNote}
          aria-label="存入筆記"
        >
          {isSaved ? '✓' : '＋'}
        </button>
        <ShadowRecorder />
      </div>

      <div className="sentence-content">
        <p
          className={`sentence-jp${jpHidden ? ' jp-hidden' : ''}`}
          onClick={() => dictationMode && setJpRevealed(r => !r)}
          title={jpHidden ? '點擊顯示原文（先聽聽看）' : undefined}
        >
          {segments.map((seg, si) => {
            const inner = seg.subParts.map((p, i) =>
              p.reading ? (
                <ruby key={i}>
                  {p.text}
                  <rt>{p.reading}</rt>
                </ruby>
              ) : (
                <span key={i}>{p.text}</span>
              )
            );
            if (!seg.vocab) return <span key={si}>{inner}</span>;
            return (
              <span
                key={si}
                className="vocab-hit"
                onMouseEnter={() => onVocabEnter?.(seg.vocab)}
                onMouseLeave={() => onVocabLeave?.(seg.vocab)}
                onClick={e => { e.stopPropagation(); onVocabClick?.(seg.vocab); }}
              >
                {inner}
              </span>
            );
          })}
        </p>
        {showRomaji && !jpHidden && <p className="sentence-romaji">{toRomaji(readingOf(jp))}</p>}
        <p
          className={`sentence-zh${zhHidden ? ' zh-hidden' : ''}`}
          onClick={() => blurZh && setRevealed(r => !r)}
          title={zhHidden ? '點擊顯示翻譯' : undefined}
        >
          {zh}
        </p>
      </div>
    </div>
  );
}

// Records a short clip from the mic and plays it straight back — for
// comparing your own pronunciation against the sentence you just heard
// (shadowing practice). Nothing is uploaded, saved, or kept once you record
// over it or leave the page; it only ever lives as an in-memory blob URL.
function ShadowRecorder() {
  const [state, setState] = useState('idle'); // idle | recording | recorded | denied
  const [clipUrl, setClipUrl] = useState(null);
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);

  useEffect(() => () => {
    streamRef.current?.getTracks().forEach(t => t.stop());
    if (clipUrl) URL.revokeObjectURL(clipUrl);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function startRecording() {
    if (clipUrl) { URL.revokeObjectURL(clipUrl); setClipUrl(null); }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        setClipUrl(URL.createObjectURL(blob));
        stream.getTracks().forEach(t => t.stop());
        setState('recorded');
      };
      recorderRef.current = recorder;
      recorder.start();
      setState('recording');
    } catch {
      setState('denied');
    }
  }

  function stopRecording() {
    recorderRef.current?.stop();
  }

  if (state === 'denied') {
    return <span className="shadow-btn shadow-denied" title="沒有麥克風權限">🎙️✕</span>;
  }

  if (state === 'recording') {
    return (
      <button type="button" className="play-btn shadow-btn recording" onClick={stopRecording} aria-label="停止錄音" title="停止錄音">
        ⏹
      </button>
    );
  }

  return (
    <span className="shadow-controls">
      <button type="button" className="play-btn shadow-btn" onClick={startRecording} aria-label="跟讀錄音" title="跟讀錄音（不會上傳或儲存）">
        🎙️
      </button>
      {state === 'recorded' && clipUrl && (
        <audio className="shadow-playback" controls src={clipUrl} />
      )}
    </span>
  );
}
