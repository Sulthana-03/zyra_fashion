"use client";
import { motion } from "framer-motion";
import { FiSearch, FiTruck, FiShield } from "react-icons/fi";

const steps = [
  { icon: FiSearch, num: "1", title: "Shop in Seconds", text: "Browse thousands of styles and check out in just a few taps.", bg: "bg-zyra-gold" },
  { icon: FiTruck, num: "2", title: "Doorstep Delivery", text: "Fast, trackable shipping — right to your door, anywhere in India.", bg: "bg-zyra-rose" },
  { icon: FiShield, num: "3", title: "Easy & Safe Payments", text: "Pay by card, UPI or Cash on Delivery — always secure.", bg: "bg-zyra-black" },
];

export default function HowItWorks() {
  return (
    <section className="container-x py-16">
      <div className="grid sm:grid-cols-3 gap-6">
        {steps.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            className="relative rounded-2xl bg-zyra-cream p-7 overflow-hidden"
          >
            <span className="absolute top-4 right-5 font-display text-5xl font-bold text-black/5">{s.num}</span>
            <div className={`w-14 h-14 rounded-full ${s.bg} flex items-center justify-center mb-5 text-white ${s.bg === "bg-zyra-gold" ? "!text-zyra-black" : ""}`}>
              <s.icon size={24} />
            </div>
            <h3 className="font-semibold text-lg text-zyra-black mb-2">{s.title}</h3>
            <p className="text-sm text-zyra-gray leading-relaxed">{s.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
