const fs = require('fs');
const path = require('path');

const dir = 'e:/Programming/Frontend/allModernClone/allmodern/app/(user)';
const pages = [
  'wall-decor/page.tsx', 'storage/page.tsx', 'rugs/page.tsx', 'outdoor/page.tsx',
  'new/page.tsx', 'lighting/page.tsx', 'kitchen-tabletop/page.tsx', 'furniture/page.tsx',
  'decor-pillows/page.tsx', 'best-sellers/page.tsx', 'bedding/page.tsx', 'bath/page.tsx',
  'baby-kids/page.tsx'
];

for (const p of pages) {
  const file = path.join(dir, p);
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  
  const catMatch = content.match(/categoryName="([^"]+)"/);
  const catName = catMatch ? catMatch[1] : '';

  const propMatch = content.match(/products=\{([a-zA-Z0-9_]+)\}/);
  if (propMatch) {
    const arrayName = propMatch[1];
    console.log(p, 'uses array:', arrayName, 'for category:', catName);
  }
}
