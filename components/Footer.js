"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FaInstagram,
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaPinterestP,
} from "react-icons/fa";
import { FiTruck, FiRefreshCw, FiShield, FiCreditCard } from "react-icons/fi";

const footerCols = [
  {
    title: "Shop",
    links: [
      { label: "Men", href: "/men" },
      { label: "Women", href: "/women" },
      { label: "Accessories", href: "/accessories" },
      { label: "Footwear", href: "/footwear" },
      { label: "New Arrivals", href: "/new-arrivals" },
      { label: "Sale", href: "/sale" },
    ],
  },
  {
    title: "Help",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "Track Order", href: "/track-order" },
      { label: "Returns & Exchanges", href: "/returns" },
      { label: "Shipping Info", href: "/shipping-info" },
      { label: "FAQs", href: "/faqs" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Sustainability", href: "/sustainability" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "My Account", href: "/account" },
      { label: "My Orders", href: "/orders" },
      { label: "Wishlist", href: "/wishlist" },
      { label: "Login / Register", href: "/login" },
    ],
  },
];

const trust = [
  { icon: FiTruck, title: "Free Shipping", text: "On orders above ₹999" },
  { icon: FiRefreshCw, title: "Easy Returns", text: "7-day return window" },
  { icon: FiShield, title: "Secure Payments", text: "100% protected checkout" },
  { icon: FiCreditCard, title: "Cash on Delivery", text: "Pay when it arrives" },
];

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const onSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) setSubscribed(true);
  };

  return (
    <footer className="bg-zyra-black text-white mt-20">
      <div className="container-x grid grid-cols-2 sm:grid-cols-4 gap-6 py-10 border-b border-white/10">
        {trust.map((t) => (
          <div key={t.title} className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
              <t.icon size={19} />
            </div>
            <div>
              <p className="text-sm font-semibold">{t.title}</p>
              <p className="text-xs text-white/60">{t.text}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="container-x py-14 grid grid-cols-1 md:grid-cols-6 gap-10">
        <div className="md:col-span-2">
          <span className="font-display text-3xl font-extrabold">ZYRA</span>
          <p className="text-white/60 text-sm mt-4 leading-relaxed max-w-xs">
            Fashion that fits your story. Curated clothing, footwear and accessories for men &amp; women —
            designed to move with your everyday.
          </p>
          <div className="flex gap-3 mt-5">
            {[FaInstagram, FaFacebookF, FaYoutube, FaTwitter, FaPinterestP].map((Icon, i) => (
              <button
                key={i}
                type="button"
                aria-label="social icon"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-zyra-gold hover:text-zyra-black transition-colors"
              >
                <Icon size={15} />
              </button>
            ))}
          </div>
        </div>

        {footerCols.map((col) => (
          <div key={col.title}>
            <p className="font-semibold mb-4 text-sm uppercase tracking-wider">{col.title}</p>
            <ul className="space-y-2.5">
              {col.links.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className="text-sm text-white/60 hover:text-zyra-gold transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="md:col-span-2">
          <p className="font-semibold mb-4 text-sm uppercase tracking-wider">Stay in the loop</p>
          <p className="text-white/60 text-sm mb-4">
            Subscribe for early access to new drops, sales &amp; styling edits.
          </p>
          {subscribed ? (
            <p className="text-zyra-gold text-sm font-medium">
              🎉 Welcome to ZYRA Fashion — you're subscribed!
            </p>
          ) : (
            // min-w-0 on the input matters here: a flex child's default
            // min-width is "auto" (its own content size), not 0 — so even
            // with flex-1, the browser wouldn't let this input shrink past
            // its intrinsic width, and the Join button got pushed off the
            // right edge on narrow phones (invisible once the page is
            // locked from scrolling sideways). min-w-0 lets it actually
            // shrink to fit.
            <form onSubmit={onSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 min-w-0 bg-white/10 rounded-full px-4 py-2.5 text-sm outline-none placeholder:text-white/40"
              />
              <button type="submit" className="flex-shrink-0 bg-zyra-gold text-zyra-black text-sm font-semibold px-5 rounded-full hover:opacity-90">
                Join
              </button>
            </form>
          )}
        </div>
      </div>

      <div className="container-x py-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50">
        <p>© {new Date().getFullYear()} ZYRA Fashion. All rights reserved.</p>
        <div className="flex gap-4">
          <span>💳 Cards</span>
          <span>💵 COD</span>
          <span>📦 Free Returns</span>
          <span>🔒 Secure Checkout</span>
        </div>
      </div>
    </footer>
  );
}
