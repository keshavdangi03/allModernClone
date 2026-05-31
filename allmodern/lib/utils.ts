export function getProductUrl(p: { id: string; name: string; slug?: string; categories?: string[] }) {
  const category = p.categories && p.categories.length > 0
    ? p.categories[0].toLowerCase().split(" >")[0].replace(/[^a-z0-9]+/g, "-")
    : "product";
  const slug = p.slug || p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-") + "-" + p.id;
  return `/${category}/pdp/${slug}.html`;
}

/**
 * Converts a navigation link label into a URL-friendly slug.
 * e.g. "Accent + Lounge Chairs" → "accent-lounge-chairs"
 *      "Bar Stools + Counter Stools" → "bar-stools-counter-stools"
 */
export function slugifyNavLink(label: string): string {
  return label
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

/**
 * Builds the full href for a subcategory link.
 * e.g. parentHref="/furniture", link="Sofas" → "/furniture/sofas"
 */
export function getSubcategoryHref(parentHref: string, link: string): string {
  const parentSlug = parentHref.startsWith("/") ? parentHref : `/${parentHref}`;
  return `${parentSlug}/${slugifyNavLink(link)}`;
}

