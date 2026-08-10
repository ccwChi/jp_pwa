// Local dry-run of the GitHub Pages static export (see .github/workflows/deploy.yml
// for the real deploy build). Temporarily excludes the dev-only article-import
// tool (a POST API route, unsupported by `output: export`), builds, then always
// restores the excluded files — even if the build fails — so the working tree
// is never left in a broken state.
import { cpSync, existsSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
// Backups live outside src/app entirely (not just renamed in place) so Next's
// file-based router doesn't pick up the backup folder as a stray route.
const EXCLUDED = [
  ['src/app/api', '.pages-build-backup/api'],
  ['src/app/reading/import', '.pages-build-backup/reading-import'],
];

// Copy-then-delete rather than rename: a running `next dev` file watcher
// holds an open handle on these directories on Windows, which makes a plain
// rename fail with EPERM. Copy + rm works around that.
function move(from, to) {
  const fromPath = path.join(root, from);
  const toPath = path.join(root, to);
  if (existsSync(fromPath)) {
    cpSync(fromPath, toPath, { recursive: true });
    rmSync(fromPath, { recursive: true, force: true });
  }
}

for (const [original, backup] of EXCLUDED) move(original, backup);

let exitCode = 1;
try {
  const result = spawnSync('npx', ['next', 'build'], {
    cwd: root,
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      NEXT_STATIC_EXPORT: 'true',
      NEXT_PUBLIC_STATIC_EXPORT: 'true',
      NEXT_PUBLIC_BASE_PATH: '/jp_pwa',
    },
  });
  exitCode = result.status ?? 1;
} finally {
  for (const [original, backup] of EXCLUDED) {
    const backupPath = path.join(root, backup);
    const originalPath = path.join(root, original);
    if (existsSync(backupPath)) {
      if (existsSync(originalPath)) rmSync(originalPath, { recursive: true, force: true });
      cpSync(backupPath, originalPath, { recursive: true });
      rmSync(backupPath, { recursive: true, force: true });
    }
  }
}

process.exit(exitCode);
