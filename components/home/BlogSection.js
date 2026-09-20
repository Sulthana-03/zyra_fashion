"use client";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { blogPosts } from "@/data/testimonials";
import { FiArrowUpRight } from "react-icons/fi";

export default function BlogSection() {
  return (
    <section className="container-x py-20">
      <SectionHeading tag="ZYRA Journal" title="Style Notes & Lookbooks" subtitle="Styling tips, care guides and everything fashion." />
      <div className="grid md:grid-cols-3 gap-6">
        {blogPosts.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <Link href={b.href || "/"} className="group block rounded-2xl overflow-hidden bg-white card-shadow">
              <div className="relative aspect-[4/3] zoom-img overflow-hidden">
                <SafeImage src={b.img} alt={b.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-white/90 text-[11px] font-semibold px-3 py-1 rounded-full">
                  {b.tag}
                </span>
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-zyra-black flex items-start justify-between gap-2">
                  {b.title}
                  <FiArrowUpRight className="flex-shrink-0 mt-1 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </h3>
                <p className="text-sm text-zyra-gray mt-2 line-clamp-2">{b.excerpt}</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
