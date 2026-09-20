"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiUser } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const { login, register } = useAuth();
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    if (!form.email || !form.password || (mode === "register" && !form.name)) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    if (mode === "login") login({ name: form.email.split("@")[0], email: form.email });
    else register({ name: form.name, email: form.email });
    router.push("/account");
  };

  return (
    <div className="container-x py-16 flex justify-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md border border-black/10 rounded-2xl p-8 card-shadow"
      >
        <h1 className="font-display text-2xl font-semibold text-center">
          {mode === "login" ? "Welcome Back" : "Create Your Account"}
        </h1>
        <p className="text-zyra-gray text-sm text-center mt-2">
          {mode === "login" ? "Log in to continue shopping" : "Join ZYRA for a better shopping experience"}
        </p>

        <form onSubmit={submit} className="mt-8 space-y-4">
          {mode === "register" && (
            <div className="flex items-center gap-2 border border-black/15 rounded-full px-4 py-3">
              <FiUser className="text-zyra-gray" size={16} />
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Full Name"
                className="flex-1 outline-none text-sm bg-transparent"
              />
            </div>
          )}
          <div className="flex items-center gap-2 border border-black/15 rounded-full px-4 py-3">
            <FiMail className="text-zyra-gray" size={16} />
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Email Address"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
          <div className="flex items-center gap-2 border border-black/15 rounded-full px-4 py-3">
            <FiLock className="text-zyra-gray" size={16} />
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              placeholder="Password"
              className="flex-1 outline-none text-sm bg-transparent"
            />
          </div>
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="btn-primary w-full justify-center">
            {mode === "login" ? "Log In" : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-zyra-gray mt-6">
          {mode === "login" ? "New to ZYRA?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "login" ? "register" : "login")}
            className="text-zyra-gold font-semibold"
          >
            {mode === "login" ? "Create an account" : "Log in"}
          </button>
        </p>
        <p className="text-center text-[11px] text-zyra-gray mt-4">
          By continuing you agree to ZYRA's Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
