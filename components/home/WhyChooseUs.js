"use client";
import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";
import { FiTruck, FiRepeat, FiTag, FiSmile } from "react-icons/fi";

const reasons = [
  { icon: FiTag, title: "Honest Pricing", text: "No fake markdowns — every discount is real and transparent." },
  { icon: FiTruck, title: "Fast, Tracked Delivery", text: "Real-time order tracking from warehouse to your doorstep." },
  { icon: FiRepeat, title: "Hassle-Free Returns", text: "Changed your mind? Return within 7 days, no questions asked." },
  { icon: FiSmile, title: "Loved by 2,50,000+", text: "Thousands of 5-star reviews from customers just like you." },
];

export default function WhyChooseUs() {
  return (
    <section className="container-x py-20">
      <SectionHeading tag="Why ZYRA" title="Fashion, Done Right" subtitle="We obsess over the details so you don't have to." />
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {reasons.map((r, i) => (
          <motion.div
            key={r.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="rounded-2xl border border-black/5 p-7 card-shadow bg-white"
          >
            <div className="w-12 h-12 rounded-full bg-zyra-black text-zyra-gold flex items-center justify-center mb-5">
              <r.icon size={20} />
            </div>
            <h3 className="font-semibold text-zyra-black mb-2">{r.title}</h3>
            <p className="text-sm text-zyra-gray leading-relaxed">{r.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
