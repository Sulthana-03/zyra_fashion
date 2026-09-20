import ProductListing from "@/components/ProductListing";
import { products } from "@/data/products";
import { subCategoriesByCategory, pageBanners } from "@/data/categories";

export const metadata = { title: "Men | ZYRA" };

export default function MenPage({ searchParams }) {
  const menProducts = products.filter((p) => p.category === "Men");
  return (
    <ProductListing
      title="Menswear"
      subtitle="Shirts, denim, layers & essentials for the modern man."
      banner={pageBanners.Men}
      allProducts={menProducts}
      subCategories={subCategoriesByCategory.Men}
      initialSub={searchParams?.sub}
    />
  );
}
