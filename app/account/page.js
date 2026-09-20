"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { FiUser, FiPackage, FiHeart, FiMapPin, FiLogOut } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import { useWishlist } from "@/context/WishlistContext";

export default function AccountPage() {
  const { user, logout, orders, addresses, hydrated } = useAuth();
  const { ids } = useWishlist();
  const router = useRouter();

  if (hydrated && !user) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-display font-semibold">You're not logged in</h1>
        <p className="text-zyra-gray mt-2">Log in to view your account details.</p>
        <Link href="/login" className="btn-primary mt-7 inline-flex">Log In</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-16 h-16 rounded-full bg-zyra-black text-white flex items-center justify-center font-display text-2xl">
          {user?.name?.[0]?.toUpperCase() || "Z"}
        </div>
        <div>
          <h1 className="text-2xl font-display font-semibold">Hi, {user?.name}</h1>
          <p className="text-zyra-gray text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { icon: FiPackage, title: "My Orders", value: `${orders.length} orders`, href: "/orders" },
          { icon: FiHeart, title: "Wishlist", value: `${ids.length} items`, href: "/wishlist" },
          { icon: FiMapPin, title: "Addresses", value: `${addresses.length} saved`, href: "/checkout" },
          { icon: FiUser, title: "Profile", value: "Edit details", href: "/account/profile" },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          >
            <Link href={c.href} className="block border border-black/10 rounded-2xl p-6 hover:border-zyra-gold transition-colors card-shadow">
              <c.icon className="text-zyra-gold mb-3" size={22} />
              <p className="font-semibold text-sm">{c.title}</p>
              <p className="text-xs text-zyra-gray mt-1">{c.value}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      <button
        onClick={() => { logout(); router.push("/"); }}
        className="btn-outline mt-10 inline-flex items-center gap-2"
      >
        <FiLogOut /> Log Out
      </button>
    </div>
  );
}
