"use client";
import SafeImage from "@/components/SafeImage";

import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiFilter, FiX, FiChevronDown } from "react-icons/fi";
import ProductCard from "@/components/ProductCard";

const SORTS = [
  { key: "popularity", label: "Popularity" },
  { key: "priceLow", label: "Price: Low to High" },
  { key: "priceHigh", label: "Price: High to Low" },
  { key: "rating", label: "Customer Rating" },
];

const PRICE_BANDS = [
  { label: "Under ₹1,000", min: 0, max: 1000 },
  { label: "₹1,000 – ₹2,000", min: 1000, max: 2000 },
  { label: "₹2,000 – ₹3,500", min: 2000, max: 3500 },
  { label: "Above ₹3,500", min: 3500, max: Infinity },
];

export default function ProductListing({ title, subtitle, banner, allProducts, subCategories = [], initialSub }) {
  const [activeSub, setActiveSub] = useState(initialSub || "All");
  const [activePrice, setActivePrice] = useState(null);
  const [activeSizes, setActiveSizes] = useState([]);
  const [activeColors, setActiveColors] = useState([]);
  const [sort, setSort] = useState("popularity");
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Keep the active filter in sync with the URL's ?sub= param. Next.js keeps
  // this same client component mounted when navigating between two links on
  // the same category route (e.g. Men?sub=Shirts -> Men?sub=Jackets from the
  // mega menu), so without this effect the very first useState value would
  // stick forever and later clicks on a different sub-category would look
  // like they "did nothing".
  useEffect(() => {
    setActiveSub(initialSub || "All");
    setActivePrice(null);
    setActiveSizes([]);
    setActiveColors([]);
  }, [initialSub]);

  const allSizes = useMemo(
    () => Array.from(new Set(allProducts.flatMap((p) => p.sizes || []))).slice(0, 10),
    [allProducts]
  );
  const allColors = useMemo(
    () => Array.from(new Set(allProducts.flatMap((p) => p.colors || []))).slice(0, 10),
    [allProducts]
  );

  const toggle = (arr, setArr, value) =>
    setArr(arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);

  const filtered = useMemo(() => {
    let list = [...allProducts];
    if (activeSub !== "All") list = list.filter((p) => p.sub === activeSub);
    if (activePrice) list = list.filter((p) => p.price >= activePrice.min && p.price < activePrice.max);
    if (activeSizes.length) list = list.filter((p) => p.sizes?.some((s) => activeSizes.includes(s)));
    if (activeColors.length) list = list.filter((p) => p.colors?.some((c) => activeColors.includes(c)));

    switch (sort) {
      case "priceLow":
        list.sort((a, b) => a.price - b.price);
        break;
      case "priceHigh":
        list.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        list.sort((a, b) => b.rating - a.rating);
        break;
      default:
        list.sort((a, b) => b.reviewsCount - a.reviewsCount);
    }
    return list;
  }, [allProducts, activeSub, activePrice, activeSizes, activeColors, sort]);

  const clearAll = () => {
    setActiveSub("All");
    setActivePrice(null);
    setActiveSizes([]);
    setActiveColors([]);
  };

  const FilterBlock = (
    <div className="space-y-8">
      <div>
        <p className="font-semibold text-sm mb-3 uppercase tracking-wide">Category</p>
        <div className="space-y-2">
          {["All", ...subCategories].map((s) => (
            <button
              key={s}
              onClick={() => setActiveSub(s)}
              className={`block text-sm text-left w-full transition-colors ${
                activeSub === s ? "text-zyra-gold font-semibold" : "text-zyra-gray hover:text-zyra-black"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="font-semibold text-sm mb-3 uppercase tracking-wide">Price</p>
        <div className="space-y-2">
          {PRICE_BANDS.map((band) => (
            <label key={band.label} className="flex items-center gap-2 text-sm cursor-pointer">
              <input
                type="radio"
                checked={activePrice?.label === band.label}
                onChange={() => setActivePrice(activePrice?.label === band.label ? null : band)}
                className="accent-zyra-gold"
              />
              <span className={activePrice?.label === band.label ? "text-zyra-black font-medium" : "text-zyra-gray"}>
                {band.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {allSizes.length > 0 && (
        <div>
          <p className="font-semibold text-sm mb-3 uppercase tracking-wide">Size</p>
          <div className="flex flex-wrap gap-2">
            {allSizes.map((s) => (
              <button
                key={s}
                onClick={() => toggle(activeSizes, setActiveSizes, s)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  activeSizes.includes(s)
                    ? "bg-zyra-black text-white border-zyra-black"
                    : "border-black/15 text-zyra-gray hover:border-zyra-black"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      )}

      {allColors.length > 0 && (
        <div>
          <p className="font-semibold text-sm mb-3 uppercase tracking-wide">Color</p>
          <div className="flex flex-wrap gap-2">
            {allColors.map((c) => (
              <button
                key={c}
                onClick={() => toggle(activeColors, setActiveColors, c)}
                className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                  activeColors.includes(c)
                    ? "bg-zyra-black text-white border-zyra-black"
                    : "border-black/15 text-zyra-gray hover:border-zyra-black"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      )}

      <button onClick={clearAll} className="text-xs font-semibold text-zyra-rose underline">
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div>
      {banner && (
        <div className="relative h-56 md:h-72 w-full overflow-hidden">
          <SafeImage src={banner} alt={title} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center flex-col text-white text-center px-4">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="font-display text-3xl md:text-5xl font-bold"
            >
              {title}
            </motion.h1>
            {subtitle && <p className="mt-2 text-white/80 max-w-lg">{subtitle}</p>}
          </div>
        </div>
      )}

      <div className="container-x py-10">
        {/* flex-wrap here: on a narrow phone, the count text plus the Filters
            button plus the Sort dropdown together are wider than the screen.
            Without wrap, nothing shrinks properly and the Sort pill gets
            pushed off the right edge (invisible once the page is locked from
            scrolling sideways). Wrapping lets the button/dropdown drop to
            their own line instead of forcing an overflow. */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <p className="text-sm text-zyra-gray whitespace-nowrap">{filtered.length} products found</p>
          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 text-sm border border-black/15 rounded-full px-4 py-2"
            >
              <FiFilter size={14} /> Filters
            </button>
            <div className="relative">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="appearance-none text-sm border border-black/15 rounded-full pl-4 pr-9 py-2 outline-none cursor-pointer bg-white"
              >
                {SORTS.map((s) => (
                  <option key={s.key} value={s.key}>
                    Sort: {s.label}
                  </option>
                ))}
              </select>
              <FiChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" size={14} />
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-10">
          <aside className="hidden lg:block">{FilterBlock}</aside>

          {filtered.length === 0 ? (
            <div className="text-center py-24">
              <p className="text-lg font-semibold text-zyra-black">No products match these filters</p>
              <button onClick={clearAll} className="btn-outline mt-5">
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
              {filtered.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 z-[70]"
              onClick={() => setMobileFilterOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-[85%] max-w-xs bg-white z-[80] p-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <p className="font-semibold">Filters</p>
                <button onClick={() => setMobileFilterOpen(false)}>
                  <FiX size={20} />
                </button>
              </div>
              {FilterBlock}
              <button onClick={() => setMobileFilterOpen(false)} className="btn-primary w-full mt-8">
                Apply
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
