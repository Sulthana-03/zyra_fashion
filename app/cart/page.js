"use client";

import { useState } from "react";
import Link from "next/link";
import SafeImage from "@/components/SafeImage";
import { motion, AnimatePresence } from "framer-motion";
import { FiTrash2, FiTag, FiArrowRight, FiCheck } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    items, removeFromCart, updateQty, subtotal, mrpTotal,
    couponDiscount, shipping, total, applyCoupon, removeCoupon, couponCode,
  } = useCart();
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState(null);

  const onApply = (e) => {
    e.preventDefault();
    const res = applyCoupon(code);
    setMsg(res);
  };

  if (items.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-zyra-cream flex items-center justify-center mx-auto mb-6">
          <HiOutlineShoppingBag size={38} className="text-zyra-gold" />
        </div>
        <h1 className="text-2xl font-display font-semibold">Your cart is empty</h1>
        <p className="text-zyra-gray mt-2">Looks like you haven't added anything yet.</p>
        <Link href="/" className="btn-primary mt-7 inline-flex">
          Continue Shopping <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10">
      <h1 className="text-3xl font-display font-semibold mb-8">Shopping Cart ({items.length})</h1>
      <div className="grid lg:grid-cols-[1fr_360px] gap-10">
        <div className="space-y-4">
          <AnimatePresence>
            {items.map((item) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 1 }}
                exit={{ opacity: 0, x: -40 }}
                layout
                className="flex gap-4 border border-black/10 rounded-2xl p-4"
              >
                <div className="relative w-24 h-28 rounded-xl overflow-hidden flex-shrink-0 bg-zyra-cream">
                  <SafeImage src={item.image} alt={item.name} fill />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <div>
                      <p className="font-medium text-zyra-black">{item.name}</p>
                      <p className="text-xs text-zyra-gray mt-1">
                        Size: {item.size} &nbsp;•&nbsp; Color: {item.color}
                      </p>
                    </div>
                    <button onClick={() => removeFromCart(item.key)} aria-label="Remove item" className="text-zyra-gray hover:text-zyra-rose">
                      <FiTrash2 size={17} />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-4">
                    <div className="inline-flex items-center border border-black/15 rounded-full">
                      <button
                        onClick={() => (item.qty <= 1 ? removeFromCart(item.key) : updateQty(item.key, item.qty - 1))}
                        className="w-8 h-8 text-base"
                      >
                        −
                      </button>
                      <span className="w-8 text-center text-sm">{item.qty}</span>
                      <button onClick={() => updateQty(item.key, item.qty + 1)} className="w-8 h-8 text-base">+</button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{(item.price * item.qty).toLocaleString("en-IN")}</p>
                      {item.mrp > item.price && (
                        <p className="text-xs text-zyra-gray line-through">₹{(item.mrp * item.qty).toLocaleString("en-IN")}</p>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="border border-black/10 rounded-2xl p-6 h-fit sticky top-24">
          <h2 className="font-semibold text-lg mb-5">Order Summary</h2>

          <form onSubmit={onApply} className="mb-5">
            <label className="text-xs font-medium text-zyra-gray mb-2 flex items-center gap-1.5">
              <FiTag size={13} /> Have a coupon code?
            </label>
            <div className="flex gap-2">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="e.g. ZYRA10"
                className="flex-1 min-w-0 border border-black/15 rounded-full px-4 py-2 text-sm outline-none"
              />
              <button type="submit" className="flex-shrink-0 btn-outline py-2 px-4 text-xs">Apply</button>
            </div>
            {msg && (
              <p className={`text-xs mt-2 flex items-center gap-1 ${msg.ok ? "text-green-600" : "text-red-500"}`}>
                {msg.ok && <FiCheck size={12} />} {msg.message}
              </p>
            )}
            {couponCode && (
              <p className="text-xs mt-2 flex items-center justify-between bg-zyra-cream px-3 py-2 rounded-lg">
                <span>Applied: <b>{couponCode}</b></span>
                <button type="button" onClick={removeCoupon} className="text-zyra-rose">Remove</button>
              </p>
            )}
            <p className="text-[11px] text-zyra-gray mt-2">Try ZYRA10, ZYRA20 or WELCOME50</p>
          </form>

          <div className="space-y-2.5 text-sm border-t border-black/10 pt-5">
            <div className="flex justify-between text-zyra-gray">
              <span>MRP Total</span>
              <span>₹{mrpTotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount on MRP</span>
              <span>−₹{(mrpTotal - subtotal).toLocaleString("en-IN")}</span>
            </div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Coupon Discount</span>
                <span>−₹{couponDiscount.toLocaleString("en-IN")}</span>
              </div>
            )}
            <div className="flex justify-between text-zyra-gray">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
            </div>
            <div className="flex justify-between font-semibold text-base border-t border-black/10 pt-3 text-zyra-black">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </div>

          <Link href="/checkout" className="btn-primary w-full mt-6">
            Proceed to Checkout <FiArrowRight />
          </Link>
          <Link href="/" className="block text-center text-sm text-zyra-gray mt-4 hover:text-zyra-black">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
