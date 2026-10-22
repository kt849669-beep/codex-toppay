const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'admin-app', 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

for (const file of files) {
  const filePath = path.join(pagesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');

  if (content.includes('<table>') && !content.includes('<div class="table-responsive">')) {
    content = content.replace('<table>', '<div class="table-responsive">\n            <table>');
    content = content.replace('</table>', '</table>\n          </div>');
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
