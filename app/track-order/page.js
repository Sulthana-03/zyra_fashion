"use client";

import { useState } from "react";
import Link from "next/link";
import { FiPackage, FiSearch, FiCheckCircle, FiXCircle } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";
import PageHeader from "@/components/PageHeader";

const trackSteps = ["Confirmed", "Shipped", "Out for Delivery", "Delivered"];

export default function TrackOrderPage() {
  const { orders, user } = useAuth();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const found = orders.find((o) => o.id.toLowerCase() === query.trim().toLowerCase());

  const submit = (e) => {
    e.preventDefault();
    setSearched(true);
  };

  const stepIndex = found ? Math.max(0, trackSteps.indexOf(found.status)) : -1;

  return (
    <div>
      <PageHeader title="Track Your Order" subtitle="Enter your order ID to see its latest delivery status." />

      <div className="container-x py-16 max-w-xl mx-auto">
        <form onSubmit={submit} className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g. ZYRA482913"
            className="flex-1 min-w-0 border border-black/15 rounded-full px-5 py-3 text-sm outline-none"
          />
          <button type="submit" className="flex-shrink-0 btn-primary">
            <FiSearch /> Track
          </button>
        </form>

        {searched && (
          <div className="mt-8">
            {found ? (
              <div className="border border-black/10 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold">Order #{found.id}</p>
                    <p className="text-xs text-zyra-gray">{new Date(found.date).toLocaleString("en-IN")}</p>
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                      found.status === "Cancelled" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
                    }`}
                  >
                    {found.status === "Cancelled" ? <FiXCircle size={13} /> : <FiCheckCircle size={13} />} {found.status}
                  </span>
                </div>

                {found.status !== "Cancelled" && (
                  <div className="flex items-center gap-1 mt-6">
                    {trackSteps.map((s, i) => (
                      <div key={s} className="flex-1 flex items-center">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                            i <= stepIndex ? "bg-zyra-black text-white" : "bg-black/10 text-zyra-gray"
                          }`}
                        >
                          {i + 1}
                        </div>
                        {i < trackSteps.length - 1 && (
                          <div className={`flex-1 h-[2px] ${i < stepIndex ? "bg-zyra-black" : "bg-black/10"}`} />
                        )}
                      </div>
                    ))}
                  </div>
                )}

                <Link href="/orders" className="text-sm text-zyra-gold font-medium mt-6 inline-block hover:underline">
                  View full order details →
                </Link>
              </div>
            ) : (
              <div className="text-center border border-black/10 rounded-2xl p-8">
                <FiPackage size={28} className="text-zyra-gray mx-auto mb-3" />
                <p className="font-medium">We couldn't find an order with that ID.</p>
                <p className="text-sm text-zyra-gray mt-1">
                  Double-check the ID from your confirmation, or{" "}
                  {user ? (
                    <Link href="/orders" className="text-zyra-gold hover:underline">view all your orders</Link>
                  ) : (
                    <Link href="/login" className="text-zyra-gold hover:underline">log in</Link>
                  )}
                  .
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
