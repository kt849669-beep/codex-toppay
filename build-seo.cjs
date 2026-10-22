const fs = require('fs');
const hp = fs.readFileSync('home-page.html', 'utf8');
const idx = fs.readFileSync('index.html', 'utf8');

const bodyMatch = hp.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
if (bodyMatch) {
    let bodyContent = bodyMatch[1];
    
    // Remove the script tags from bodyContent so they don't conflict
    bodyContent = bodyContent.replace(/<script[\s\S]*?<\/script>/gi, '');
    
    // Check if styles.css is already linked
    let newIdx = idx;
    if (!newIdx.includes('/styles.css')) {
        newIdx = newIdx.replace('</head>', '  <link rel="stylesheet" href="/styles.css" />\n  </head>');
    }
    
    // Check if the seo section is already added
    if (!newIdx.includes('id="seo-section"')) {
        const container = `
        <div id="seo-section" style="background: white; width: 100%; position: relative; z-index: 10;">
          ${bodyContent}
        </div>
        </body>`;
        
        newIdx = newIdx.replace('</body>', container);
        fs.writeFileSync('index.html', newIdx);
        console.log("Success! SEO content appended.");
    } else {
        console.log("SEO section already exists in index.html");
    }
} else {
    console.log("Failed to match body");
}
