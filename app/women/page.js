import ProductListing from "@/components/ProductListing";
import { products } from "@/data/products";
import { subCategoriesByCategory, pageBanners } from "@/data/categories";

export const metadata = { title: "Women | ZYRA" };

export default function WomenPage({ searchParams }) {
  const womenProducts = products.filter((p) => p.category === "Women");
  return (
    <ProductListing
      title="Womenswear"
      subtitle="Dresses, ethnic wear, denim & everyday essentials for her."
      banner={pageBanners.Women}
      allProducts={womenProducts}
      subCategories={subCategoriesByCategory.Women}
      initialSub={searchParams?.sub}
    />
  );
}
