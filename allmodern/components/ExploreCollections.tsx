import Image from "next/image";
import Link from "next/link";

const collections = [
  {
    title: "Durable Outdoor\nSofas",
    shopLink: "Shop Emery Collection",
    image: "/images/cat_outdoor.png",
  },
  {
    title: "Oak Storage\n+ More",
    shopLink: "Shop Karsten Collection",
    image: "/images/cat_bedroom.png", // using bedroom or living room as placeholder for cabinet
  },
  {
    title: "Modular\nSofas",
    shopLink: "Shop Morrell Collection",
    image: "/images/cat_living_room.png",
  },
];

export default function ExploreCollections() {
  return (
    <section className="bg-white py-12 sm:py-20">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-[28px] sm:text-[34px] font-bold tracking-tight text-slate-950">
            Explore Top-Rated Collections
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {collections.map((collection, idx) => (
            <Link key={idx} href="#" className="group block">
              <div className="relative aspect-[4/5] overflow-hidden bg-[#f4f4f4] mb-3">
                <Image
                  src={collection.image}
                  alt={collection.title.replace('\n', ' ')}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-black/5" />
                <div className="absolute top-0 left-0 p-6 sm:p-8">
                  <h3 className="text-[26px] sm:text-[32px] font-bold leading-[1.1] text-white drop-shadow-sm whitespace-pre-line">
                    {collection.title}
                  </h3>
                </div>
              </div>
              <h4 className="text-[15px] font-bold text-slate-950">
                {collection.shopLink}
              </h4>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
