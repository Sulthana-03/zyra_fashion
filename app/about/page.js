"use client";
import SafeImage from "@/components/SafeImage";

import { motion } from "framer-motion";
import { FiTarget, FiHeart, FiGlobe } from "react-icons/fi";

const values = [
  { icon: FiTarget, title: "Purposeful Design", text: "Every piece is designed to be worn, loved and lived in — not just photographed." },
  { icon: FiHeart, title: "Customer First", text: "From sizing to support, we build every part of ZYRA around your experience." },
  { icon: FiGlobe, title: "Responsible Sourcing", text: "We partner with ethical manufacturers who share our standards for quality and fairness." },
];

const team = [
  { name: "Riya Kapoor", role: "Founder & Creative Director", img: "https://images.unsplash.com/photo-1627117204847-ec306fe712bb?auto=format&fit=crop&w=400&q=80" },
  { name: "Arjun Mehta", role: "Head of Design", img: "https://images.unsplash.com/photo-1595211877493-41a4e5f236b3?auto=format&fit=crop&w=400&q=80" },
  { name: "Sana Sheikh", role: "Head of Merchandising", img: "https://images.unsplash.com/photo-1592275772614-ec71b19e326f?auto=format&fit=crop&w=400&q=80" },
];

export default function AboutPage() {
  return (
    <div>
      <div className="relative h-[50vh] min-h-[380px] overflow-hidden">
        <SafeImage
          src="https://images.unsplash.com/photo-1624835567150-0c530a20d8cc?auto=format&fit=crop&w=1600&q=80"
          alt="About ZYRA"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-white text-center px-6">
          <p className="section-tag mb-3">Our Story</p>
          <h1 className="font-display text-4xl md:text-5xl font-bold max-w-2xl">
            Fashion That Fits Your Story
          </h1>
        </div>
      </div>

      <div className="container-x py-20 grid md:grid-cols-2 gap-14 items-center">
        <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <p className="section-tag mb-3">Since 2019</p>
          <h2 className="text-3xl font-display font-semibold mb-5">Built for the Everyday, Designed for the Moment</h2>
          <p className="text-zyra-gray leading-relaxed mb-4">
            ZYRA started with a simple idea: fashion shouldn't force a choice between quality, style and
            affordability. What began as a small studio experimenting with fabric and fit has grown into a
            destination loved by hundreds of thousands of customers across India.
          </p>
          <p className="text-zyra-gray leading-relaxed">
            Today, ZYRA brings together menswear, womenswear, accessories and footwear under one roof — curated
            by a team obsessed with getting the details right, from stitch to size chart.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden aspect-[4/3]"
        >
          <SafeImage
            src="https://images.unsplash.com/photo-1534875756527-5e8e4392005f?auto=format&fit=crop&w=900&q=80"
            alt="ZYRA studio"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="bg-zyra-cream py-20">
        <div className="container-x">
          <div className="max-w-xl mx-auto text-center mb-12">
            <p className="section-tag mb-3">What We Stand For</p>
            <h2 className="text-3xl font-display font-semibold">Our Values</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white rounded-2xl p-7 card-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-zyra-black text-zyra-gold flex items-center justify-center mb-5">
                  <v.icon size={20} />
                </div>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-zyra-gray leading-relaxed">{v.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="container-x py-20">
        <div className="max-w-xl mx-auto text-center mb-12">
          <p className="section-tag mb-3">Meet the Team</p>
          <h2 className="text-3xl font-display font-semibold">The People Behind ZYRA</h2>
        </div>
        <div className="grid sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {team.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <div className="w-28 h-28 rounded-full overflow-hidden mx-auto mb-4">
                <SafeImage src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <p className="font-semibold text-sm">{m.name}</p>
              <p className="text-xs text-zyra-gray">{m.role}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
