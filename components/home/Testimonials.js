"use client";
import SafeImage from "@/components/SafeImage";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import RatingStars from "@/components/RatingStars";
import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  return (
    <section className="bg-zyra-cream py-20">
      <div className="container-x">
        <SectionHeading tag="Real Stories" title="What Our Customers Say" subtitle="Loved by thousands across India — here's why." />
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -6 }}
              className="bg-white rounded-2xl p-7 card-shadow"
            >
              <RatingStars rating={t.rating} />
              <p className="text-zyra-black/80 text-sm mt-4 leading-relaxed">&ldquo;{t.text}&rdquo;</p>
              <div className="flex items-center gap-3 mt-6">
                <SafeImage src={t.avatar} alt={t.name} className="w-11 h-11 rounded-full object-cover" />
                <div>
                  <p className="font-semibold text-sm text-zyra-black">{t.name}</p>
                  <p className="text-xs text-zyra-gray">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
