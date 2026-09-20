"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiCheck } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function ProfilePage() {
  const { user, updateProfile, hydrated } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState({});
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (user) setForm({ name: user.name || "", email: user.email || "", phone: user.phone || "" });
  }, [user]);

  if (hydrated && !user) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-display font-semibold">You're not logged in</h1>
        <p className="text-zyra-gray mt-2">Log in to view and edit your profile.</p>
        <Link href="/login" className="btn-primary mt-7 inline-flex">Log In</Link>
      </div>
    );
  }

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.trim() || !/^\S+@\S+\.\S+$/.test(form.email)) errs.email = "Enter a valid email address.";
    if (form.phone && !/^\d{10}$/.test(form.phone)) errs.phone = "Phone number must be 10 digits.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onSave = (e) => {
    e.preventDefault();
    if (!validate()) return;
    updateProfile({ name: form.name.trim(), email: form.email.trim(), phone: form.phone.trim() });
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="container-x py-10 max-w-lg">
      <Link href="/account" className="text-sm text-zyra-gray hover:text-zyra-black inline-flex items-center gap-1.5 mb-6">
        <FiArrowLeft size={14} /> Back to account
      </Link>

      <h1 className="text-2xl font-display font-semibold mb-1">Edit Profile</h1>
      <p className="text-zyra-gray text-sm mb-8">Update your name, email and phone number.</p>

      <form onSubmit={onSave} className="space-y-5">
        <div>
          <label className="text-sm font-medium mb-1.5 block">Full Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none ${
              errors.name ? "border-red-400" : "border-black/15"
            }`}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Email Address</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none ${
              errors.email ? "border-red-400" : "border-black/15"
            }`}
            placeholder="you@example.com"
          />
          {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className="text-sm font-medium mb-1.5 block">Phone Number</label>
          <input
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={`w-full border rounded-lg px-3.5 py-2.5 text-sm outline-none ${
              errors.phone ? "border-red-400" : "border-black/15"
            }`}
            placeholder="10-digit mobile number"
            maxLength={10}
          />
          {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone}</p>}
        </div>

        <button type="submit" className="btn-primary">
          Save Changes
        </button>
      </form>

      {/* Success popup toast, top-right, auto-dismisses */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -12, x: 40 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed top-6 right-6 z-[100] bg-zyra-black text-white rounded-xl shadow-2xl px-5 py-4 flex items-center gap-3"
          >
            <span className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0">
              <FiCheck className="text-green-400" size={16} />
            </span>
            <div>
              <p className="text-sm font-semibold">Profile updated!</p>
              <p className="text-xs text-white/60">Your changes have been saved.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
