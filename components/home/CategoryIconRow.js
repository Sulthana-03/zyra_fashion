"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import SafeImage from "@/components/SafeImage";
import { categoryIconRow } from "@/data/categories";

export default function CategoryIconRow() {
  return (
    <section className="container-x py-10 border-b border-black/5">
      {/* flex-wrap, not overflow-x-auto — only 6 items, so there is no need
          for a scrollable strip that could fight the page's own scrolling.
          It wraps to a second row on narrow screens instead. */}
      <div
        className="flex flex-wrap items-start justify-center gap-6 md:gap-8 px-1"
      >
        {categoryIconRow.map((it, i) => (
          <motion.div
            key={it.label}
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
          >
            <Link href={it.href} className="flex flex-col items-center gap-3 flex-shrink-0 group">
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-2 ring-transparent group-hover:ring-zyra-gold transition-all flex-shrink-0">
                <SafeImage src={it.img} alt={it.label} className="w-full h-full object-cover" />
              </div>
              <span className="text-xs md:text-sm font-medium text-zyra-black whitespace-nowrap leading-none">{it.label}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
