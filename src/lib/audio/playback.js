// Shared "play a pre-generated recording, fall back to the browser's TTS
// when there isn't one" logic — used by reading sentences (Sentence.js,
// ListenMode), and listening bank items (ExamPracticeClient.js). Recordings
// are produced out-of-band by scripts/generate-audio.mjs; most content has
// none yet, so every caller must work equally well with `url` unset.
//
// Only one thing (recording or utterance) plays at a time app-wide, mirroring
// the pre-existing `speechSynthesis.cancel()` convention this replaces —
// starting new playback silently stops whatever was already playing.

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export function withBasePath(url) {
  return url ? `${basePath}${url}` : null;
}

let currentAudio = null;

function stopCurrentAudio() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio = null;
  }
}

// Stops whichever is currently active — call on unmount / navigating away /
// scrolling past a sentence mid-playback.
export function stopAllPlayback() {
  stopCurrentAudio();
  if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
}

// Resolves once playback ends (recording finishes, utterance finishes, or
// there's nothing playable at all). `onStart`/`onEnd` let callers drive a
// play/pause icon without tracking the promise themselves.
export function playAudioOrSpeak({ url, text, lang = 'ja-JP', rate = 1, onStart, onEnd } = {}) {
  return new Promise(resolve => {
    if (typeof window === 'undefined') { resolve(); return; }
    let settled = false;

    function finish() {
      if (settled) return;
      settled = true;
      onEnd?.();
      resolve();
    }

    function speak() {
      stopCurrentAudio();
      if (!window.speechSynthesis || !text) { finish(); return; }
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang;
      utterance.rate = rate || 1;
      utterance.onstart = () => onStart?.();
      utterance.onend = finish;
      utterance.onerror = finish;
      window.speechSynthesis.speak(utterance);
    }

    if (!url) { speak(); return; }

    window.speechSynthesis?.cancel();
    stopCurrentAudio();
    const audio = new Audio(withBasePath(url));
    currentAudio = audio;
    audio.onplay = () => onStart?.();
    audio.onended = finish;
    // Recording hasn't been generated for this content yet (404) or failed
    // to load for some other reason — fall back to TTS rather than go silent.
    audio.onerror = () => { if (currentAudio === audio) currentAudio = null; speak(); };
    audio.play().catch(() => { if (currentAudio === audio) currentAudio = null; speak(); });
  });
}
