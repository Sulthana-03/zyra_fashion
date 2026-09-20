"use client";

import Link from "next/link";
import { FiArrowRight, FiHeart } from "react-icons/fi";
import ProductCard from "@/components/ProductCard";
import { useWishlist } from "@/context/WishlistContext";
import { products } from "@/data/products";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const wishedProducts = products.filter((p) => ids.includes(p.id));

  if (wishedProducts.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-zyra-cream flex items-center justify-center mx-auto mb-6">
          <FiHeart size={32} className="text-zyra-rose" />
        </div>
        <h1 className="text-2xl font-display font-semibold">Your wishlist is empty</h1>
        <p className="text-zyra-gray mt-2">Save the pieces you love and shop them later.</p>
        <Link href="/" className="btn-primary mt-7 inline-flex">
          Discover Products <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl font-display font-semibold mb-8">My Wishlist ({wishedProducts.length})</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishedProducts.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </div>
  );
}
