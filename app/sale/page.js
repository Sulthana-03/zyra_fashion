import ProductListing from "@/components/ProductListing";
import { saleProducts } from "@/data/products";

export const metadata = { title: "Sale | ZYRA" };

export default function SalePage() {
  return (
    <ProductListing
      title="The Grand Sale"
      subtitle="Up to 40% off across men's, women's, accessories & footwear."
      banner="https://images.unsplash.com/photo-1760565030243-c92ed557e8da?auto=format&fit=crop&w=1600&q=80"
      allProducts={saleProducts}
      subCategories={Array.from(new Set(saleProducts.map((p) => p.sub)))}
    />
  );
}
