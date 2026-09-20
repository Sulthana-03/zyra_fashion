"use client";
import SafeImage from "@/components/SafeImage";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

export default function GenderSplit({
  reverse = false,
  tag,
  title,
  subtitle,
  cta,
  href,
  img,
}) {
  return (
    <section className="container-x py-16">
      <div className={`grid md:grid-cols-2 gap-8 items-center ${reverse ? "md:[&>*:first-child]:order-2" : ""}`}>
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden zoom-img aspect-[4/3] md:aspect-[5/4]"
        >
          <SafeImage src={img} alt={title} className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-tag mb-4">{tag}</p>
          <h2 className="text-3xl md:text-5xl font-display font-semibold text-zyra-black leading-tight">
            {title}
          </h2>
          <p className="text-zyra-gray mt-4 max-w-md">{subtitle}</p>
          <Link href={href} className="btn-primary mt-7">
            {cta} <FiArrowRight />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
