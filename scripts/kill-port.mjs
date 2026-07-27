import { execSync } from 'child_process';

const port = process.argv[2] || '3000';

try {
  if (process.platform === 'win32') {
    execSync(
      `powershell -NoProfile -Command "$c = Get-NetTCPConnection -LocalPort ${port} -ErrorAction SilentlyContinue; if ($c) { $c | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force -ErrorAction SilentlyContinue } }"`,
      { stdio: 'inherit' },
    );
  } else {
    try {
      execSync(`fuser -k ${port}/tcp`, { stdio: 'pipe' });
    } catch {
      execSync(`lsof -ti:${port} | xargs kill -9`, { stdio: 'pipe' });
    }
  }
} catch {
  /* nothing listening */
}
