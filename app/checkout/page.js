"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FiCheck, FiMapPin, FiCreditCard, FiPackage, FiTrash2 } from "react-icons/fi";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const steps = ["Address", "Payment", "Review"];

export default function CheckoutPage() {
  const { items, subtotal, shipping, couponDiscount, total, clearCart } = useCart();
  const { addresses, addAddress, removeAddress, cards, addCard, removeCard, placeOrder } = useAuth();
  const router = useRouter();

  const [step, setStep] = useState(0);
  const [selectedAddr, setSelectedAddr] = useState(addresses[0]?.id || null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placing, setPlacing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", pincode: "", line1: "", city: "", state: "" });
  const [cardForm, setCardForm] = useState({ number: "", name: "", expiry: "", cvv: "" });
  const [saveCard, setSaveCard] = useState(true);
  const [upiId, setUpiId] = useState("");
  const [paymentError, setPaymentError] = useState("");

  if (items.length === 0 && !placing) {
    return (
      <div className="container-x py-24 text-center">
        <h1 className="text-2xl font-display font-semibold">Nothing to checkout</h1>
        <p className="text-zyra-gray mt-2">Your cart is empty. Add some products first.</p>
      </div>
    );
  }

  const onAddAddress = (e) => {
    e.preventDefault();
    const newAddr = addAddress(form);
    setSelectedAddr(newAddr.id);
    setForm({ name: "", phone: "", pincode: "", line1: "", city: "", state: "" });
  };

  const currentAddress = addresses.find((a) => a.id === selectedAddr);

  const validatePayment = () => {
    if (paymentMethod === "card") {
      if (cards.length > 0 && !cardForm.number.trim()) return ""; // reusing a saved card
      const digits = cardForm.number.replace(/\s/g, "");
      if (digits.length < 12 || !/^\d+$/.test(digits)) return "Enter a valid card number.";
      if (!cardForm.name.trim()) return "Enter the name on the card.";
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardForm.expiry.trim())) return "Enter expiry as MM/YY.";
      if (!/^\d{3}$/.test(cardForm.cvv.trim())) return "Enter a valid 3-digit CVV.";
      return "";
    }
    if (paymentMethod === "upi") {
      if (!/^[\w.-]+@[\w.-]+$/.test(upiId.trim())) return "Enter a valid UPI ID, e.g. yourname@upi.";
      return "";
    }
    if (paymentMethod === "wallet") {
      return "Your ZYRA Wallet balance is ₹0.00 — add money first or choose another payment method.";
    }
    return "";
  };

  const onContinueFromPayment = () => {
    const err = validatePayment();
    if (err) {
      setPaymentError(err);
      return;
    }
    setPaymentError("");
    if (paymentMethod === "card" && saveCard && cardForm.number.trim()) {
      addCard({ ...cardForm });
      setCardForm({ number: "", name: "", expiry: "", cvv: "" });
    }
    setStep(2);
  };

  const placeTheOrder = () => {
    setPlacing(true);
    const order = placeOrder({
      items,
      address: currentAddress,
      paymentMethod,
      subtotal,
      shipping,
      discount: couponDiscount,
      total,
    });
    setTimeout(() => {
      clearCart();
      router.push(`/orders?placed=${order.id}`);
    }, 900);
  };

  return (
    <div className="container-x py-10 max-w-5xl">
      <h1 className="text-3xl font-display font-semibold mb-8">Checkout</h1>

      <div className="flex items-center gap-4 mb-10">
        {steps.map((s, i) => (
          <div key={s} className="flex items-center gap-3 flex-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-colors flex-shrink-0 ${
                i <= step ? "bg-zyra-black text-white border-zyra-black" : "border-black/20 text-zyra-gray"
              }`}
            >
              {i < step ? <FiCheck /> : i + 1}
            </div>
            <span className={`text-sm font-medium whitespace-nowrap ${i <= step ? "text-zyra-black" : "text-zyra-gray"}`}>{s}</span>
            {i < steps.length - 1 && <div className="flex-1 h-px bg-black/10" />}
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {step === 0 && (
              <div>
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2"><FiMapPin /> Delivery Address</h2>
                {addresses.length > 0 && (
                  <div className="space-y-3 mb-6">
                    {addresses.map((a) => (
                      <div
                        key={a.id}
                        className={`flex gap-3 p-4 border rounded-xl ${
                          selectedAddr === a.id ? "border-zyra-gold bg-zyra-cream" : "border-black/10"
                        }`}
                      >
                        <label className="flex gap-3 flex-1 cursor-pointer">
                          <input type="radio" checked={selectedAddr === a.id} onChange={() => setSelectedAddr(a.id)} className="accent-zyra-gold mt-1" />
                          <div className="text-sm">
                            <p className="font-medium">{a.name} • {a.phone}</p>
                            <p className="text-zyra-gray mt-1">{a.line1}, {a.city}, {a.state} - {a.pincode}</p>
                          </div>
                        </label>
                        <button
                          type="button"
                          aria-label="Delete address"
                          onClick={() => {
                            removeAddress(a.id);
                            if (selectedAddr === a.id) setSelectedAddr(addresses.find((x) => x.id !== a.id)?.id || null);
                          }}
                          className="text-zyra-gray hover:text-red-500 transition-colors flex-shrink-0 self-start"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                <form onSubmit={onAddAddress} className="grid sm:grid-cols-2 gap-3 border border-black/10 rounded-xl p-5">
                  <p className="sm:col-span-2 font-medium text-sm">Add a new address</p>
                  {[
                    ["name", "Full Name"], ["phone", "Phone Number"], ["pincode", "Pincode"],
                    ["city", "City"], ["state", "State"],
                  ].map(([key, label]) => (
                    <input
                      key={key}
                      required
                      value={form[key]}
                      onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                      placeholder={label}
                      className="border border-black/15 rounded-lg px-3 py-2.5 text-sm outline-none"
                    />
                  ))}
                  <input
                    required
                    value={form.line1}
                    onChange={(e) => setForm({ ...form, line1: e.target.value })}
                    placeholder="Address Line (House no, Street, Area)"
                    className="sm:col-span-2 border border-black/15 rounded-lg px-3 py-2.5 text-sm outline-none"
                  />
                  <button type="submit" className="btn-outline sm:col-span-2 justify-center">Save Address</button>
                </form>
                <button
                  disabled={!selectedAddr}
                  onClick={() => setStep(1)}
                  className="btn-primary mt-6 disabled:opacity-40"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2"><FiCreditCard /> Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { key: "card", label: "Credit / Debit Card", desc: "Visa, Mastercard, RuPay, Amex" },
                    { key: "upi", label: "UPI", desc: "GPay, PhonePe, Paytm, BHIM" },
                    { key: "netbanking", label: "Net Banking", desc: "All major Indian banks" },
                    { key: "wallet", label: "ZYRA Wallet", desc: "Balance: ₹0.00 · add money at checkout" },
                    { key: "cod", label: "Cash on Delivery", desc: "Pay when your order arrives" },
                  ].map((p) => (
                    <label
                      key={p.key}
                      className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer ${
                        paymentMethod === p.key ? "border-zyra-gold bg-zyra-cream" : "border-black/10"
                      }`}
                    >
                      <input
                        type="radio"
                        checked={paymentMethod === p.key}
                        onChange={() => {
                          setPaymentMethod(p.key);
                          setPaymentError("");
                        }}
                        className="accent-zyra-gold"
                      />
                      <div className="text-sm">
                        <p className="font-medium">{p.label}</p>
                        <p className="text-zyra-gray text-xs">{p.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>

                {paymentMethod === "card" && cards.length > 0 && (
                  <div className="border border-black/10 rounded-xl divide-y divide-black/5 mt-4">
                    {cards.map((c) => (
                      <div key={c.id} className="flex items-center justify-between px-4 py-3">
                        <div className="text-sm">
                          <p className="font-medium">•••• •••• •••• {c.number?.slice(-4) || "0000"}</p>
                          <p className="text-xs text-zyra-gray">{c.name} · Expires {c.expiry}</p>
                        </div>
                        <button
                          onClick={() => removeCard(c.id)}
                          aria-label="Remove saved card"
                          className="text-zyra-gray hover:text-red-500 transition-colors"
                        >
                          <FiTrash2 size={15} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="grid sm:grid-cols-2 gap-3 border border-black/10 rounded-xl p-5 mt-4">
                    <input
                      value={cardForm.number}
                      onChange={(e) => setCardForm({ ...cardForm, number: e.target.value })}
                      placeholder="Card Number"
                      maxLength={19}
                      className="sm:col-span-2 border border-black/15 rounded-lg px-3 py-2.5 text-sm outline-none"
                    />
                    <input
                      value={cardForm.name}
                      onChange={(e) => setCardForm({ ...cardForm, name: e.target.value })}
                      placeholder="Name on Card"
                      className="sm:col-span-2 border border-black/15 rounded-lg px-3 py-2.5 text-sm outline-none"
                    />
                    <input
                      value={cardForm.expiry}
                      onChange={(e) => setCardForm({ ...cardForm, expiry: e.target.value })}
                      placeholder="MM/YY"
                      className="border border-black/15 rounded-lg px-3 py-2.5 text-sm outline-none"
                    />
                    <input
                      value={cardForm.cvv}
                      onChange={(e) => setCardForm({ ...cardForm, cvv: e.target.value })}
                      placeholder="CVV"
                      maxLength={3}
                      className="border border-black/15 rounded-lg px-3 py-2.5 text-sm outline-none"
                    />
                    <label className="sm:col-span-2 flex items-center gap-2 text-xs text-zyra-gray mt-1">
                      <input type="checkbox" checked={saveCard} onChange={(e) => setSaveCard(e.target.checked)} className="accent-zyra-gold" />
                      Save this card for faster checkout next time
                    </label>
                  </div>
                )}
                {paymentMethod === "upi" && (
                  <div className="border border-black/10 rounded-xl p-5 mt-4">
                    <input
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      placeholder="yourname@upi"
                      className="w-full border border-black/15 rounded-lg px-3 py-2.5 text-sm outline-none"
                    />
                    <p className="text-xs text-zyra-gray mt-2">A payment request will be sent to this UPI ID.</p>
                  </div>
                )}
                {paymentMethod === "netbanking" && (
                  <div className="border border-black/10 rounded-xl p-5 mt-4">
                    <select className="w-full border border-black/15 rounded-lg px-3 py-2.5 text-sm outline-none bg-white">
                      {["State Bank of India", "HDFC Bank", "ICICI Bank", "Axis Bank", "Kotak Mahindra Bank", "Punjab National Bank"].map((b) => (
                        <option key={b}>{b}</option>
                      ))}
                    </select>
                  </div>
                )}
                {paymentMethod === "wallet" && (
                  <div className="border border-black/10 rounded-xl p-5 mt-4 text-sm text-zyra-gray">
                    Your ZYRA Wallet balance is ₹0.00. Add money on the next step, or choose another payment method.
                  </div>
                )}

                {paymentError && (
                  <p className="text-sm text-red-500 mt-4">{paymentError}</p>
                )}

                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(0)} className="btn-outline">Back</button>
                  <button onClick={onContinueFromPayment} className="btn-primary">
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="font-semibold text-lg mb-4 flex items-center gap-2"><FiPackage /> Review &amp; Place Order</h2>
                <div className="border border-black/10 rounded-xl p-5 mb-5 text-sm">
                  <p className="font-medium mb-1">Deliver to</p>
                  <p className="text-zyra-gray">
                    {currentAddress?.name}, {currentAddress?.line1}, {currentAddress?.city}, {currentAddress?.state} - {currentAddress?.pincode}
                  </p>
                  <p className="font-medium mt-4 mb-1">Payment method</p>
                  <p className="text-zyra-gray">
                    {{ card: "Credit / Debit Card", upi: "UPI", netbanking: "Net Banking", wallet: "ZYRA Wallet", cod: "Cash on Delivery" }[paymentMethod]}
                  </p>
                </div>
                <div className="space-y-3">
                  {items.map((i) => (
                    <div key={i.key} className="flex justify-between text-sm border-b border-black/5 pb-3">
                      <span>{i.name} × {i.qty} <span className="text-zyra-gray">({i.size}, {i.color})</span></span>
                      <span className="font-medium">₹{(i.price * i.qty).toLocaleString("en-IN")}</span>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-outline">Back</button>
                  <button onClick={placeTheOrder} disabled={placing} className="btn-primary disabled:opacity-60">
                    {placing ? "Placing Order..." : `Place Order — ₹${total.toLocaleString("en-IN")}`}
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="border border-black/10 rounded-2xl p-6 h-fit sticky top-24">
          <h3 className="font-semibold mb-4">Order Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-zyra-gray"><span>Subtotal</span><span>₹{subtotal.toLocaleString("en-IN")}</span></div>
            {couponDiscount > 0 && (
              <div className="flex justify-between text-green-600"><span>Coupon Discount</span><span>−₹{couponDiscount.toLocaleString("en-IN")}</span></div>
            )}
            <div className="flex justify-between text-zyra-gray"><span>Shipping</span><span>{shipping === 0 ? "FREE" : `₹${shipping}`}</span></div>
            <div className="flex justify-between font-semibold text-base border-t border-black/10 pt-3"><span>Total</span><span>₹{total.toLocaleString("en-IN")}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
