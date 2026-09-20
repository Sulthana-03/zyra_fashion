"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import ProductCard from "@/components/ProductCard";

const PAGE_SIZE = 4;

/**
 * This used to be a horizontally-scrolling strip (overflow-x: auto). That
 * kept fighting the page's own up/down scrolling no matter how it was
 * tuned — the browser treats a scrollable strip and the page itself as two
 * separate scroll regions that can "steal" the mouse wheel / touch gesture
 * from each other, causing the sticking/stuck/suddenly-too-fast symptoms
 * that kept coming back. The permanent fix is to not make it scrollable at
 * all: this is now a paged slider. Clicking the arrows slides between fixed
 * groups of cards with a left/right slide animation (a different animation,
 * as asked for) — there is no draggable/scrollable region here anymore, so
 * there is nothing left that can ever intercept normal page scrolling.
 */
export default function ProductCarousel({ tag, title, subtitle, products, viewAllHref, dark = false }) {
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1);

  const pages = [];
  for (let i = 0; i < products.length; i += PAGE_SIZE) {
    pages.push(products.slice(i, i + PAGE_SIZE));
  }
  const maxPage = Math.max(0, pages.length - 1);

  const goTo = (next) => {
    setDirection(next > page ? 1 : -1);
    setPage(Math.max(0, Math.min(maxPage, next)));
  };

  const current = pages[page] || [];

  return (
    <section className={`py-20 ${dark ? "bg-zyra-black" : ""}`}>
      <div className="container-x">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-4">
          <SectionHeading tag={tag} title={title} subtitle={subtitle} align="left" />
          <div className="flex items-center gap-3 mb-10">
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className={`text-sm font-semibold ${dark ? "text-zyra-gold" : "text-zyra-black"} underline underline-offset-4`}
              >
                View All
              </Link>
            )}
            <button
              onClick={() => goTo(page - 1)}
              disabled={page === 0}
              aria-label="Previous"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                dark ? "border-white/30 text-white hover:bg-white hover:text-black" : "border-black/20 hover:bg-zyra-black hover:text-white"
              }`}
            >
              <FiChevronLeft />
            </button>
            <button
              onClick={() => goTo(page + 1)}
              disabled={page === maxPage}
              aria-label="Next"
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed ${
                dark ? "border-white/30 text-white hover:bg-white hover:text-black" : "border-black/20 hover:bg-zyra-black hover:text-white"
              }`}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              initial={{ x: direction > 0 ? 60 : -60, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction > 0 ? -60 : 60, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {current.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {pages.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {pages.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Go to page ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === page ? "w-6 bg-zyra-gold" : `w-2.5 ${dark ? "bg-white/25" : "bg-black/15"}`
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
