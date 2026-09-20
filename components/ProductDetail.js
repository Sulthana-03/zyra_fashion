"use client";
import SafeImage from "@/components/SafeImage";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiHeart, FiTruck, FiRefreshCw, FiShield, FiCheck, FiX, FiChevronDown } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import RatingStars from "@/components/RatingStars";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

const mockReviews = [
  { name: "Aditi S.", rating: 5, date: "2 weeks ago", text: "Fabric quality exceeded my expectations. Fits true to size!" },
  { name: "Vikram J.", rating: 4, date: "1 month ago", text: "Great product, delivery was a day early. Would buy again." },
  { name: "Neha K.", rating: 5, date: "1 month ago", text: "Exactly like the pictures. Very happy with this purchase." },
  { name: "Rahul D.", rating: 4, date: "2 months ago", text: "Good value for money. Color is slightly darker than shown but still nice." },
];

export default function ProductDetail({ product, related }) {
  const [activeImg, setActiveImg] = useState(0);
  const [size, setSize] = useState(product.sizes?.[0]);
  const [color, setColor] = useState(product.colors?.[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("description");
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [addedMsg, setAddedMsg] = useState(false);

  const { items, addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const router = useRouter();
  const wished = isWishlisted(product.id);
  // Check the SPECIFIC size/color combo currently selected, not just whether
  // any variant of this product is in the cart — otherwise picking a
  // different color after adding one variant would wrongly show "Go to Cart"
  // for a variant that was never actually added.
  const inCart = items.some((i) => i.productId === product.id && i.size === size && i.color === color);

  const handleAddToCart = () => {
    if (inCart) {
      router.push("/cart");
      return;
    }
    addToCart(product, { size, color, qty, image: product.images[activeImg] });
    setAddedMsg(true);
    setTimeout(() => setAddedMsg(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, { size, color, qty, image: product.images[activeImg] });
    router.push("/checkout");
  };

  const stockLabel = useMemo(() => {
    if (product.stock === 0) return { text: "Out of Stock", color: "text-red-600" };
    if (product.stock <= 5) return { text: `Only ${product.stock} left!`, color: "text-zyra-rose" };
    return { text: "In Stock", color: "text-green-600" };
  }, [product.stock]);

  return (
    <div className="container-x py-10">
      <p className="text-xs text-zyra-gray mb-6">
        <Link href="/" className="hover:text-zyra-black">Home</Link> /{" "}
        <Link href={`/${product.category.toLowerCase()}`} className="hover:text-zyra-black">{product.category}</Link> /{" "}
        <span className="text-zyra-black">{product.name}</span>
      </p>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Gallery */}
        <div>
          <motion.div
            key={activeImg}
            initial={{ opacity: 0.4 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-zyra-cream"
          >
            <SafeImage src={product.images[activeImg]} alt={product.name} className="w-full h-full object-cover" />
            {product.discount > 0 && (
              <span className="absolute top-4 left-4 bg-zyra-black text-white text-xs font-semibold px-3 py-1.5 rounded-full">
                {product.discount}% OFF
              </span>
            )}
          </motion.div>
          <div className="flex gap-3 mt-4">
            {product.images.map((img, i) => (
              <button
                key={i}
                onClick={() => {
                  setActiveImg(i);
                  // Selecting a thumbnail directly must also select the matching
                  // color (when this image index has one) — otherwise the color
                  // state stays on whatever was picked earlier, and Add to Cart
                  // silently adds the WRONG color while the page shows the image
                  // you actually clicked. This is what was making two different
                  // variants both show "Go to Cart" after only adding one.
                  if (product.colors?.[i]) setColor(product.colors[i]);
                }}
                className={`w-20 h-24 rounded-xl overflow-hidden border-2 transition-colors ${
                  activeImg === i ? "border-zyra-gold" : "border-transparent"
                }`}
              >
                <SafeImage src={img} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs uppercase tracking-widest text-zyra-gold font-semibold">{product.brand}</p>
          <h1 className="font-display text-2xl md:text-3xl font-semibold text-zyra-black mt-1">{product.name}</h1>

          <div className="flex items-center gap-3 mt-3">
            <RatingStars rating={product.rating} showValue />
            <span className="text-sm text-zyra-gray">{product.reviewsCount} reviews</span>
          </div>

          <div className="flex items-baseline gap-3 mt-5">
            <span className="text-2xl font-bold text-zyra-black">₹{product.price.toLocaleString("en-IN")}</span>
            {product.discount > 0 && (
              <>
                <span className="text-zyra-gray line-through">₹{product.mrp.toLocaleString("en-IN")}</span>
                <span className="text-green-600 text-sm font-semibold">{product.discount}% off</span>
              </>
            )}
          </div>
          <p className={`text-sm mt-2 font-medium ${stockLabel.color}`}>{stockLabel.text}</p>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="mt-6">
              <p className="text-sm font-semibold mb-2">Color: <span className="text-zyra-gray font-normal">{color}</span></p>
              <div className="flex gap-2">
                {product.colors.map((c, ci) => (
                  <button
                    key={c}
                    onClick={() => {
                      setColor(c);
                      // Show the image that matches this color when one exists for it.
                      if (product.images[ci]) setActiveImg(ci);
                    }}
                    className={`px-4 py-2 rounded-full text-xs border transition-colors ${
                      color === c ? "bg-zyra-black text-white border-zyra-black" : "border-black/15 hover:border-zyra-black"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-semibold">Size: <span className="text-zyra-gray font-normal">{size}</span></p>
                <button onClick={() => setSizeChartOpen(true)} className="text-xs underline text-zyra-gray hover:text-zyra-black">
                  Size Chart
                </button>
              </div>
              <div className="flex gap-2 flex-wrap">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`w-12 h-11 rounded-lg text-sm border transition-colors ${
                      size === s ? "bg-zyra-black text-white border-zyra-black" : "border-black/15 hover:border-zyra-black"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Qty */}
          <div className="mt-6">
            <p className="text-sm font-semibold mb-2">Quantity</p>
            <div className="inline-flex items-center border border-black/15 rounded-full">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-10 h-10 text-lg">−</button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button onClick={() => setQty((q) => Math.min(product.stock || 10, q + 1))} className="w-10 h-10 text-lg">+</button>
            </div>
          </div>

          {/* CTAs — on a narrow phone, three flex-1 buttons in one row don't
              leave enough width for "Add to Cart" to fit on one line. It
              wraps to 2-3 lines, and since the button is pill-shaped
              (border-radius: 999px), that extra wrapped height turns it into
              the big near-circle blob seen on mobile. Stacking to a column
              below the sm breakpoint (full-width, single-line buttons) fixes
              it; from sm upward there's enough room to go back to one row. */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <div className="flex gap-3 flex-1">
              <button onClick={handleAddToCart} className="btn-primary flex-1" disabled={product.stock === 0}>
                <HiOutlineShoppingBag /> {inCart ? "Go to Cart" : "Add to Cart"}
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label="Toggle wishlist"
                className="w-[52px] h-[52px] flex-shrink-0 rounded-full border border-black/15 flex items-center justify-center hover:border-zyra-rose transition-colors sm:hidden"
              >
                {wished ? <FaHeart className="text-zyra-rose" /> : <FiHeart />}
              </button>
            </div>
            <button onClick={handleBuyNow} className="btn-outline flex-1" disabled={product.stock === 0}>
              Buy Now
            </button>
            <button
              onClick={() => toggleWishlist(product.id)}
              aria-label="Toggle wishlist"
              className="hidden sm:flex w-[52px] h-[52px] flex-shrink-0 rounded-full border border-black/15 items-center justify-center hover:border-zyra-rose transition-colors"
            >
              {wished ? <FaHeart className="text-zyra-rose" /> : <FiHeart />}
            </button>
          </div>

          <AnimatePresence>
            {addedMsg && (
              <motion.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-green-600 text-sm mt-3 flex items-center gap-1.5"
              >
                <FiCheck /> Added to your cart!
              </motion.p>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-8 pt-6 border-t border-black/10">
            {[
              { icon: FiTruck, text: "Free delivery over ₹999" },
              { icon: FiRefreshCw, text: "7-day easy returns" },
              { icon: FiShield, text: "100% authentic" },
            ].map((f) => (
              <div key={f.text} className="text-center">
                <f.icon className="mx-auto mb-1.5 text-zyra-gold" size={20} />
                <p className="text-[11px] text-zyra-gray">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <div className="flex gap-8 border-b border-black/10">
          {[
            { key: "description", label: "Description" },
            { key: "reviews", label: `Reviews (${product.reviewsCount})` },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`pb-4 text-sm font-medium relative ${tab === t.key ? "text-zyra-black" : "text-zyra-gray"}`}
            >
              {t.label}
              {tab === t.key && (
                <motion.span layoutId="tab-underline" className="absolute left-0 -bottom-[1px] w-full h-[2px] bg-zyra-gold" />
              )}
            </button>
          ))}
        </div>

        <div className="py-8 max-w-3xl">
          {tab === "description" ? (
            <div>
              <p className="text-zyra-gray leading-relaxed">{product.description}</p>
              <div className="grid sm:grid-cols-2 gap-4 mt-6 text-sm">
                <div className="flex justify-between border-b border-black/5 py-2">
                  <span className="text-zyra-gray">Material</span>
                  <span className="font-medium">{product.material}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 py-2">
                  <span className="text-zyra-gray">Category</span>
                  <span className="font-medium">{product.sub}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 py-2">
                  <span className="text-zyra-gray">Care</span>
                  <span className="font-medium">Machine wash cold</span>
                </div>
                <div className="flex justify-between border-b border-black/5 py-2">
                  <span className="text-zyra-gray">Fit</span>
                  <span className="font-medium">Regular Fit</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-bold text-zyra-black">{product.rating}</span>
                <div>
                  <RatingStars rating={product.rating} />
                  <p className="text-xs text-zyra-gray mt-1">Based on {product.reviewsCount} reviews</p>
                </div>
              </div>
              {mockReviews.map((r, i) => (
                <div key={i} className="border-b border-black/5 pb-5">
                  <div className="flex items-center justify-between">
                    <p className="font-semibold text-sm">{r.name}</p>
                    <span className="text-xs text-zyra-gray">{r.date}</span>
                  </div>
                  <RatingStars rating={r.rating} size={12} />
                  <p className="text-sm text-zyra-gray mt-2">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-2xl font-display font-semibold mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* Size chart modal */}
      <AnimatePresence>
        {sizeChartOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-[90]" onClick={() => setSizeChartOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl p-6 w-[90%] max-w-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-lg">Size Chart</h3>
                <button onClick={() => setSizeChartOpen(false)}><FiX size={20} /></button>
              </div>
              <table className="w-full text-sm text-left">
                <thead>
                  <tr className="border-b border-black/10 text-zyra-gray">
                    <th className="py-2">Size</th>
                    <th className="py-2">Chest (in)</th>
                    <th className="py-2">Length (in)</th>
                    <th className="py-2">Waist (in)</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ["S", "36", "27", "30"],
                    ["M", "38", "28", "32"],
                    ["L", "40", "29", "34"],
                    ["XL", "42", "30", "36"],
                    ["XXL", "44", "31", "38"],
                  ].map((row) => (
                    <tr key={row[0]} className="border-b border-black/5">
                      {row.map((cell, i) => (
                        <td key={i} className="py-2.5">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="text-xs text-zyra-gray mt-4">All measurements in inches. Model is wearing size M.</p>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
