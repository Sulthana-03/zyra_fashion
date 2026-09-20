"use client";
import SafeImage from "@/components/SafeImage";
import { motion } from "framer-motion";
import { FaInstagram } from "react-icons/fa";
import { instaFeed } from "@/data/testimonials";

export default function InstaFeedSection() {
  return (
    <section className="py-20 container-x text-center">
      <p className="section-tag mb-3">@zyra.fashion</p>
      <h2 className="text-3xl md:text-4xl font-display font-semibold text-zyra-black flex items-center justify-center gap-3">
        <FaInstagram className="text-zyra-gold" /> Follow Our Style Feed
      </h2>
      <p className="text-zyra-gray mt-3 max-w-xl mx-auto">
        Tag us <span className="text-zyra-black font-medium">#WearZYRA</span> to be featured.
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mt-10">
        {instaFeed.map((src, i) => (
          <motion.a
            href="/new-arrivals"
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ scale: 1.05 }}
            className="relative aspect-square rounded-xl overflow-hidden group"
          >
            <SafeImage src={src} alt="Instagram post" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors flex items-center justify-center">
              <FaInstagram className="text-white opacity-0 group-hover:opacity-100 transition-opacity" size={22} />
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
