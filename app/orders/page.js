"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { FiPackage, FiCheckCircle, FiTruck, FiArrowRight, FiXCircle, FiTrash2 } from "react-icons/fi";
import { useAuth } from "@/context/AuthContext";

const trackSteps = ["Confirmed", "Shipped", "Out for Delivery", "Delivered"];

export default function OrdersPage() {
  const { orders, cancelOrder, deleteOrder } = useAuth();

  if (orders.length === 0) {
    return (
      <div className="container-x py-24 text-center">
        <div className="w-24 h-24 rounded-full bg-zyra-cream flex items-center justify-center mx-auto mb-6">
          <FiPackage size={32} className="text-zyra-gold" />
        </div>
        <h1 className="text-2xl font-display font-semibold">No orders yet</h1>
        <p className="text-zyra-gray mt-2">Once you place an order, it will show up here.</p>
        <Link href="/" className="btn-primary mt-7 inline-flex">
          Start Shopping <FiArrowRight />
        </Link>
      </div>
    );
  }

  return (
    <div className="container-x py-10 max-w-3xl">
      <h1 className="text-3xl font-display font-semibold mb-8">My Orders</h1>
      <div className="space-y-6">
        {orders.map((order, oi) => {
          const stepIndex = trackSteps.indexOf(order.status) === -1 ? 0 : trackSteps.indexOf(order.status);
          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: oi * 0.06 }}
              className="border border-black/10 rounded-2xl p-6"
            >
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <p className="font-semibold">Order #{order.id}</p>
                  <p className="text-xs text-zyra-gray">{new Date(order.date).toLocaleString("en-IN")}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full ${
                      order.status === "Cancelled" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"
                    }`}
                  >
                    {order.status === "Cancelled" ? <FiXCircle size={13} /> : <FiCheckCircle size={13} />} {order.status}
                  </span>
                  {order.status !== "Cancelled" && order.status !== "Delivered" && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="text-xs font-semibold text-zyra-gray hover:text-red-500 border border-black/10 rounded-full px-3 py-1.5 transition-colors"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => deleteOrder(order.id)}
                    aria-label="Remove order"
                    className="text-zyra-gray hover:text-red-500 transition-colors"
                  >
                    <FiTrash2 size={15} />
                  </button>
                </div>
              </div>

              {order.status !== "Cancelled" && (
                <>
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
                  <div className="flex justify-between text-[11px] text-zyra-gray mt-1">
                    {trackSteps.map((s) => <span key={s}>{s}</span>)}
                  </div>
                </>
              )}

              <div className="mt-6 divide-y divide-black/5">
                {order.items?.map((it) => (
                  <div key={it.key} className="flex justify-between py-2.5 text-sm">
                    <span>{it.name} × {it.qty}</span>
                    <span className="font-medium">₹{(it.price * it.qty).toLocaleString("en-IN")}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-4 pt-4 border-t border-black/10">
                <p className="text-sm text-zyra-gray flex items-center gap-1.5"><FiTruck size={14} /> Payment: {order.paymentMethod?.toUpperCase()}</p>
                <p className="font-semibold">Total: ₹{order.total?.toLocaleString("en-IN")}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
