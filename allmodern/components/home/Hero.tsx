"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [heroData, setHeroData] = useState<any[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("allmodern_hero_banners");
    if (saved) {
      try { setHeroData(JSON.parse(saved)); } catch {}
    }
    setLoaded(true);
    const onStorage = () => {
      const s = localStorage.getItem("allmodern_hero_banners");
      if (s) try { setHeroData(JSON.parse(s)); } catch {}
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // Use first banner or fallback
  const banner = heroData[0];
  const image = banner?.image || "/images/hero.png";
  const title = banner?.title || "Designed for Staycations";
  const subtitle = banner?.subtitle || "";
  const ctaText = banner?.ctaText || "Shop Now";
  const ctaLink = banner?.ctaLink || "#";

  return (
    <section className="relative overflow-hidden bg-[#ebeade]">
      <div className="relative h-[400px] sm:h-[500px] lg:h-[650px]">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-end pb-16 sm:pb-24 lg:pb-32 gap-4">
        <h1 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-[-0.01em] leading-[1] text-white drop-shadow-md text-center px-4">
          {title}
        </h1>
        {subtitle && (
          <p className="text-[clamp(1rem,2vw,1.5rem)] text-white/90 drop-shadow text-center px-4 max-w-2xl">{subtitle}</p>
        )}
        {banner && (
          <a href={ctaLink} className="mt-2 inline-block bg-white text-slate-900 px-8 py-3 font-bold text-sm tracking-wide hover:bg-slate-100 transition">
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
}

