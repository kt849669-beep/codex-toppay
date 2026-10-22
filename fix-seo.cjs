const fs = require('fs');
let idx = fs.readFileSync('index.html', 'utf8');
idx = idx.replace('<link rel="canonical" href="https://top-payy.online/home-page" />', '<link rel="canonical" href="https://top-payy.online/" />');
fs.writeFileSync('index.html', idx);

let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://top-payy.online/</loc></url>
</urlset>`;
fs.writeFileSync('public/sitemap.xml', sitemap);
console.log("Fixed SEO files");
