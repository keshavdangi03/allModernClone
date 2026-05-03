const fs = require('fs');
const path = require('path');

const files = [
  'app/decor-pillows/page.tsx', 
  'app/furniture/page.tsx', 
  'app/lighting/page.tsx', 
  'app/new/page.tsx', 
  'app/outdoor/page.tsx', 
  'app/wall-decor/page.tsx', 
  'app/(user)/baby-kids/page.tsx', 
  'app/(user)/bath/page.tsx', 
  'app/(user)/bedding/page.tsx', 
  'app/(user)/kitchen-tabletop/page.tsx', 
  'app/(user)/rugs/page.tsx', 
  'app/(user)/storage/page.tsx'
];

// Reusable grid and pagination template
const gridTemplate = (arrayName) => `
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {${arrayName}.map((p) => (
              <div key={p.id} className="group relative flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f4]">
                  <Image src={p.image || p.image1 || "/images/hero.png"} alt={p.name} fill className="object-cover mix-blend-multiply" />
                  <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm hover:text-slate-950 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </button>
                  {p.badge && (
                    <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white z-10">
                      {p.badge}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-1 flex-col">
                  {p.colors && (
                    <div className="mb-1.5 flex items-center gap-1">
                      {p.colors.map((color, idx) => (
                        <div key={idx} className="h-[15px] w-[15px] rounded-full border border-slate-300" style={{ backgroundColor: color }}></div>
                      ))}
                      {p.colorCount && <span className="text-[11px] text-slate-500">{p.colorCount} Colors</span>}
                    </div>
                  )}
                  <h3 className="mt-0.5 text-[13px] leading-tight text-slate-900 group-hover:underline whitespace-pre-line">
                    {p.name}
                  </h3>
                  {p.subtitle && <div className="text-[12px] text-slate-500 mt-0.5">{p.subtitle}</div>}
                  {p.rating && (
                    <div className="mt-1 flex items-center gap-1">
                      <StarRating rating={p.rating} />
                      <span className="text-[11px] text-slate-500">({p.reviews || 0})</span>
                    </div>
                  )}
                  <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <span className="text-[15px] font-bold text-[#a63f15]">{p.priceStr || \`$\${p.price}\`}</span>
                    {(p.origPriceStr || p.originalPrice) && (
                      <span className="text-[12px] text-slate-500 line-through">{p.origPriceStr || \`$\${p.originalPrice}\`}</span>
                    )}
                  </div>
                  {p.extraText && (
                    <div className="mt-1 text-[11px] text-slate-600 whitespace-pre-line leading-tight">
                      {p.extraText}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-slate-400 hover:bg-slate-50" aria-label="Previous page">
              <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <div className="flex items-center gap-4 text-[13px] text-slate-700">
              <span className="font-bold underline underline-offset-4">1</span>
              <button className="hover:underline">2</button>
              <button className="hover:underline">3</button>
              <button className="hover:underline">4</button>
              <span>...</span>
              <button className="hover:underline">10</button>
            </div>
            <button className="flex h-10 w-10 items-center justify-center border border-slate-900 bg-white text-slate-900 hover:bg-slate-50" aria-label="Next page">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
`;

for (const f of files) {
  const p = path.join('c:/Users/ftkes/Desktop/Project/allmodern', f);
  if (!fs.existsSync(p)) continue;
  let content = fs.readFileSync(p, 'utf8');

  // Fix imports
  if (!content.includes('FilterableProductLayout')) {
    if (content.includes('import SortFilterBar')) {
      content = content.replace(/import SortFilterBar from ".*?";/, 'import FilterableProductLayout from "@/components/ui/FilterableProductLayout";');
    } else {
      content = content.replace(/import Header from ".*?";/, 'import Header from "@/components/layout/Header";\nimport FilterableProductLayout from "@/components/ui/FilterableProductLayout";');
    }
  }

  // 1. Handle pages that already use FilterableProductLayout but have initialProducts instead of children (outdoor, furniture)
  if (content.includes('<FilterableProductLayout') && content.includes('initialProducts=')) {
    const layoutRegex = /<FilterableProductLayout title="([^"]+)" itemCount={(\d+)} initialProducts={([^}]+)} \/>/;
    const match = content.match(layoutRegex);
    if (match) {
      const title = match[1];
      const count = match[2];
      const arrayName = match[3];
      content = content.replace(layoutRegex, `<FilterableProductLayout title="${title}" itemCount="${count}">\n${gridTemplate(arrayName)}\n        </FilterableProductLayout>`);
      fs.writeFileSync(p, content);
      console.log('Fixed initialProducts pattern in', f);
    }
    continue;
  }

  // 2. Handle pages that have hardcoded MAIN CATEGORY SECTION
  // Look for the title and count
  const titleMatch = content.match(/<h2 className="[^"]*text-2xl[^"]*">(.*?)<\/h2>/);
  let countMatch = content.match(/<span className="pb-1 text-\[13px\] text-slate-600">([\d,]+) Items<\/span>/);
  if (!countMatch) {
    countMatch = content.match(/<SortFilterBar productCount={(\d+)}/);
  }

  if (titleMatch && countMatch) {
    const title = titleMatch[1];
    let count = countMatch[1].replace(/,/g, '');
    
    // We want to replace the whole section starting near the title down to the pagination end.
    // It's safer to use regex to find the start of the section and the end of pagination.
    
    // Start of section (could be just before <div className="flex items-end)
    // Actually we can just match from the <div className="flex items-end gap-2 pb-6"> down to the pagination
    const startRegex = /({\/\*\s*MAIN CATEGORY (SECTION|GRID).*?\*\/}\s*)?<section[^>]*>\s*<div className="flex items-end gap-2 pb-6">[\s\S]*?(?:<\/section>\s*)?(?:{\/\*\s*3-COLUMN PRODUCT GRID\s*\*\/}\s*)?<section[\s\S]*?<div className="grid grid-cols-2/;
    
    const endRegex = /{\/\* Pagination \*\/}[\s\S]*?<\/div>\s*<\/section>/;

    const fullSectionMatch = content.match(new RegExp(startRegex.source + '[\\s\\S]*?' + endRegex.source));
    if (fullSectionMatch) {
      // Find array name used in map
      const mapMatch = fullSectionMatch[0].match(/{([a-zA-Z0-9_]+)\.map\(/);
      const arrayName = mapMatch ? mapMatch[1] : 'mainGridProducts';

      // Keep the comment if it matched
      const commentMatch = fullSectionMatch[0].match(/{\/\*\s*MAIN CATEGORY (SECTION|GRID).*?\*\/}/);
      const commentStr = commentMatch ? commentMatch[0] + '\n        ' : '';

      content = content.replace(fullSectionMatch[0], `${commentStr}<FilterableProductLayout title="${title}" itemCount="${count}">\n${gridTemplate(arrayName)}\n        </FilterableProductLayout>`);
      fs.writeFileSync(p, content);
      console.log('Fixed hardcoded pattern in', f);
    } else {
      console.log('Could not match full section in', f);
    }
  } else {
    console.log('Could not find title/count in', f);
  }
}
