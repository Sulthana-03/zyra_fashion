"use client";
import SafeImage from "@/components/SafeImage";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const slides = [
  {
    tag: "New Season",
    title: "Wear Your\nConfidence",
    subtitle: "The Autumn–Winter edit is here — tailored fits, rich textures, timeless silhouettes.",
    cta: "Shop Women",
    href: "/women",
    img: "https://images.unsplash.com/photo-1605124305733-fe7ecf960b0e?auto=format&fit=crop&w=1600&q=80",
    align: "left",
  },
  {
    tag: "Menswear Edit",
    title: "Sharp Looks,\nEvery Day",
    subtitle: "From boardroom shirts to weekend denim — build a wardrobe that works as hard as you do.",
    cta: "Shop Men",
    href: "/men",
    img: "https://images.unsplash.com/photo-1622192727968-14625c8688d3?auto=format&fit=crop&w=1600&q=80",
    align: "left",
  },
  {
    tag: "Up To 40% Off",
    title: "The Grand\nFashion Sale",
    subtitle: "Your favourite styles across men, women & accessories — now at prices you'll love.",
    cta: "Shop the Sale",
    href: "/sale",
    img: "https://images.unsplash.com/photo-1758274251589-fb70a3654a1b?auto=format&fit=crop&w=1600&q=80",
    align: "left",
  },
];

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive((a) => (a + 1) % slides.length), 5500);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative h-[92vh] min-h-[560px] w-full overflow-hidden bg-zyra-black">
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <SafeImage
            src={slides[active].img}
            alt={slides[active].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      <div className="relative z-10 h-full container-x flex items-center">
        <div className="max-w-xl text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <p className="section-tag mb-4 text-zyra-gold">{slides[active].tag}</p>
              <h1 className="font-display font-bold text-4xl sm:text-5xl md:text-6xl leading-tight whitespace-pre-line">
                {slides[active].title}
              </h1>
              <p className="mt-5 text-white/80 max-w-md">{slides[active].subtitle}</p>
              <Link href={slides[active].href} className="btn-primary mt-8">
                {slides[active].cta} <FiArrowRight />
              </Link>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-1.5 rounded-full transition-all ${
              active === i ? "w-8 bg-zyra-gold" : "w-4 bg-white/40"
            }`}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="hidden md:flex absolute right-10 bottom-10 z-10 flex-col items-center gap-2 text-white/70 text-xs"
      >
        <span className="rotate-90 tracking-widest uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
          className="w-[2px] h-8 bg-white/40"
        />
      </motion.div>
    </section>
  );
}
