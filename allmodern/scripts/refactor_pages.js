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
  let content = fs.readFileSync(file, 'utf8');

  // Skip if already updated
  if (content.includes('products={')) {
    console.log('Skipping', p, 'already updated');
    continue;
  }

  // Find the array name used in the map function inside FilterableProductLayout
  const mapMatch = content.match(/<FilterableProductLayout[\s\S]*?\{([a-zA-Z0-9_]+)\.map\(/);
  if (mapMatch) {
    const arrayName = mapMatch[1];
    
    // Find the title passed to FilterableProductLayout
    const titleMatch = content.match(/<FilterableProductLayout[^>]*title=\"([^\"]+)\"/);
    const title = titleMatch ? titleMatch[1] : '';

    // Replace the opening tag
    content = content.replace(
      /<FilterableProductLayout([^>]*)>/,
      `<FilterableProductLayout$1 products={${arrayName}} categoryName="${title}">`
    );

    // Remove everything between <FilterableProductLayout ...> and </FilterableProductLayout>
    content = content.replace(
      /(<FilterableProductLayout[^>]*>)[\s\S]*?(<\/FilterableProductLayout>)/,
      '$1$2'
    );

    fs.writeFileSync(file, content);
    console.log('Updated', p, 'with array', arrayName);
  } else {
    console.log('Could not find map array for', p);
  }
}
