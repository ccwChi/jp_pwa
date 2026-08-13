// Single seam for "can this visitor see this level's content" — every page
// that lists/switches JLPT levels should ask isLevelUnlocked() instead of
// hardcoding access. Today there's no real membership system (no auth, no
// billing), so MEMBERSHIP_ENABLED is off and everything stays open; flipping
// it on is meant to be a placeholder for the real switch, which will come
// from a server-verified subscription check once one exists, not a client
// flag — a build-time constant is trivially bypassable and only makes sense
// while there's genuinely nothing to protect yet.
const MEMBERSHIP_ENABLED = false;

// Which levels stay free even once membership gating is turned on.
const FREE_LEVELS = ['N5'];

export function isLevelUnlocked(level) {
  if (!MEMBERSHIP_ENABLED) return true;
  return FREE_LEVELS.includes(level);
}
