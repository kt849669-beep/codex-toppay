const fs = require('fs');

const clean = fs.readFileSync('clean-index.html', 'utf8');
const home = fs.readFileSync('home-page.html', 'utf8');

// 1. Extract login HTML parts
const loginContainerMatch = clean.match(/<div class="login-container">[\s\S]*?<\/form>\s*<\/div>/);
const mpinOverlayMatch = clean.match(/<div class="mpin-overlay"[^>]*>[\s\S]*?<\/section>\s*<\/div>/);
const scriptsMatch = clean.match(/<script type="module" src=".\/js\/local-flow.js"><\/script>\s*<script>\s*lucide\.createIcons\(\);\s*<\/script>/);

const loginContainer = loginContainerMatch ? loginContainerMatch[0] : '';
const mpinOverlay = mpinOverlayMatch ? mpinOverlayMatch[0] : '';
const scripts = scriptsMatch ? scriptsMatch[0] : '';

// 2. Extract CSS links from clean
const cssLinks = `
    <!-- Login Specific Additions -->
    <link rel="preload" href="./css/common.css" as="style" />
    <link rel="preload" href="./css/login.css" as="style" />
    <link rel="stylesheet" href="./css/common.css" />
    <link rel="stylesheet" href="./css/login.css" />
    <link rel="stylesheet" href="./css/mpin.css" />
    <script src="https://unpkg.com/lucide@0.511.0/dist/umd/lucide.min.js"></script>
`;

// 3. Inject into home
let newHtml = home.replace('</head>', cssLinks + '\n  </head>');

// Inject login form + 100vh spacer at the start of body
const injectBodyStart = `
<div style="min-height: 100dvh; background: #fff; width: 100%; position: relative; z-index: 50;">
  ${loginContainer}
</div>
<div style="height: 100dvh; background: #fff; width: 100%;"></div>
`;

newHtml = newHtml.replace('<body data-seo-page="landing">', '<body data-seo-page="landing">\n' + injectBodyStart);

// Inject MPIN and scripts at the end of body
newHtml = newHtml.replace('</body>', '\n' + mpinOverlay + '\n' + scripts + '\n</body>');

fs.writeFileSync('index.html', newHtml);
console.log("Merge complete!");
