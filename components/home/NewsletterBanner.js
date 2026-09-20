"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail } from "react-icons/fi";
import { generateWelcomeCode } from "@/data/testimonials";

export default function NewsletterBanner() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const [code, setCode] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setCode(generateWelcomeCode());
      setDone(true);
    }
  };

  return (
    <section className="container-x py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl bg-zyra-cream text-center py-16 px-6"
      >
        <div className="w-14 h-14 rounded-full bg-zyra-black text-zyra-gold flex items-center justify-center mx-auto mb-5">
          <FiMail size={22} />
        </div>
        <h2 className="text-3xl md:text-4xl font-display font-semibold text-zyra-black">
          Get ₹200 Off Your First Order
        </h2>
        <p className="text-zyra-gray mt-3 max-w-md mx-auto">
          Sign up for the ZYRA newsletter and unlock a welcome discount, straight to your inbox.
        </p>
        {done ? (
          <div className="mt-7">
            <p className="text-zyra-gold font-semibold">🎉 Here's your code — use it at checkout:</p>
            <p className="mt-3 inline-block bg-white border-2 border-dashed border-zyra-gold rounded-xl px-6 py-3 font-display text-xl font-bold tracking-widest text-zyra-black">
              {code}
            </p>
            <p className="text-xs text-zyra-gray mt-2">Flat ₹50 off on your first order above ₹500.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="mt-7 flex max-w-md mx-auto gap-2">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 min-w-0 rounded-full px-5 py-3 text-sm outline-none border border-black/10 bg-white"
            />
            <button type="submit" className="btn-primary flex-shrink-0">
              Get Code
            </button>
          </form>
        )}
      </motion.div>
    </section>
  );
}
