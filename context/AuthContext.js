"use client";

import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);
const STORAGE_KEY = "zyra_auth_v1";
const ORDERS_KEY = "zyra_orders_v1";
const ADDR_KEY = "zyra_addresses_v1";
const CARDS_KEY = "zyra_cards_v1";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [cards, setCards] = useState([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const u = localStorage.getItem(STORAGE_KEY);
      const o = localStorage.getItem(ORDERS_KEY);
      const a = localStorage.getItem(ADDR_KEY);
      const c = localStorage.getItem(CARDS_KEY);
      if (u) setUser(JSON.parse(u));
      if (o) setOrders(JSON.parse(o));
      if (a) setAddresses(JSON.parse(a));
      if (c) setCards(JSON.parse(c));
    } catch (e) {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      if (user) localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_KEY);
    } catch (e) {}
  }, [user, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
    } catch (e) {}
  }, [orders, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(ADDR_KEY, JSON.stringify(addresses));
    } catch (e) {}
  }, [addresses, hydrated]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(CARDS_KEY, JSON.stringify(cards));
    } catch (e) {}
  }, [cards, hydrated]);

  const login = ({ name, email }) => {
    setUser({ name, email, joined: new Date().toISOString() });
    return { ok: true };
  };

  const register = ({ name, email }) => {
    setUser({ name, email, joined: new Date().toISOString() });
    return { ok: true };
  };

  const logout = () => setUser(null);

  const updateProfile = (updates) => {
    setUser((prev) => (prev ? { ...prev, ...updates } : prev));
    return { ok: true };
  };

  const placeOrder = (order) => {
    const newOrder = {
      id: "ZYRA" + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString(),
      status: "Confirmed",
      ...order,
    };
    setOrders((prev) => [newOrder, ...prev]);
    return newOrder;
  };

  const addAddress = (addr) => {
    const newAddr = { id: Date.now().toString(), ...addr };
    setAddresses((prev) => [...prev, newAddr]);
    return newAddr;
  };

  const removeAddress = (id) => setAddresses((prev) => prev.filter((a) => a.id !== id));

  const addCard = (card) => {
    const newCard = { id: Date.now().toString(), ...card };
    setCards((prev) => [...prev, newCard]);
    return newCard;
  };

  const removeCard = (id) => setCards((prev) => prev.filter((c) => c.id !== id));

  const cancelOrder = (id) =>
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status: "Cancelled" } : o)));

  const deleteOrder = (id) => setOrders((prev) => prev.filter((o) => o.id !== id));

  return (
    <AuthContext.Provider
      value={{
        user, login, register, logout, updateProfile, orders, placeOrder, cancelOrder, deleteOrder,
        addresses, addAddress, removeAddress, cards, addCard, removeCard, hydrated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
