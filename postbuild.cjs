const fs = require('fs');
const path = require('path');

const distDir = path.resolve(__dirname, 'dist');

// 1. Copy user-app/pages/login.html to dist/index.html so root / is immediately served
const loginHtmlPath = path.join(distDir, 'user-app', 'pages', 'login.html');
const indexHtmlPath = path.join(distDir, 'index.html');
if (fs.existsSync(loginHtmlPath)) {
  fs.copyFileSync(loginHtmlPath, indexHtmlPath);
  console.log('✓ Copied user-app/pages/login.html to dist/index.html');
}

// 2. Remove dist/_worker.js if present (Cloudflare Worker uses root worker.js, not asset _worker.js)
const distWorkerPath = path.join(distDir, '_worker.js');
if (fs.existsSync(distWorkerPath)) {
  fs.unlinkSync(distWorkerPath);
  console.log('✓ Removed dist/_worker.js to prevent asset upload conflict');
}

// 3. Ensure _redirects is copied to dist/_redirects
const publicDir = path.resolve(__dirname, 'public');
const redirectsSrc = path.join(publicDir, '_redirects');
const redirectsDest = path.join(distDir, '_redirects');
if (fs.existsSync(redirectsSrc)) {
  fs.copyFileSync(redirectsSrc, redirectsDest);
  console.log('✓ Copied public/_redirects to dist/_redirects');
}

// 4. Ensure _headers is copied to dist/_headers
const headersSrc = path.join(publicDir, '_headers');
const headersDest = path.join(distDir, '_headers');
if (fs.existsSync(headersSrc)) {
  fs.copyFileSync(headersSrc, headersDest);
  console.log('✓ Copied public/_headers to dist/_headers');
}

// 5. Ensure .assetsignore exists in dist/ to avoid any accidental worker upload warnings
const assetsIgnoreDest = path.join(distDir, '.assetsignore');
fs.writeFileSync(assetsIgnoreDest, '_worker.js\n', 'utf8');
console.log('✓ Wrote dist/.assetsignore');
