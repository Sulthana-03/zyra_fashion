"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { coupons } from "@/data/testimonials";

const CartContext = createContext(null);
const STORAGE_KEY = "zyra_cart_v1";

function lineKey(productId, size, color) {
  return `${productId}__${size || "-"}__${color || "-"}`;
}

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [couponCode, setCouponCode] = useState(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setItems(parsed.items || []);
        setCouponCode(parsed.couponCode || null);
      }
    } catch (e) {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ items, couponCode }));
    } catch (e) {
      /* ignore */
    }
  }, [items, couponCode, hydrated]);

  const addToCart = (product, { size, color, qty = 1, image } = {}) => {
    const key = lineKey(product.id, size, color);
    // Pick the image that matches the selected color when the caller didn't
    // already resolve one (e.g. the color's position in product.colors maps
    // to the same position in product.images, when available).
    const resolvedColor = color || product.colors?.[0];
    const colorIdx = product.colors ? product.colors.indexOf(resolvedColor) : -1;
    const fallbackImage =
      colorIdx > -1 && product.images[colorIdx] ? product.images[colorIdx] : product.images[0];

    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          image: image || fallbackImage,
          price: product.price,
          mrp: product.mrp,
          size: size || product.sizes?.[0],
          color: resolvedColor,
          qty,
        },
      ];
    });
  };

  const removeFromCart = (key) => setItems((prev) => prev.filter((i) => i.key !== key));

  const updateQty = (key, qty) =>
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i))
    );

  const clearCart = () => {
    setItems([]);
    setCouponCode(null);
  };

  const applyCoupon = (code) => {
    const upper = code.trim().toUpperCase();
    if (coupons[upper]) {
      setCouponCode(upper);
      return { ok: true, message: coupons[upper].label };
    }
    return { ok: false, message: "Invalid coupon code" };
  };

  const removeCoupon = () => setCouponCode(null);

  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  );

  const mrpTotal = useMemo(
    () => items.reduce((sum, i) => sum + i.mrp * i.qty, 0),
    [items]
  );

  const couponDiscount = useMemo(() => {
    if (!couponCode || !coupons[couponCode]) return 0;
    const c = coupons[couponCode];
    if (subtotal < c.minAmount) return 0;
    if (c.percent) return Math.round((subtotal * c.percent) / 100);
    if (c.flat) return c.flat;
    return 0;
  }, [couponCode, subtotal]);

  const shipping = useMemo(() => (subtotal === 0 || subtotal >= 999 ? 0 : 79), [subtotal]);

  const total = Math.max(0, subtotal - couponDiscount + shipping);
  const totalItems = items.reduce((sum, i) => sum + i.qty, 0);

  const value = {
    items,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    applyCoupon,
    removeCoupon,
    couponCode,
    subtotal,
    mrpTotal,
    couponDiscount,
    shipping,
    total,
    totalItems,
    hydrated,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
