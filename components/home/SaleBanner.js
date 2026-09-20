"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

function getTimeLeft() {
  const target = new Date();
  target.setHours(23, 59, 59, 0);
  const diff = Math.max(0, target.getTime() - Date.now());
  const h = Math.floor(diff / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  return { h, m, s };
}

export default function SaleBanner() {
  const [time, setTime] = useState({ h: 0, m: 0, s: 0 });

  useEffect(() => {
    setTime(getTimeLeft());
    const t = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(t);
  }, []);

  const blocks = [
    { label: "Hours", value: time.h },
    { label: "Minutes", value: time.m },
    { label: "Seconds", value: time.s },
  ];

  return (
    <section className="container-x py-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-zyra-black via-[#241d12] to-zyra-black px-8 md:px-14 py-14 flex flex-col md:flex-row items-center justify-between gap-8"
      >
        <div className="text-white text-center md:text-left">
          <p className="section-tag mb-3">Ends Tonight</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold">
            Up to <span className="text-zyra-gold">40% Off</span> Everything
          </h2>
          <p className="text-white/70 mt-3 max-w-md">
            Our biggest style sale of the season — men's, women's & accessories, all reduced.
          </p>
        </div>

        <div className="flex items-center gap-4">
          {blocks.map((b) => (
            <div key={b.label} className="text-center bg-white/10 rounded-xl px-4 py-3 min-w-[70px]">
              <p className="text-2xl font-bold text-white tabular-nums">{String(b.value).padStart(2, "0")}</p>
              <p className="text-[10px] uppercase tracking-wider text-white/60">{b.label}</p>
            </div>
          ))}
        </div>

        <Link href="/sale" className="btn-primary bg-zyra-gold text-zyra-black hover:bg-white flex-shrink-0">
          Shop the Sale <FiArrowRight />
        </Link>
      </motion.div>
    </section>
  );
}
