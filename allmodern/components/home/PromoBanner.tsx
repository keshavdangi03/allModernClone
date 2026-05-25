import { getHeaderSettings } from "@/lib/actions/settings";

const DEFAULTS = {
  promoBarText: "Up to 60% Off | 48-Hour Markdowns",
  promoBarLink: "/sale",
};

export default async function PromoBanner() {
  const dbSettings = await getHeaderSettings();
  const promo = {
    promoBarText: dbSettings?.promoBarText || DEFAULTS.promoBarText,
    promoBarLink: dbSettings?.promoBarLink || DEFAULTS.promoBarLink,
  };

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
