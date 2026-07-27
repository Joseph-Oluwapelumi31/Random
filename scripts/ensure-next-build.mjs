import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const buildId = path.join(root, '.next', 'BUILD_ID');

if (!fs.existsSync(buildId)) {
  console.error('\n  Missing production build (.next/BUILD_ID).');
  console.error('  Run:  npm run build');
  console.error('  Then: npm run start\n');
  process.exit(1);
}
