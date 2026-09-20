"use client";
import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { label: "Happy Customers", value: 250000, suffix: "+" },
  { label: "Products Listed", value: 1200, suffix: "+" },
  { label: "Cities Delivered", value: 500, suffix: "+" },
  { label: "Avg. Rating", value: 4.8, suffix: "/5", decimals: true },
];

function Counter({ value, suffix, decimals }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / duration);
      setDisplay(value * progress);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {decimals ? display.toFixed(1) : Math.floor(display).toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export default function StatsCounter() {
  return (
    <section className="bg-zyra-cream py-16">
      <div className="container-x grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <p className="font-display text-3xl md:text-4xl font-bold text-zyra-black">
              <Counter value={s.value} suffix={s.suffix} decimals={s.decimals} />
            </p>
            <p className="text-xs md:text-sm text-zyra-gray mt-2 uppercase tracking-wide">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
