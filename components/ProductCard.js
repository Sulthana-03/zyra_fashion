"use client";

import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import RatingStars from "./RatingStars";
import { useWishlist } from "@/context/WishlistContext";
import { useCart } from "@/context/CartContext";

export default function ProductCard({ product, index = 0 }) {
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { items, addToCart } = useCart();
  const router = useRouter();
  const wished = isWishlisted(product.id);
  // Quick-add always uses the default variant, so only match the cart line
  // for that specific default size/color — not any variant of this product.
  const defaultSize = product.sizes?.[0];
  const defaultColor = product.colors?.[0];
  const inCart = items.some(
    (i) => i.productId === product.id && i.size === defaultSize && i.color === defaultColor
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
      className="group relative"
    >
      <div className="relative rounded-2xl overflow-hidden zoom-img bg-zyra-cream">
        <Link href={`/product/${product.id}`} className="block relative aspect-[3/4]">
          <SafeImage
            src={product.images[0]}
            alt={product.name}
            fill
          />
        </Link>

        {product.discount > 0 && (
          <span className="absolute top-3 left-3 bg-zyra-black text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">
            -{product.discount}%
          </span>
        )}

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="Toggle wishlist"
          className="absolute top-3 right-3 bg-white/90 backdrop-blur w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-transform hover:scale-110"
        >
          {wished ? <FaHeart className="text-zyra-rose" size={15} /> : <FiHeart size={15} />}
        </button>

        {/* Visible by default (touch devices don't really have ":hover" —
            mobile browsers fake it for a split second on tap, which is why
            this used to flash and disappear instead of staying tappable).
            The hide-until-hover behavior is now only applied from md upward,
            where a mouse pointer actually exists to hover with. */}
        <button
          onClick={() => (inCart ? router.push("/cart") : addToCart(product))}
          className="absolute left-3 right-3 bottom-3 translate-y-0 opacity-100 md:translate-y-14 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-300 bg-zyra-black text-white text-xs font-semibold py-2.5 rounded-full flex items-center justify-center gap-2"
        >
          <HiOutlineShoppingBag size={16} /> {inCart ? "Go to Cart" : "Add to Cart"}
        </button>
      </div>

      <Link href={`/product/${product.id}`} className="block mt-3">
        <p className="text-[11px] uppercase tracking-wide text-zyra-gray">{product.sub}</p>
        <h3 className="font-medium text-zyra-black line-clamp-1 mt-0.5">{product.name}</h3>
        <div className="mt-1">
          <RatingStars rating={product.rating} size={12} />
        </div>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="font-semibold text-zyra-black">₹{product.price.toLocaleString("en-IN")}</span>
          {product.discount > 0 && (
            <span className="text-sm text-zyra-gray line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
