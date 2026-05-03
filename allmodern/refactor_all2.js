const fs = require('fs');
const path = require('path');

const files = [
  'app/decor-pillows/page.tsx', 
  'app/new/page.tsx', 
  'app/(user)/baby-kids/page.tsx', 
  'app/(user)/bath/page.tsx', 
  'app/(user)/bedding/page.tsx', 
  'app/(user)/kitchen-tabletop/page.tsx', 
  'app/(user)/storage/page.tsx'
];

const gridTemplate = (arrayName) => `
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {${arrayName}.map((p, idx) => (
              <div key={p.id || idx} className="group relative flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f4] border border-transparent group-hover:border-slate-200 transition">
                  <Image src={p.image || "/images/hero.png"} alt={p.name} fill className="object-cover mix-blend-multiply p-6" />
                  <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm hover:text-red-500 hover:bg-white z-10 transition">
                    <Heart className="h-4 w-4" />
                  </button>
                  {p.badge && (
                    <div className="absolute bottom-3 left-3 bg-[#a63f15] px-1.5 py-0.5 text-[11px] font-bold text-white z-10 tracking-wide">
                      {p.badge}
                    </div>
                  )}
                  {p.sale && !p.badge && (
                    <div className="absolute bottom-3 left-3 bg-[#bf5a2e] px-1.5 py-0.5 text-[11px] font-bold text-white z-10 tracking-wide">
                      Sale
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-1 flex-col px-1">
                  {(p.colors && p.colors > 0) ? (
                    <div className="flex items-center gap-1 mb-2">
                      {Array.from({ length: Math.min(p.colors, 5) }).map((_, i) => (
                          <div key={i} className={\`w-5 h-5 rounded-full border border-slate-300 \${['bg-slate-800', 'bg-[#c5a687]', 'bg-white', 'bg-[#466a7b]', 'bg-slate-400'][i % 5]}\`} />
                      ))}
                      {p.colors > 5 && <span className="text-[12px] text-slate-500 ml-1">+{p.colors - 5}</span>}
                    </div>
                  ) : null}
                  {p.subtitle && (!p.colors || p.colors === 0) && <div className="text-[11px] text-slate-500 mb-1">{p.subtitle}</div>}
                  {p.subtext && <div className="text-[11px] text-slate-500 mb-1">{p.subtext}</div>}
                  
                  <h3 className="mt-0.5 text-[13px] leading-snug text-slate-900 group-hover:underline">
                    {p.name}
                  </h3>
                  
                  {(p.rating && p.rating > 0) ? (
                    <div className="mt-1 flex items-center gap-1">
                      <StarRating rating={p.rating} />
                      <span className="text-[11px] text-slate-500">({p.reviews})</span>
                    </div>
                  ) : null}
                  
                  <div className="mt-1 flex flex-col gap-0.5 mt-auto">
                    <div className="flex items-baseline gap-2">
                      {p.badge === 'Sale' || p.sale || p.originalPrice ? (
                        <>
                          <span className="text-[15px] font-bold text-[#a63f15]">\${p.price} {p.unit || ""}</span>
                          {p.originalPrice && <span className="text-[12px] text-slate-500 line-through">\${p.originalPrice} {p.unit || ""}</span>}
                        </>
                      ) : (
                        <span className="text-[15px] font-bold text-slate-900">\${p.price} {p.unit || ""}</span>
                      )}
                    </div>
                    {p.extraText && (
                      <div className="text-[12px] text-slate-600 whitespace-pre-line leading-tight">{p.extraText}</div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-2">
            <button className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-slate-400 hover:border-slate-400 transition" aria-label="Previous page">
              <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <div className="flex items-center text-[14px] text-slate-700">
              <span className="flex h-10 w-10 items-center justify-center border-b-2 border-slate-900 font-bold text-slate-900">1</span>
              <button className="flex h-10 w-10 items-center justify-center hover:bg-slate-100 rounded transition">2</button>
              <button className="flex h-10 w-10 items-center justify-center hover:bg-slate-100 rounded transition">3</button>
              <button className="flex h-10 w-10 items-center justify-center hover:bg-slate-100 rounded transition">4</button>
              <span className="flex h-10 w-10 items-center justify-center">...</span>
              <button className="flex h-10 w-10 items-center justify-center hover:bg-slate-100 rounded transition">12</button>
            </div>
            <button className="flex h-10 w-10 items-center justify-center border border-slate-400 bg-white text-slate-800 hover:bg-slate-50 transition" aria-label="Next page">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
`;

for (const f of files) {
  const p = path.join('c:/Users/ftkes/Desktop/Project/allmodern', f);
  if (!fs.existsSync(p)) continue;
  let content = fs.readFileSync(p, 'utf8');

  // Skip if already done
  if (content.includes('FilterableProductLayout') && !content.includes('initialProducts')) {
    console.log('Skipping', f);
    continue;
  }

  // Fix imports
  if (!content.includes('FilterableProductLayout')) {
    if (content.includes('import SortFilterBar')) {
      content = content.replace(/import SortFilterBar from ".*?";/, 'import FilterableProductLayout from "@/components/ui/FilterableProductLayout";');
    } else {
      content = content.replace(/import Header from ".*?";/, 'import Header from "@/components/layout/Header";\nimport FilterableProductLayout from "@/components/ui/FilterableProductLayout";');
    }
  }

  const titleRegex = /<h2[^>]*>([^<]+)<\/h2>\s*<span[^>]*>([\d,]+)\s*Items<\/span>/;
  const tMatch = content.match(titleRegex);
  
  if (tMatch) {
    const title = tMatch[1].trim();
    const count = tMatch[2].replace(/,/g, '');
    
    const blockStartIdx = content.lastIndexOf('<section', tMatch.index);
    let blockStart = blockStartIdx !== -1 && (tMatch.index - blockStartIdx) < 500 ? blockStartIdx : content.lastIndexOf('<div', tMatch.index);
    if(content.lastIndexOf('{\/*', tMatch.index) > blockStart && content.lastIndexOf('{\/*', tMatch.index) < tMatch.index) {
       blockStart = content.lastIndexOf('{\/*', tMatch.index);
    }
    
    let paginationIdx = content.indexOf('Pagination', tMatch.index);
    if (paginationIdx === -1) paginationIdx = content.indexOf('pagination', tMatch.index);

    if (paginationIdx !== -1) {
       let endIdx = content.indexOf('</section>', paginationIdx);
       if (endIdx === -1) {
          endIdx = content.indexOf('<hr', paginationIdx);
       }
       if (endIdx === -1) {
          endIdx = content.indexOf('<div className="mb-12">', paginationIdx);
       }
       if (endIdx === -1) {
          endIdx = content.indexOf('</div>\\n\\n          <hr', paginationIdx) + 6;
       }
       
       if (endIdx !== -1) {
          const sliceStr = content.substring(blockStart, endIdx);
          const mapMatch = sliceStr.match(/{([a-zA-Z0-9_]+)\.map\(/);
          const arrayName = mapMatch ? mapMatch[1] : 'allProducts';
          
          const newBlock = `<FilterableProductLayout title="${title}" itemCount={${count}}>\n${gridTemplate(arrayName)}\n        </FilterableProductLayout>\n        `;
          content = content.substring(0, blockStart) + newBlock + content.substring(endIdx);
          
          fs.writeFileSync(p, content);
          console.log('Fixed', f);
       } else {
         console.log('Could not find end of section in', f);
       }
    } else {
      console.log('Could not find Pagination in', f);
    }
  } else {
    console.log('Title regex failed in', f);
  }
}
