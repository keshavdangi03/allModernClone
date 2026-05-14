import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ArrowRight, ChevronRight } from "lucide-react";

const collectionsData = [
  {
    id: "faris",
    title: "Faris\nCollection",
    mainImage: "/images/hero.png",
    secondaryImage: "/images/cat_living_room.png",
    productsText: null,
    productsTitle: null,
    products: []
  }
];

export default function LightingCollectionsPage() {
  return (
    <>
      <main className="bg-white">
        {/* Special Hero Section */}
        <section className="bg-white pt-14 pb-16 px-4 border-b border-[#e5e5e5]">
          <div className="mx-auto max-w-[1400px]">
            <h1 className="text-[52px] md:text-[76px] font-bold text-[#1f1d24] leading-[1.05] tracking-tight mb-4">
              Modern Lighting Collections
            </h1>
            <p className="text-[24px] md:text-[32px] text-[#4b4b4b] max-w-[1000px] leading-[1.3] font-medium tracking-tight">
              Lighten up – our experts brought you the best of lighting so you can design with ease.
            </p>
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
