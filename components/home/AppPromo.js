"use client";
import SafeImage from "@/components/SafeImage";
import { motion } from "framer-motion";
import { FaApple, FaGooglePlay } from "react-icons/fa";

export default function AppPromo() {
  return (
    <section className="container-x py-10">
      <div className="rounded-3xl bg-gradient-to-br from-zyra-rose/90 to-zyra-gold/80 overflow-hidden relative">
        <div className="grid md:grid-cols-2 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-10 md:p-16 text-white"
          >
            <p className="section-tag mb-3 !text-white/80">Shop Smarter</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold leading-tight">
              Get the ZYRA App for Exclusive Drops
            </h2>
            <p className="mt-4 text-white/90 max-w-md">
              Faster checkout, early access to sales, and app-only styling picks — right in your pocket.
            </p>
            <div className="flex gap-3 mt-7">
              <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl text-sm font-medium hover:opacity-85">
                <FaApple size={20} /> App Store
              </button>
              <button className="flex items-center gap-2 bg-black text-white px-5 py-3 rounded-xl text-sm font-medium hover:opacity-85">
                <FaGooglePlay size={18} /> Google Play
              </button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="hidden md:block relative h-full min-h-[440px]"
          >
            <div className="absolute bottom-0 right-10 w-64 aspect-[9/18] rounded-[2rem] shadow-2xl border-4 border-white/30 overflow-hidden">
              <SafeImage
                src="https://images.unsplash.com/photo-1587573578335-9672da4d0292?auto=format&fit=crop&w=500&q=80"
                alt="ZYRA App on mobile"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
