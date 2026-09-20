"use client";
import SafeImage from "@/components/SafeImage";

import { useState } from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiMapPin, FiSend } from "react-icons/fi";

const faqs = [
  { q: "How long does delivery take?", a: "Standard delivery takes 3–6 business days depending on your location." },
  { q: "What is your return policy?", a: "We offer easy 7-day returns on all unused items with original tags." },
  { q: "Do you offer Cash on Delivery?", a: "Yes! COD is available for orders across India." },
  { q: "How do I track my order?", a: "Visit 'My Orders' from your account to see real-time tracking status." },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div>
      <div className="relative h-56 overflow-hidden">
        <SafeImage
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1600&q=80"
          alt="Contact ZYRA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <h1 className="text-white font-display text-3xl md:text-4xl font-bold">Contact Us</h1>
        </div>
      </div>

      <div className="container-x py-16 grid md:grid-cols-2 gap-14">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <h2 className="text-2xl font-display font-semibold mb-3">We'd love to hear from you</h2>
          <p className="text-zyra-gray mb-8">
            Whether it's a question about your order, sizing help, or feedback — our team is here for you.
          </p>

          <div className="space-y-5 mb-10">
            {[
              { icon: FiMail, title: "Email", text: "support@zyra-fashion.in" },
              { icon: FiPhone, title: "Phone", text: "+91 98765 43210" },
              { icon: FiMapPin, title: "Studio", text: "ZYRA House, Bandra West, Mumbai, India" },
            ].map((c) => (
              <div key={c.title} className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-zyra-cream flex items-center justify-center text-zyra-gold flex-shrink-0">
                  <c.icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-sm">{c.title}</p>
                  <p className="text-sm text-zyra-gray">{c.text}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold mb-4">Frequently Asked Questions</h3>
          <div className="space-y-2">
            {faqs.map((f, i) => (
              <div key={f.q} className="border border-black/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full text-left px-4 py-3 text-sm font-medium flex justify-between items-center"
                >
                  {f.q}
                  <span>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && <p className="px-4 pb-3 text-sm text-zyra-gray">{f.a}</p>}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <div className="border border-black/10 rounded-2xl p-7 card-shadow">
            {sent ? (
              <p className="text-green-600 font-medium text-center py-10">
                🎉 Thanks for reaching out! Our team will get back to you within 24 hours.
              </p>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your Name"
                  className="w-full border border-black/15 rounded-lg px-4 py-3 text-sm outline-none"
                />
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="Your Email"
                  className="w-full border border-black/15 rounded-lg px-4 py-3 text-sm outline-none"
                />
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Your Message"
                  className="w-full border border-black/15 rounded-lg px-4 py-3 text-sm outline-none resize-none"
                />
                <button type="submit" className="btn-primary w-full justify-center">
                  Send Message <FiSend />
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
