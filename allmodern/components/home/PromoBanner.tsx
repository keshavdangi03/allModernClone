"use client";
import { useEffect, useState } from "react";

const DEFAULTS = {
  promoBarText: "Up to 60% Off | 48-Hour Markdowns",
  promoBarLink: "/sale",
};

export default function PromoBanner() {
  const [promo, setPromo] = useState(DEFAULTS);

  useEffect(() => {
    const load = () => {
      const s = localStorage.getItem("allmodern_header_settings");
      if (s) {
        try {
          const d = JSON.parse(s);
          setPromo({
            promoBarText: d.promoBarText || DEFAULTS.promoBarText,
            promoBarLink: d.promoBarLink || DEFAULTS.promoBarLink,
          });
        } catch {}
      }
    };
    load();
    window.addEventListener("storage", load);
    return () => window.removeEventListener("storage", load);
  }, []);

  return (
    <section className="bg-[#ea3e15] text-white">
      <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row items-center justify-between px-4 py-4 text-center sm:px-6 md:text-left">
        <span className="text-[22px] sm:text-[34px] font-bold tracking-tight">{promo.promoBarText}</span>
        <a
          href={promo.promoBarLink}
          className="text-[14px] sm:text-[16px] font-bold uppercase tracking-wide text-white underline underline-offset-4 mt-2 md:mt-0 hover:opacity-80 transition-opacity"
        >
          SHOP NOW
        </a>
      </div>
    </section>
  );
}
