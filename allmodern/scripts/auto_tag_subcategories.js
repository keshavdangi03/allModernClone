const fs = require('fs');

const catalogPath = 'public/data/catalog.json';
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

// Keywords mapping to "Main > Sub"
const rules = [
  { keyword: 'sofa', tag: 'Furniture > Sofas' },
  { keyword: 'loveseat', tag: 'Furniture > Sofas' },
  { keyword: 'sectional', tag: 'Furniture > Sectionals' },
  { keyword: 'chair', tag: 'Furniture > Accent + Lounge Chairs' },
  { keyword: 'bed', tag: 'Furniture > Beds' },
  { keyword: 'table', tag: 'Furniture > Coffee Tables' }, // Simplified
  { keyword: 'towel', tag: 'Bath > Bath Towels' },
  { keyword: 'rug', tag: 'Rugs > Area Rugs' },
  { keyword: 'pillow', tag: 'Decor + Pillows > Throw Pillows' },
  { keyword: 'lamp', tag: 'Lighting > Table Lamps' },
  { keyword: 'chandelier', tag: 'Lighting > Chandeliers' },
  { keyword: 'outdoor', tag: 'Outdoor > Outdoor Furniture' },
];

let updatedCount = 0;

catalog.forEach(product => {
  const nameLower = product.name.toLowerCase();
  
  // Normalize main category if needed (e.g. Bathroom -> Bath)
  if (product.categories) {
    product.categories = product.categories.map(c => c === 'Bathroom' ? 'Bath' : c);
  }

  rules.forEach(rule => {
    if (nameLower.includes(rule.keyword) && !product.categories.includes(rule.tag)) {
      product.categories.push(rule.tag);
      updatedCount++;
    }
  });
});

fs.writeFileSync(catalogPath, JSON.stringify(catalog, null, 2));
console.log(`Auto-tagged ${updatedCount} subcategories across the catalog.`);
