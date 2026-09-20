import { FiTruck, FiMapPin, FiCreditCard, FiPackage } from "react-icons/fi";
import PageHeader from "@/components/PageHeader";

const zones = [
  { zone: "Metro cities", time: "2–4 business days" },
  { zone: "Tier 2 & Tier 3 cities", time: "4–6 business days" },
  { zone: "Remote / rural pin codes", time: "6–9 business days" },
];

export default function ShippingInfoPage() {
  return (
    <div>
      <PageHeader title="Shipping Information" subtitle="Everything you need to know about delivery, charges and tracking." />

      <div className="container-x py-16 grid md:grid-cols-2 gap-8">
        {[
          { icon: FiTruck, title: "Free shipping over ₹999", text: "Orders below ₹999 carry a flat ₹79 shipping charge. Above that, delivery is on us." },
          { icon: FiMapPin, title: "Pan-India delivery", text: "We deliver to over 20,000 pin codes across India, including most rural areas." },
          { icon: FiCreditCard, title: "Cash on Delivery", text: "COD is available on eligible orders under ₹5,000 with a small handling fee." },
          { icon: FiPackage, title: "Order tracking", text: "Track any order in real time from My Orders or the Track Order page." },
        ].map((c) => (
          <div key={c.title} className="border border-black/10 rounded-2xl p-6">
            <c.icon className="text-zyra-gold mb-3" size={22} />
            <p className="font-semibold">{c.title}</p>
            <p className="text-sm text-zyra-gray mt-1.5">{c.text}</p>
          </div>
        ))}
      </div>

      <div className="container-x pb-20">
        <h2 className="text-2xl font-display font-semibold mb-6">Estimated delivery times</h2>
        <div className="border border-black/10 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-zyra-cream text-left">
              <tr>
                <th className="px-5 py-3 font-semibold">Delivery zone</th>
                <th className="px-5 py-3 font-semibold">Estimated time</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((z, i) => (
                <tr key={z.zone} className={i % 2 ? "bg-white" : "bg-zyra-cream/40"}>
                  <td className="px-5 py-3">{z.zone}</td>
                  <td className="px-5 py-3 text-zyra-gray">{z.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-zyra-gray mt-4">
          Delivery times are estimates and may vary during sale events or due to weather and courier delays.
        </p>
      </div>
    </div>
  );
}
