"use client";
import { brandStrip } from "@/data/testimonials";

export default function AnnouncementBar() {
  const loop = [...brandStrip, ...brandStrip];
  return (
    <div className="bg-zyra-black text-white text-xs overflow-hidden whitespace-nowrap select-none">
      <div className="flex gap-16 py-2 animate-marquee w-max">
        {loop.map((t, i) => (
          <span key={i} className="tracking-wider font-medium opacity-90">
            ✦ {t}
          </span>
        ))}
      </div>
    </div>
  );
}
