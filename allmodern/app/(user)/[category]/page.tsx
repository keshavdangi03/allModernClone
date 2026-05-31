import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { departmentNavItems, categoryMenus } from "@/components/layout/navigation-data";
import FilterableProductLayout from "@/components/ui/FilterableProductLayout";
import { slugifyNavLink } from "@/lib/utils";

interface PageProps {
  params: Promise<{ category: string }>;
}

/** Find the matching category from DB or static nav data */
async function resolveCategory(slug: string) {
  // Try DB first
  try {
    const dbCat = await prisma.category.findFirst({
      where: {
        OR: [
          { id: slug },
          { id: { equals: slug, mode: "insensitive" } },
        ],
      },
    });
    if (dbCat) {
      const menuKey = Object.keys(categoryMenus).find(
        (k) => k.toLowerCase() === dbCat.title.toLowerCase()
      );
      const staticMenu = menuKey ? (categoryMenus as any)[menuKey] : null;
      return {
        id: dbCat.id,
        title: dbCat.title,
        description: dbCat.description || staticMenu?.description || "",
        image: dbCat.image || staticMenu?.image || "/images/hero.png",
        sections: typeof dbCat.sections === "string"
          ? JSON.parse(dbCat.sections)
          : dbCat.sections || staticMenu?.sections || [],
        metaTitle: dbCat.metaTitle,
        metaDescription: dbCat.metaDescription,
        metaKeywords: dbCat.metaKeywords,
      };
    }
  } catch (_) {}

  // Fallback: match from static nav
  const navItem = departmentNavItems.find(
    (n) => n.href.replace("/", "") === slug
  );
  if (!navItem) return null;

  const menuKey = Object.keys(categoryMenus).find(
    (k) => k.toLowerCase() === navItem.label.toLowerCase()
  );
  const menu = menuKey ? (categoryMenus as any)[menuKey] : null;

  return {
    id: slug,
    title: navItem.label,
    description: menu?.description || "",
    image: menu?.image || "/images/hero.png",
    sections: menu?.sections || [],
    metaTitle: null,
    metaDescription: null,
    metaKeywords: null,
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category } = await params;
  const cat = await resolveCategory(category);
  if (!cat) return { title: "Category Not Found | AllModern" };
  return {
    title: `${cat.metaTitle || cat.title} | AllModern`,
    description: cat.metaDescription || cat.description?.slice(0, 160) || undefined,
    keywords: cat.metaKeywords || undefined,
  };
}

// Subcategory images cycle through placeholder images
const PLACEHOLDER_IMAGES = [
  "/images/cat_living_room.png",
  "/images/cat_bedroom.png",
  "/images/cat_dining.png",
  "/images/cat_outdoor.png",
  "/images/hero.png",
];

export default async function DynamicCategoryPage({ params }: PageProps) {
  const { category: categorySlug } = await params;
  const cat = await resolveCategory(categorySlug);

  if (!cat) {
    notFound();
  }

  const parentHref = `/${categorySlug}`;
  const allSubcategoryLinks: string[] = cat.sections.flatMap((s: any) => s.links || []);
  const relatedSearches = allSubcategoryLinks.slice(0, 20);

  return (
    <>
      <main className="bg-[#f3f3f3] pb-12">
        <section className="mx-auto max-w-[1400px] px-4 pb-8 pt-4 sm:px-6">

          {/* ── Hero Banner ── */}
          <div className="relative overflow-hidden">
            <div className="relative h-[300px] md:h-[440px]">
              <Image
                src={cat.image}
                alt={cat.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
            <h1 className="absolute inset-x-0 bottom-8 text-center text-[44px] md:text-[72px] font-bold text-white drop-shadow-lg tracking-tight leading-none">
              {cat.title}
            </h1>
          </div>

          {/* ── Subcategory Tiles (1st section links) ── */}
          {cat.sections.length > 0 && cat.sections[0].links.length > 0 && (
            <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-5">
              {cat.sections[0].links.slice(0, 5).map((link: string, idx: number) => (
                <Link
                  key={link}
                  href={`${parentHref}/${slugifyNavLink(link)}`}
                  className="block bg-white text-center group"
                >
                  <div className="relative aspect-[1.5/1] bg-slate-200">
                    <Image
                      src={PLACEHOLDER_IMAGES[idx % PLACEHOLDER_IMAGES.length]}
                      alt={link}
                      fill
                      className="object-cover transition duration-300 group-hover:opacity-90"
                    />
                  </div>
                  <p className="py-2.5 px-2 text-[12px] md:text-[13px] text-slate-800 leading-tight group-hover:underline">
                    {link}
                  </p>
                </Link>
              ))}
            </div>
          )}

          {/* ── Additional Sections with Links ── */}
          {cat.sections.slice(1).map((section: any, sIdx: number) => (
            <div key={section.title} className="mt-12 bg-white pt-6 pb-8 px-4 md:px-6">
              <h2 className="text-[28px] md:text-[34px] font-bold tracking-[-0.02em] text-slate-900 mb-6">
                {section.title}
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {section.links.map((link: string, idx: number) => (
                  <Link
                    key={link}
                    href={`${parentHref}/${slugifyNavLink(link)}`}
                    className="group block"
                  >
                    <div className="relative aspect-square bg-slate-200 mb-2 border border-transparent group-hover:border-slate-300 transition-colors overflow-hidden">
                      <Image
                        src={PLACEHOLDER_IMAGES[(sIdx * 5 + idx) % PLACEHOLDER_IMAGES.length]}
                        alt={link}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <h3 className="font-semibold text-[14px] text-slate-900 group-hover:underline leading-tight">
                      {link}
                    </h3>
                  </Link>
                ))}
              </div>
              <div className="mt-8 text-center md:text-right border-t border-slate-200 pt-6">
                <span className="inline-block text-[14px] font-bold tracking-wide text-slate-900 uppercase">
                  SHOP ALL {section.title.toUpperCase()}
                </span>
              </div>
            </div>
          ))}

          {/* ── Product Grid ── */}
          <div className="mt-12 bg-white p-4 md:p-6">
            <FilterableProductLayout
              title={cat.title}
              categoryName={cat.title}
              products={[]}
            />
          </div>

          {/* ── SEO Text ── */}
          {cat.description && (
            <section className="mt-8 bg-white p-6 md:p-8 border border-slate-200">
              <h3 className="text-[20px] font-bold text-slate-900 mb-3">{cat.title}</h3>
              <div className="text-[13px] text-slate-600 leading-relaxed font-sans space-y-4 max-w-[1000px]">
                <div dangerouslySetInnerHTML={{ __html: cat.description }} />
              </div>
            </section>
          )}

          {/* ── Related Searches ── */}
          {relatedSearches.length > 0 && (
            <section className="mt-8 bg-white p-6 md:p-8">
              <h4 className="text-[20px] font-bold tracking-[-0.02em] text-slate-900 mb-6">
                Related Searches
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {relatedSearches.map((item: string) => (
                  <Link
                    key={item}
                    href={`${parentHref}/${slugifyNavLink(item)}`}
                    className="rounded-full border border-slate-400 bg-white px-4 py-2 text-[13px] text-slate-800 hover:border-slate-800 hover:text-slate-900 transition-colors"
                  >
                    {item}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* ── Newsletter ── */}
          <div className="mt-8 bg-white py-12 flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-[18px] font-bold text-slate-900 mb-4">
              We like your style. Want to stay in touch?
            </h3>
            <form className="flex w-full max-w-[500px]">
              <input
                type="email"
                placeholder="Email Address"
                className="flex-1 h-12 border border-slate-400 px-4 text-[14px] text-slate-800 focus:outline-none focus:border-slate-800 placeholder-slate-500"
              />
              <button
                type="submit"
                className="h-12 bg-[#222222] text-white px-8 text-[14px] font-semibold hover:bg-black transition-colors ml-[-1px]"
              >
                Submit
              </button>
            </form>
            <Link href="/privacy-policy" className="text-[12px] text-slate-500 underline mt-4 hover:text-slate-800">
              Privacy Policy
            </Link>
          </div>

        </section>
      </main>
    </>
  );
}
