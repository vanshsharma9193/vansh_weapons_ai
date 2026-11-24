// Render start script compatibility for Vansh Weapons Backend
import { createRequire } from 'module';
import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure dependencies are installed if Render skipped npm install
const require = createRequire(import.meta.url);
try {
  require.resolve('express');
  require.resolve('cors');
} catch (err) {
  console.log('📦 Installing missing dependencies on Render (express, cors)...');
  execSync('npm install --no-audit --no-fund', {
    cwd: __dirname,
    stdio: 'inherit'
  });
}

console.log('⚔️ Starting Vansh Weapons Backend Server...');
import('./server.js');
