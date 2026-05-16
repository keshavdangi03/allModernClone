"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";

const DEFAULT_TESTIMONIALS = [
  { id: "1", name: "Sarah M.", designation: "Verified Buyer", rating: 5, comment: "Absolutely love my new sofa! The quality is exceptional and it arrived faster than expected. The modern design fits perfectly in my living room.", image: "/images/cat_living_room.png" },
  { id: "2", name: "James K.", designation: "Verified Buyer", rating: 5, comment: "Great experience from start to finish. The furniture is well-made and the delivery team was professional. Will definitely shop here again.", image: "/images/cat_bedroom.png" },
  { id: "3", name: "Emily R.", designation: "Verified Buyer", rating: 4, comment: "Beautiful dining set that looks even better in person. Assembly was straightforward and the instructions were clear.", image: "/images/cat_dining.png" },
];

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState(DEFAULT_TESTIMONIALS);

  useEffect(() => {
    const load = () => {
      const s = localStorage.getItem("allmodern_testimonials");
      if (s) { try { setTestimonials(JSON.parse(s)); } catch {} }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  if (!testimonials.length) return null;

  return (
    <section className="bg-[#f8f7f5] py-14 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <h2 className="text-center text-[clamp(1.5rem,3vw,2.25rem)] font-bold tracking-tight text-slate-950 mb-10">
          What Our Customers Say
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((t) => (
            <div key={t.id} className="bg-white rounded-2xl p-6 shadow-sm flex flex-col gap-4">
              {/* Stars */}
              <div className="flex gap-0.5">
                {[1,2,3,4,5].map(i => (
                  <Star key={i} size={14} className={i <= t.rating ? "fill-amber-400 text-amber-400" : "fill-gray-200 text-gray-200"} />
                ))}
              </div>
              {/* Comment */}
              <p className="text-slate-700 text-[14px] leading-6 flex-1">&ldquo;{t.comment}&rdquo;</p>
              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-slate-100">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 relative shrink-0">
                  {t.image ? (
                    <Image src={t.image} alt={t.name} fill className="object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-500 font-bold text-sm">{t.name[0]}</div>
                  )}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-900">{t.name}</p>
                  <p className="text-[11px] text-slate-500">{t.designation}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
