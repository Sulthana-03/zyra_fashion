import { FiPackage, FiDroplet, FiUsers, FiRefreshCw } from "react-icons/fi";
import PageHeader from "@/components/PageHeader";

const commitments = [
  { icon: FiPackage, title: "Responsible packaging", text: "Recyclable mailers and paper tape across every order, with plastic use down year over year." },
  { icon: FiDroplet, title: "Water-conscious dyeing", text: "We work with mills that treat and recycle wastewater from the dyeing process." },
  { icon: FiUsers, title: "Fair labor practices", text: "Every manufacturing partner is audited for fair wages and safe working conditions." },
  { icon: FiRefreshCw, title: "Take-back program", text: "Return worn-out ZYRA pieces at any partner store for recycling credit toward your next order." },
];

export default function SustainabilityPage() {
  return (
    <div>
      <PageHeader title="Sustainability" subtitle="Small, steady steps toward a lower-impact wardrobe." />

      <div className="container-x py-16 max-w-4xl mx-auto">
        <p className="text-zyra-gray leading-relaxed mb-10">
          Fashion has an environmental cost, and we don't think pretending otherwise helps anyone. We're
          a growing brand, and sustainability is a work in progress — but here's what we've committed to
          so far, and what we're working on next.
        </p>

        <div className="grid sm:grid-cols-2 gap-6">
          {commitments.map((c) => (
            <div key={c.title} className="border border-black/10 rounded-2xl p-6">
              <c.icon className="text-zyra-gold mb-3" size={22} />
              <p className="font-semibold">{c.title}</p>
              <p className="text-sm text-zyra-gray mt-1.5">{c.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
