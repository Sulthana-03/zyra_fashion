import { FiFileText, FiImage, FiMail } from "react-icons/fi";
import PageHeader from "@/components/PageHeader";

export default function PressPage() {
  return (
    <div>
      <PageHeader title="Press & Media" subtitle="Resources and contacts for journalists and media partners." />

      <div className="container-x py-16 max-w-3xl mx-auto">
        <p className="text-zyra-gray leading-relaxed mb-10">
          ZYRA is a fashion e-commerce brand covering menswear, womenswear, accessories and footwear.
          For interviews, product features, or brand collaborations, reach out to our media team and
          we'll get back to you within two business days.
        </p>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          <div className="border border-black/10 rounded-2xl p-6">
            <FiFileText className="text-zyra-gold mb-3" size={22} />
            <p className="font-semibold">Brand fact sheet</p>
            <p className="text-sm text-zyra-gray mt-1.5">
              Company background, leadership bios and key milestones — available on request.
            </p>
          </div>
          <div className="border border-black/10 rounded-2xl p-6">
            <FiImage className="text-zyra-gold mb-3" size={22} />
            <p className="font-semibold">Brand assets</p>
            <p className="text-sm text-zyra-gray mt-1.5">
              Logos, product imagery and lookbook photography for approved press use.
            </p>
          </div>
        </div>

        <div className="border border-black/10 rounded-2xl p-8 text-center bg-zyra-cream">
          <FiMail className="text-zyra-gold mx-auto mb-4" size={26} />
          <p className="font-semibold mb-1">Media enquiries</p>
          <a href="mailto:press@zyra-fashion.in" className="text-zyra-gold font-medium hover:underline">
            press@zyra-fashion.in
          </a>
        </div>
      </div>
    </div>
  );
}
