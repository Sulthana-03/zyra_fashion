import { FiHeart, FiTrendingUp, FiUsers, FiMail } from "react-icons/fi";
import PageHeader from "@/components/PageHeader";

const perks = [
  { icon: FiHeart, title: "Health first", text: "Comprehensive health cover for you and your family." },
  { icon: FiTrendingUp, title: "Room to grow", text: "Clear growth paths and a learning budget for every team member." },
  { icon: FiUsers, title: "Small, close-knit teams", text: "Work directly with founders — no bureaucracy, real ownership." },
];

export default function CareersPage() {
  return (
    <div>
      <PageHeader title="Careers at ZYRA" subtitle="We're a small team building fashion e-commerce people actually enjoy using." />

      <div className="container-x py-16">
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {perks.map((p) => (
            <div key={p.title} className="border border-black/10 rounded-2xl p-6">
              <p.icon className="text-zyra-gold mb-3" size={22} />
              <p className="font-semibold">{p.title}</p>
              <p className="text-sm text-zyra-gray mt-1.5">{p.text}</p>
            </div>
          ))}
        </div>

        <div className="max-w-xl mx-auto text-center border border-black/10 rounded-2xl p-10 bg-zyra-cream">
          <FiMail className="text-zyra-gold mx-auto mb-4" size={26} />
          <h2 className="text-xl font-display font-semibold mb-2">No open roles right now</h2>
          <p className="text-sm text-zyra-gray">
            We're not actively hiring at the moment, but we're always happy to hear from people who love
            what we're building. Send your resume and a short note to{" "}
            <a href="mailto:careers@zyra-fashion.in" className="text-zyra-gold font-medium hover:underline">
              careers@zyra-fashion.in
            </a>{" "}
            and we'll keep it on file for when a role opens up.
          </p>
        </div>
      </div>
    </div>
  );
}
