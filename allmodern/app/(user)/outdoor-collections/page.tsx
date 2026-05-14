import Image from "next/image";
import Link from "next/link";
import { ChevronUp, ArrowRight, ChevronRight } from "lucide-react";


const collectionsData = [
  {
    id: "ari",
    title: "Ari\nCollection",
    mainImage: "/images/cat_living_room.png",
    secondaryImage: "/images/cat_outdoor.png",
    productsText: null,
    productsTitle: null,
    products: [
      { id: "ari-1", name: "Ari 4-Piece Outdoor Rounded Aluminum\nSeating Group", price: "1,057", originalPrice: "1,850", badge: "Limited Time Only", image: "/images/cat_living_room.png" },
      { id: "ari-2", name: "Ari 47\" Aluminum Outdoor Coffee Table", price: "199", originalPrice: "399", badge: "Limited Time Only", image: "/images/cat_dining.png" },
      { id: "ari-3", name: "Ari 4-Piece Outdoor Rounded Aluminum\nSeating Group", price: "4,318", originalPrice: "4,999", badge: "Sale", image: "/images/cat_bedroom.png" }
    ]
  },
  {
    id: "emmett",
    title: "Emmett\nCollection",
    mainImage: "/images/cat_outdoor.png",
    secondaryImage: "/images/cat_living_room.png",
    productsText: null,
    productsTitle: null,
    products: [
      { id: "emmett-1", name: "Emmett 83\" Eucalyptus Outdoor Sofa", price: "1,199", originalPrice: "1,799", badge: "Limited Time Only", image: "/images/cat_living_room.png" },
      { id: "emmett-2", name: "Emmett Eucalyptus Outdoor 4 Piece Lounge\nSet", price: "2,599", originalPrice: "3,799", badge: "Limited Time Only", image: "/images/cat_bedroom.png" },
      { id: "emmett-3", name: "Emmett 48\" Eucalyptus Patio Coffee Table", price: "209", originalPrice: "319", badge: "Limited Time Only", image: "/images/cat_outdoor.png" },
      { id: "emmett-4", name: "Emmett Eucalyptus Outdoor Lounge Chair", price: "549", originalPrice: "949", badge: "Limited Time Only", image: "/images/cat_dining.png" },
      { id: "emmett-5", name: "Emmett Eucalyptus Outdoor Lounge Chairs\n(Set of 2)", price: "899", originalPrice: "1,899", badge: "Limited Time Only", image: "/images/hero.png" },
    ]
  },
  {
    id: "lanie",
    title: "Lanie\nCollection",
    mainImage: "/images/hero.png",
    secondaryImage: "/images/cat_dining.png",
    productsText: "Durable eucalyptus + weather-resistant cushions add mid-century style to outdoor days.",
    productsTitle: null,
    products: [
      { id: "lanie-1", name: "Lanie 53\" Eucalyptus Outdoor Loveseat", price: "699", originalPrice: "899", badge: null, image: "/images/cat_living_room.png" },
      { id: "lanie-2", name: "Lanie Eucalyptus Patio Chair With Cushion -\nSet Of 2", price: "398", originalPrice: "1,098", badge: null, image: "/images/cat_bedroom.png" },
      { id: "lanie-3", name: "Lanie Eucalyptus Patio Chair with Cushion", price: "429", originalPrice: "549", badge: null, image: "/images/cat_outdoor.png" },
      { id: "lanie-4", name: "Lanie Eucalyptus Outdoor Sofa Set", price: "1,676", originalPrice: "2,699", badge: null, image: "/images/cat_dining.png" },
      { id: "lanie-5", name: "Lanie 39\" Eucalyptus Outdoor Coffee Table", price: "579", originalPrice: "799", badge: null, image: "/images/hero.png" },
    ]
  },
  {
    id: "polywood",
    title: "POLYWOOD®\nCollection",
    mainImage: "/images/cat_dining.png",
    secondaryImage: "/images/cat_bedroom.png",
    productsTitle: "The POLYWOOD® Collection",
    productsText: "Give recycled materials new life with our exclusive collection of weather-resistant design.",
    products: [
      { id: "poly-1", name: "POLYWOOD x AllModern Folding Plastic\nAdirondack Chair", price: "279", originalPrice: "309", badge: null, image: "/images/cat_outdoor.png" },
      { id: "poly-2", name: "POLYWOOD x AllModern Oversized Plastic\nAdirondack Chair", price: "312", originalPrice: "344", badge: null, image: "/images/cat_living_room.png" },
      { id: "poly-3", name: "POLYWOOD x AllModern Plastic Adirondack\nChair", price: "269", originalPrice: "299", badge: null, image: "/images/cat_bedroom.png" },
      { id: "poly-4", name: "Modern Adirondack Rocker", price: "489", originalPrice: null, badge: null, image: "/images/cat_dining.png" },
      { id: "poly-5", name: "POLYWOOD Captain Chaise", price: "789", originalPrice: null, badge: null, image: "/images/hero.png" },
    ]
  },
  {
    id: "farrah",
    title: "Farrah\nCollection",
    mainImage: "/images/cat_living_room.png",
    secondaryImage: "/images/cat_outdoor.png",
    productsTitle: null,
    productsText: null,
    products: [
      { id: "farrah-1", name: "Farrah Outdoor Stacking Dining Side Chair\n(Set of 2)", price: "229", originalPrice: "399", extraText: "$114.50 per item", badge: "Limited Time Only", image: "/images/cat_living_room.png" },
      { id: "farrah-2", name: "Farrah Stacking Patio Dining Side Chair\n(Set of 2)", price: "279", originalPrice: "369", extraText: "$139.50 per item", badge: "Limited Time Only", image: "/images/cat_bedroom.png" },
      { id: "farrah-3", name: "Farrah Stacking Patio Dining Side Chair\n(Set of 2)", price: "239", originalPrice: "399", extraText: "$119.50 per item", badge: "Sale", image: "/images/cat_outdoor.png" },
      { id: "farrah-4", name: "Farrah Premium All-Weather Outdoor\nStacking Dining Armchair\n(Set of 2)", price: "369", originalPrice: "399", extraText: "$184.50 per item", badge: "Limited Time Only", image: "/images/cat_dining.png" },
      { id: "farrah-5", name: "Farrah Outdoor Stacking Dining Side Chair\n(Set of 2)", price: "319", originalPrice: "349", extraText: "$159.50 per item", badge: "Limited Time Only", image: "/images/hero.png" },
    ]
  },
  {
    id: "kaly",
    title: "Kaly\nCollection",
    mainImage: "/images/cat_bedroom.png",
    secondaryImage: "/images/cat_living_room.png",
    productsTitle: "The Kaly Collection",
    productsText: "Plush cushions + a weather-resistant finish elevate sun-soaked lounging.",
    products: [
      { id: "kaly-1", name: "Kaly Aluminum Outdoor Lounge Chair", price: "1,547", originalPrice: null, badge: null, image: "/images/cat_outdoor.png" },
      { id: "kaly-2", name: "Kaly 90.6\" Wide Curved Patio Sofa with\nCushions", price: "2,598", originalPrice: "2,738", badge: null, image: "/images/cat_dining.png" },
      { id: "kaly-3", name: "Kaly 90.6\" Wide Curved Aluminum Patio\nSofa with Cushions", price: "2,762", originalPrice: "3,699", badge: null, image: "/images/cat_bedroom.png" },
    ]
  },
  {
    id: "aden",
    title: "Aden\nCollection",
    mainImage: "/images/hero.png",
    secondaryImage: "/images/cat_outdoor.png",
    productsTitle: null,
    productsText: null,
    products: []
  },
  {
    id: "louise",
    title: "Louise\nCollection",
    mainImage: "/images/cat_outdoor.png",
    secondaryImage: "/images/cat_living_room.png",
    productsTitle: null,
    productsText: null,
    products: [
      { id: "louise-1", name: "Louise Acacia Outdoor Armless Lounge\nChair", price: "309", originalPrice: "399", badge: "Limited Time Only", image: "/images/cat_living_room.png" },
      { id: "louise-2", name: "Louise 39.5\" Outdoor Coffee Table", price: "189", originalPrice: "249", badge: "Sale", image: "/images/cat_bedroom.png" },
      { id: "louise-3", name: "Louise Acacia Outdoor Armless Lounge\nChair\n(Set of 2)", price: "729", originalPrice: "849", extraText: "$364.50 per item", badge: "Limited Time Only", image: "/images/cat_outdoor.png" },
      { id: "louise-4", name: "Louise Acacia 4 - Person Patio Conversation\nSet with Cushions", price: "1,206", originalPrice: "1,399", badge: "Limited Time Only", image: "/images/cat_dining.png" },
      { id: "louise-5", name: "Louise 43\" Wide Loveseat with Cushions", price: "399", originalPrice: "449", badge: "Limited Time Only", image: "/images/hero.png" },
    ]
  }
];

export default function OutdoorCollectionsPage() {
  return (
    <>
      <main className="bg-white">
        {/* Hero Section */}
        <section className="bg-[#FAF9F6] pt-14 pb-16 px-4 border-b border-[#e5e5e5]">
          <div className="mx-auto max-w-[1400px] text-center">
            <h1 className="text-[44px] md:text-[56px] font-bold text-[#1f1d24] mb-3 tracking-[-0.02em] leading-tight">
              Modern Outdoor Design Made Simple
            </h1>
            <p className="text-[20px] md:text-[24px] text-[#423f4a] max-w-4xl mx-auto font-light tracking-[-0.01em] leading-snug">
              Go on + soak in the sun – our experts curated the best of outdoor<br className="hidden md:block" />
              so you can design with ease.
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

                {/* Collection Products */}
                {collection.products.length > 0 && (
                  <div id={`shop-${collection.id}`} className="px-4 md:px-0">
                    <div className="mb-4">
                      {collection.productsTitle && (
                        <h3 className="text-[17px] font-bold text-[#1f1d24] mb-1.5">{collection.productsTitle}</h3>
                      )}
                      {collection.productsText && (
                        <p className="text-[14px] text-[#423f4a] mb-2">{collection.productsText}</p>
                      )}
                      {(collection.productsTitle || collection.productsText) && (
                        <div className="mb-6">
                          <Link href="#" className="text-[13px] text-[#423f4a] underline underline-offset-4 hover:text-[#1f1d24] transition">
                            Shop the Collection
                          </Link>
                        </div>
                      )}
                    </div>

                    <div className="relative group/slider">
                      <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        {collection.products.map((p) => (
                          <div key={p.id} className="group relative flex flex-col min-w-[210px] w-[210px] md:min-w-[250px] md:w-[250px] shrink-0 snap-start">
                            <div className="relative aspect-square w-full bg-[#f4f4f4] mb-3 overflow-hidden cursor-pointer">
                              <Image src={p.image} alt={p.name.replace('\n', ' ')} fill className="object-cover mix-blend-multiply transition duration-500 group-hover:scale-[1.03]" />
                              {p.badge && (
                                <div className="absolute bottom-0 left-0 bg-[#A63517] px-2 py-0.5 text-[11px] font-bold text-white z-10">
                                  {p.badge}
                                </div>
                              )}
                            </div>
                            <h4 className="text-[13px] leading-[1.3] text-[#1f1d24] group-hover:underline whitespace-pre-line cursor-pointer mb-1.5 font-medium">{p.name}</h4>
                            <div className="mt-auto flex flex-wrap items-baseline gap-1.5">
                              <span className="text-[13px] text-[#A63517] font-bold">${p.price}</span>
                              {p.originalPrice && <span className="text-[12px] text-[#717171] line-through">${p.originalPrice}</span>}
                            </div>
                            {(p as any).extraText && <span className="text-[12px] text-[#717171] mt-0.5">{(p as any).extraText}</span>}
                          </div>
                        ))}
                      </div>
                      
                      {/* Optional: Add a right scroll chevron (visible on hover) */}
                      <button className="absolute right-0 top-[35%] -translate-y-1/2 w-10 h-10 bg-white border border-[#c8ceda] shadow-md flex items-center justify-center opacity-0 group-hover/slider:opacity-100 transition hover:bg-[#f4f4f4]">
                         <ChevronRight className="w-6 h-6 text-[#1f1d24] stroke-[1.5]" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
