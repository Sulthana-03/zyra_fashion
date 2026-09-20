"use client";
import { motion } from "framer-motion";
import { FiTruck, FiRefreshCw, FiShield, FiHeadphones } from "react-icons/fi";

const items = [
  { icon: FiTruck, title: "Free Delivery", text: "On all orders above ₹999" },
  { icon: FiRefreshCw, title: "7-Day Returns", text: "No questions asked" },
  { icon: FiShield, title: "Secure Payments", text: "100% protected checkout" },
  { icon: FiHeadphones, title: "24/7 Support", text: "We're always here to help" },
];

export default function TrustBadges() {
  return (
    <section className="container-x -mt-10 relative z-20">
      <div className="bg-white rounded-2xl card-shadow grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 divide-black/5">
        {items.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="flex items-center gap-3 p-5 md:p-7"
          >
            <div className="w-11 h-11 rounded-full bg-zyra-cream flex items-center justify-center text-zyra-gold flex-shrink-0">
              <it.icon size={20} />
            </div>
            <div>
              <p className="font-semibold text-sm text-zyra-black">{it.title}</p>
              <p className="text-xs text-zyra-gray">{it.text}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
