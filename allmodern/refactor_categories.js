const fs = require('fs');
const path = require('path');

const files = [
  'app/decor-pillows/page.tsx',
  'app/furniture/page.tsx',
  'app/lighting/page.tsx',
  'app/new/page.tsx',
  'app/wall-decor/page.tsx',
  'app/(user)/baby-kids/page.tsx',
  'app/(user)/bath/page.tsx',
  'app/(user)/bedding/page.tsx',
  'app/(user)/kitchen-tabletop/page.tsx',
  'app/(user)/rugs/page.tsx',
  'app/(user)/storage/page.tsx',
];

files.forEach(f => {
  let p = path.join('c:/Users/ftkes/Desktop/Project/allmodern', f);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    
    // Only process files that still have SortFilterBar tag
    if (!content.includes('<SortFilterBar productCount=')) return;

    // Fix imports
    if (!content.includes('FilterableProductLayout')) {
      content = content.replace(/import SortFilterBar from "@\/components\/ui\/SortFilterBar";/, 'import FilterableProductLayout from "@/components/ui/FilterableProductLayout";');
    }

    const titleMatch = content.match(/<h2 className="[^"]*text-2xl[^"]*">(.*?)<\/h2>/);
    const countMatch = content.match(/<SortFilterBar productCount={(\d+)} \/>/);
    
    if (titleMatch && countMatch) {
      const title = titleMatch[1];
      const count = countMatch[1];
      
      // Match from `<div className="flex items-end gap-2 pb-6">` up to the section opening for the grid
      const blockRegex = /<div className="flex items-end gap-2 pb-6">[\s\S]*?<SortFilterBar productCount={\d+} \/>\s*<\/section>\s*(?:{\/\*.*?\*\/}\s*)?<section[^>]*>/;
      content = content.replace(blockRegex, `<FilterableProductLayout title="${title}" itemCount={${count}}>`);

      // Replace the ending </section>
      content = content.replace(/<\/section>\s*({\/\* SEO Text \*\/}|<\/main>|<Footer \/>)/, `</FilterableProductLayout>\n      $1`);
      
      fs.writeFileSync(p, content);
    }
  }
});
