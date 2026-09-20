import ProductListing from "@/components/ProductListing";
import { newArrivals } from "@/data/products";

export const metadata = { title: "New Arrivals | ZYRA" };

export default function NewArrivalsPage() {
  return (
    <ProductListing
      title="New Arrivals"
      subtitle="Fresh off the rack — the latest additions to ZYRA."
      banner="https://images.unsplash.com/photo-1688111421205-a0a85415b224?auto=format&fit=crop&w=1600&q=80"
      allProducts={newArrivals}
      subCategories={Array.from(new Set(newArrivals.map((p) => p.sub)))}
    />
  );
}
