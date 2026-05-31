import { getProductBySlug, getProducts } from "@/lib/actions/products";
import ProductDetailClient from "./ProductDetailClient";
import { notFound } from "next/navigation";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    category: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cleanSlug = slug.replace(/\.html$/, "");
  const product = await getProductBySlug(cleanSlug);
  if (!product) {
    return {
      title: "Product Not Found | AllModern",
    };
  }
  return {
    title: `${product.name} | AllModern`,
    description: product.shortDescription || product.description || undefined,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { category, slug } = await params;
  const cleanSlug = slug.replace(/\.html$/, "");
  const product = await getProductBySlug(cleanSlug);

  if (!product) {
    notFound();
  }

  // Fetch some other products in the same category for recommendations
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 5);

  return (
    <ProductDetailClient 
      product={product as any} 
      relatedProducts={relatedProducts as any} 
      categoryName={category}
    />
  );
}
