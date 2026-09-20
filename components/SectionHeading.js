"use client";
import { motion } from "framer-motion";

export default function SectionHeading({ tag, title, subtitle, align = "center" }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : ""} mb-10`}
    >
      {tag && <p className="section-tag mb-3">{tag}</p>}
      <h2 className="text-3xl md:text-4xl font-display font-semibold text-zyra-black">{title}</h2>
      {subtitle && <p className="text-zyra-gray mt-3">{subtitle}</p>}
    </motion.div>
  );
}
