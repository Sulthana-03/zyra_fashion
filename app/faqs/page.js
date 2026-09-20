"use client";

import { useState } from "react";
import PageHeader from "@/components/PageHeader";

const groups = [
  {
    title: "Orders & Shipping",
    items: [
      { q: "How long does delivery take?", a: "Standard delivery takes 2–9 business days depending on your location — see the Shipping Info page for a full breakdown." },
      { q: "Do you offer Cash on Delivery?", a: "Yes, COD is available on eligible orders under ₹5,000 with a small handling fee." },
      { q: "How do I track my order?", a: "Use the Track Order page with your order ID, or visit My Orders if you're logged in." },
      { q: "Can I change my delivery address after placing an order?", a: "Contact us within an hour of ordering and we'll try our best — once it's shipped, the address can't be changed." },
    ],
  },
  {
    title: "Returns & Refunds",
    items: [
      { q: "What is your return policy?", a: "We offer easy 7-day returns on unused items with original tags. See the Returns & Exchanges page for details." },
      { q: "When will I get my refund?", a: "Refunds are processed within 5–7 business days after the returned item passes quality check." },
      { q: "Can I exchange for a different size?", a: "Yes — choose 'Exchange' instead of 'Return' on the order and we'll ship the new size once the original is picked up." },
    ],
  },
  {
    title: "Account & Payments",
    items: [
      { q: "Is it safe to save my card details?", a: "We don't store full card numbers — only a masked reference so you can recognize saved cards, which you can remove anytime from checkout." },
      { q: "How do I delete a saved address or card?", a: "Open Checkout, and use the delete icon next to any saved address or card." },
      { q: "I forgot my password — what do I do?", a: "This demo uses a simple name + email login, so there's no password to reset. Just log in again with your details." },
    ],
  },
];

export default function FaqsPage() {
  const [open, setOpen] = useState(null);

  return (
    <div>
      <PageHeader title="Frequently Asked Questions" subtitle="Quick answers to the questions we hear most." />

      <div className="container-x py-16 max-w-2xl mx-auto space-y-10">
        {groups.map((g) => (
          <div key={g.title}>
            <h2 className="font-semibold text-lg mb-4">{g.title}</h2>
            <div className="space-y-2">
              {g.items.map((f) => {
                const key = `${g.title}-${f.q}`;
                return (
                  <div key={key} className="border border-black/10 rounded-xl overflow-hidden">
                    <button
                      onClick={() => setOpen(open === key ? null : key)}
                      className="w-full text-left px-4 py-3 text-sm font-medium flex justify-between items-center gap-3"
                    >
                      {f.q}
                      <span className="flex-shrink-0">{open === key ? "−" : "+"}</span>
                    </button>
                    {open === key && <p className="px-4 pb-3 text-sm text-zyra-gray">{f.a}</p>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
