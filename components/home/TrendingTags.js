"use client";
import Link from "next/link";
import { motion } from "framer-motion";

// Every tag here must correspond to real products in data/products.js —
// otherwise the search page (which matches on product name/category/sub)
// comes back with "No products match" for that tag. Verified against the
// catalog: each of these returns real results.
const tags = [
  "Oversized Tees", "Ethnic Kurtis", "Chino Trousers", "Formal Shirts", "Silk Sarees",
  "Sneakers", "Denim Jackets", "Leather Watches", "Statement Bags", "Sunglasses",
];

export default function TrendingTags() {
  return (
    <section className="container-x py-14">
      <p className="section-tag text-center mb-5">Trending Now</p>
      <div className="flex flex-wrap justify-center gap-3">
        {tags.map((tag, i) => (
          <motion.div
            key={tag}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
          >
            <Link
              href={`/search?q=${encodeURIComponent(tag)}`}
              className="inline-block px-5 py-2.5 rounded-full border border-black/10 text-sm text-zyra-black hover:bg-zyra-black hover:text-white hover:border-zyra-black transition-colors"
            >
              {tag}
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
