import Link from "next/link";
import { FiRefreshCw, FiCheckCircle, FiXCircle, FiClock } from "react-icons/fi";
import PageHeader from "@/components/PageHeader";

const steps = [
  { title: "Request a return", text: "Go to My Orders, pick the item and select 'Return' — no need to call us." },
  { title: "We schedule a pickup", text: "A courier picks the item up from your address within 2–3 business days." },
  { title: "Quality check", text: "Once it reaches our warehouse and passes inspection, your refund is triggered." },
  { title: "Refund issued", text: "Refunds land in your original payment method within 5–7 business days." },
];

const nonReturnable = ["Innerwear, sleepwear and lingerie for hygiene reasons", "Items marked 'Final Sale'", "Products without original tags or packaging", "Customized or made-to-order pieces"];

export default function ReturnsPage() {
  return (
    <div>
      <PageHeader title="Returns & Exchanges" subtitle="Easy 7-day returns on unused items with original tags." />

      <div className="container-x py-16 grid md:grid-cols-2 gap-14">
        <div>
          <h2 className="text-2xl font-display font-semibold mb-6 flex items-center gap-2">
            <FiRefreshCw className="text-zyra-gold" /> How returns work
          </h2>
          <div className="space-y-6">
            {steps.map((s, i) => (
              <div key={s.title} className="flex gap-4">
                <div className="w-9 h-9 rounded-full bg-zyra-black text-white flex items-center justify-center font-semibold text-sm flex-shrink-0">
                  {i + 1}
                </div>
                <div>
                  <p className="font-semibold">{s.title}</p>
                  <p className="text-sm text-zyra-gray mt-1">{s.text}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/orders" className="btn-primary mt-8 inline-flex">
            Start a Return
          </Link>
        </div>

        <div>
          <div className="border border-black/10 rounded-2xl p-6 mb-6">
            <p className="font-semibold flex items-center gap-2 mb-3">
              <FiClock className="text-zyra-gold" /> Return window
            </p>
            <p className="text-sm text-zyra-gray">
              You have 7 days from the date of delivery to request a return or exchange. Items must be
              unused, unwashed and have all original tags attached.
            </p>
          </div>
          <div className="border border-black/10 rounded-2xl p-6">
            <p className="font-semibold flex items-center gap-2 mb-3">
              <FiXCircle className="text-zyra-rose" /> What can't be returned
            </p>
            <ul className="space-y-2">
              {nonReturnable.map((n) => (
                <li key={n} className="text-sm text-zyra-gray flex gap-2">
                  <span className="text-zyra-rose">•</span> {n}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-black/10 rounded-2xl p-6 mt-6 bg-zyra-cream">
            <p className="font-semibold flex items-center gap-2 mb-2">
              <FiCheckCircle className="text-green-600" /> Exchanges
            </p>
            <p className="text-sm text-zyra-gray">
              Need a different size or color instead? Choose "Exchange" from My Orders and we'll ship the
              replacement as soon as the original item is picked up.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
