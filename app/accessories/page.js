import ProductListing from "@/components/ProductListing";
import { products } from "@/data/products";
import { subCategoriesByCategory, pageBanners } from "@/data/categories";

export const metadata = { title: "Accessories | ZYRA" };

export default function AccessoriesPage({ searchParams }) {
  const accessoryProducts = products.filter((p) => p.category === "Accessories");
  return (
    <ProductListing
      title="Accessories"
      subtitle="Bags, watches, jewelry & everything that finishes the look."
      banner={pageBanners.Accessories}
      allProducts={accessoryProducts}
      subCategories={subCategoriesByCategory.Accessories}
      initialSub={searchParams?.sub}
    />
  );
}
