const fs = require('fs');
const path = require('path');

const dir = 'e:/Programming/Frontend/allModernClone/allmodern/app/(user)';
const pages = [
  'wall-decor/page.tsx', 'storage/page.tsx', 'rugs/page.tsx', 'outdoor/page.tsx',
  'new/page.tsx', 'lighting/page.tsx', 'kitchen-tabletop/page.tsx', 'furniture/page.tsx',
  'decor-pillows/page.tsx', 'best-sellers/page.tsx', 'bedding/page.tsx', 'bath/page.tsx',
  'baby-kids/page.tsx'
];

let catalog = [];

for (const p of pages) {
  const file = path.join(dir, p);
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, 'utf8');
  
  // Find category name
  const catMatch = content.match(/categoryName="([^"]+)"/);
  const catName = catMatch ? catMatch[1] : '';
  if (!catName) continue;

  // Find array name
  const propMatch = content.match(/products=\{([a-zA-Z0-9_]+)\}/);
  if (!propMatch) continue;
  const arrayName = propMatch[1];

  // Extract array block using regex
  // Match: const arrayName = [ ... ];
  const arrayRegex = new RegExp(`const\\s+${arrayName}[^=]*=\\s*(\\[[\\s\\S]*?\\]);`, 'm');
  const arrayDataMatch = content.match(arrayRegex);
  
  if (arrayDataMatch) {
    try {
      // Evaluate the array string into an actual JS object
      // We wrap it in an IIFE to safely evaluate it
      // Some objects might use imported variables, but these are mostly static strings
      let arrayStr = arrayDataMatch[1];
      
      // Clean up common React/Next.js syntax that breaks eval if not defined
      arrayStr = arrayStr.replace(/<[^>]*>/g, '""'); // Strip JSX if any
      
      const parsedArray = eval(`(${arrayStr})`);
      
      // Add categories array to each product and ensure unique IDs globally
      for (const item of parsedArray) {
        if (typeof item !== 'object' || !item) continue;
        item.categories = [catName];
        
        // Ensure ID is globally unique (some pages might reuse "mg1", "mg2")
        // We will prefix with category name hash or just use a new Date.now() style, but we want it deterministic
        item.id = `${p.split('/')[0]}_${item.id}`;
        
        catalog.push(item);
      }
      console.log(`Extracted ${parsedArray.length} items from ${p} (Category: ${catName})`);
    } catch (e) {
      console.error(`Failed to parse array in ${p}:`, e.message);
    }
  } else {
    console.log(`Could not find array definition for ${arrayName} in ${p}`);
  }
}

const outDir = path.join('e:/Programming/Frontend/allModernClone/allmodern/public/data');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

fs.writeFileSync(path.join(outDir, 'catalog.json'), JSON.stringify(catalog, null, 2));
console.log(`Successfully extracted ${catalog.length} total products to catalog.json`);
