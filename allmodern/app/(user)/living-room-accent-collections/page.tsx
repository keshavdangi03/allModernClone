import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ArrowRight, ChevronRight } from "lucide-react";

const collectionsData = [
  {
    id: "annora",
    title: "Annora\nCollection",
    mainImage: "/images/cat_living_room.png",
    secondaryImage: "/images/hero.png",
    productsText: null,
    productsTitle: null,
    products: []
  }
];

export default function LivingRoomAccentCollectionsPage() {
  return (
    <>
      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-white pt-14 pb-16 px-4 border-b border-[#e5e5e5]">
          <div className="mx-auto max-w-[1400px]">
            <div className="mb-2">
              <span className="text-[14px] md:text-[16px] font-bold text-[#1f1d24] uppercase tracking-wider">
                EXPERTLY CURATED:
              </span>
            </div>
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between">
              <h1 className="text-[52px] md:text-[76px] font-bold text-[#1f1d24] leading-[1.05] tracking-tight">
                Living Room Accent Collections
              </h1>
              <span className="text-[24px] md:text-[32px] font-bold text-[#1f1d24] mt-2 md:mt-0 tracking-tight">
                (Form + function.)
              </span>
            </div>
          </div>
        </section>

        {/* Collections */}
        <section className="mx-auto max-w-[1440px] px-0 md:px-6 py-12 md:py-16">
          <div className="flex flex-col gap-16 md:gap-24">
            {collectionsData.map((collection) => (
              <div key={collection.id} className="flex flex-col">
                
                {/* Collection Split Hero */}
                <div className="flex flex-col md:flex-row md:min-h-[500px] lg:min-h-[560px] overflow-hidden mb-6">
                  {/* Left Side (Image) */}
                  <div className="relative w-full md:w-[68%] h-[350px] md:h-auto group cursor-pointer overflow-hidden">
                    <Image src={collection.mainImage} alt={collection.title.replace('\n', ' ')} fill className="object-cover transition duration-700 group-hover:scale-[1.02]" />
                  </div>
                  {/* Right Side (Text & Secondary Image) */}
                  <div className="relative w-full md:w-[32%] bg-[#FAF9F6] p-8 md:px-10 md:py-12 flex flex-col justify-between items-start">
                    <h2 className="text-[42px] sm:text-[48px] lg:text-[54px] font-bold text-[#1f1d24] leading-[1.05] tracking-[-0.02em] whitespace-pre-line mb-8">
                      {collection.title}
                    </h2>
                    <div className="w-full flex flex-col gap-4 mt-auto">
                      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE8E4] group cursor-pointer">
                        <Image src={collection.secondaryImage} alt={`${collection.title.replace('\n', ' ')} detail`} fill className="object-cover transition duration-700 group-hover:scale-[1.03]" />
                        <button className="absolute bottom-3 right-3 w-8 h-8 bg-white border border-[#c8ceda] flex items-center justify-center text-[#1f1d24] hover:bg-[#f4f4f4] transition shadow-sm" aria-label="Expand">
                          <ChevronUp className="w-5 h-5 stroke-[1.5]" />
                        </button>
                      </div>
                      <Link href={`#shop-${collection.id}`} className="flex items-center justify-between w-full border border-[#1f1d24] bg-white py-3.5 px-5 text-[14px] font-bold text-[#1f1d24] transition hover:bg-[#1f1d24] hover:text-white uppercase tracking-[0.05em] group">
                        SHOP THE COLLECTION
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
