import ProductListing from "@/components/ProductListing";
import { products } from "@/data/products";
import { subCategoriesByCategory, pageBanners } from "@/data/categories";

export const metadata = { title: "Footwear | ZYRA" };

export default function FootwearPage({ searchParams }) {
  const footwearProducts = products.filter((p) => p.category === "Footwear");
  return (
    <ProductListing
      title="Footwear"
      subtitle="Sneakers, heels, sandals & formal shoes for every step."
      banner={pageBanners.Footwear}
      allProducts={footwearProducts}
      subCategories={subCategoriesByCategory.Footwear}
      initialSub={searchParams?.sub}
    />
  );
}
