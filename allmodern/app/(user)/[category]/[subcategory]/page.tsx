import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import { departmentNavItems, categoryMenus } from "@/components/layout/navigation-data";
import FilterableProductLayout from "@/components/ui/FilterableProductLayout";
import { slugifyNavLink } from "@/lib/utils";

interface PageProps {
  params: Promise<{
    category: string;
    subcategory: string;
  }>;
}

// Find matching category details
async function resolvePageData(categorySlug: string, subcategorySlug: string) {
  let mainCategoryTitle = "";
  let sections: any[] = [];
  let description = "";

  // Try DB first
  try {
    const dbCat = await prisma.category.findFirst({
      where: {
        OR: [
          { id: categorySlug },
          { id: { equals: categorySlug, mode: "insensitive" } },
        ],
      },
    });
    if (dbCat) {
      mainCategoryTitle = dbCat.title;
      sections = typeof dbCat.sections === "string"
        ? JSON.parse(dbCat.sections)
        : dbCat.sections || [];
      description = dbCat.description || "";
    }
  } catch (_) {}

  // Fallback to static nav
  if (!mainCategoryTitle) {
    const navItem = departmentNavItems.find(
      (n) => n.href.replace("/", "") === categorySlug
    );
    if (!navItem) return null;

    mainCategoryTitle = navItem.label;
    const menuKey = Object.keys(categoryMenus).find(
      (k) => k.toLowerCase() === mainCategoryTitle.toLowerCase()
    );
    const menu = menuKey ? categoryMenus[menuKey] : null;

    if (menu) {
      sections = menu.sections || [];
      description = menu.description || "";
    }
  }

  if (!mainCategoryTitle || !sections) return null;

  // Check if subcategorySlug matches a section title (column header)
  const section = sections.find(
    (s: any) => slugifyNavLink(s.title) === subcategorySlug
  );
  
  if (section) {
    // It's a column header: return all links inside this column
    const targetCategories = section.links.map(
      (link: string) => `${mainCategoryTitle} > ${link}`
    );
    return {
      title: section.title,
      mainCategoryTitle,
      targetCategories,
      isSection: true,
      description: `Shop modern and contemporary ${section.title.toLowerCase()} at AllModern.`
    };
  }

  // Check if subcategorySlug matches a sub-link directly
  let matchedLink: string | null = null;
  for (const s of sections) {
    const found = s.links.find((l: string) => slugifyNavLink(l) === subcategorySlug);
    if (found) {
      matchedLink = found;
      break;
    }
  }

  if (matchedLink) {
    // It's a direct sub-link: e.g. /furniture/sofas
    return {
      title: matchedLink,
      mainCategoryTitle,
      targetCategories: [`${mainCategoryTitle} > ${matchedLink}`, matchedLink],
      isSection: false,
      description: `Shop modern and contemporary ${matchedLink.toLowerCase()} at AllModern.`
    };
  }

  return null;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { category, subcategory } = await params;
  const data = await resolvePageData(category, subcategory);
  if (!data) return { title: "Page Not Found | AllModern" };
  return {
    title: `${data.title} | ${data.mainCategoryTitle} | AllModern`,
    description: data.description,
  };
}

export default async function SubCategoryPage({ params }: PageProps) {
  const { category: categorySlug, subcategory: subcategorySlug } = await params;

  const collectionsRedirects: Record<string, string> = {
    "bedroom-collections": "/bedroom-collections",
    "sofa-and-sectional-collections": "/sofa-sectional-collections",
    "sofa-sectional-collections": "/sofa-sectional-collections",
    "living-room-accent-collections": "/living-room-accent-collections",
    "kitchen-and-dining-collections": "/kitchen-dining-collections",
    "kitchen-dining-collections": "/kitchen-dining-collections",
    "home-office-collections": "/home-office-collections",
    "lighting-collections": "/lighting-collections",
    "rug-collections": "/rug-collections",
    "outdoor-collections": "/outdoor-collections",
  };

  if (collectionsRedirects[subcategorySlug]) {
    redirect(collectionsRedirects[subcategorySlug]);
  }

  const data = await resolvePageData(categorySlug, subcategorySlug);

  if (!data) {
    notFound();
  }

  // Fetch products matching target categories
  const products = await prisma.product.findMany({
    where: {
      categories: {
        hasSome: data.targetCategories
      }
    }
  }).catch(() => []);

  // Normalize products to match CategoryProductCard requirements
  const normalizedProducts = products.map((p) => ({
    ...p,
    price: p.price || 0,
    originalPrice: p.originalPrice || null,
    badge: p.badge || null,
  }));

  return (
    <main className="bg-white min-h-screen pb-16">
      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200 py-3">
        <div className="mx-auto max-w-[1400px] px-4 sm:px-6 text-[12px] text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-slate-900 transition">Home</Link>
          <span>/</span>
          <Link href={`/${categorySlug}`} className="hover:text-slate-900 transition">{data.mainCategoryTitle}</Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold">{data.title}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1400px] px-4 pt-8 sm:px-6">
        <FilterableProductLayout 
          title={data.title} 
          products={normalizedProducts as any} 
          categoryName={data.title}
        />
      </div>
    </main>
  );
}
