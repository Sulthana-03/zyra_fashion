"use client";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { homeCategoryTiles } from "@/data/categories";

export default function CategoryTiles() {
  return (
    <section className="container-x py-20">
      <SectionHeading tag="Curated For You" title="Shop by Category" subtitle="Jump straight to the pieces you're hunting for." />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        {homeCategoryTiles.map((c, i) => (
          <motion.div
            key={c.label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: (i % 4) * 0.1 }}
          >
            <Link href={c.href} className="block rounded-2xl overflow-hidden zoom-img relative aspect-[3/4] group">
              <SafeImage src={c.img} alt={c.label} fill />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent" />
              <span className="absolute bottom-4 left-4 text-white font-semibold text-sm md:text-base">
                {c.label}
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
