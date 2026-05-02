import Image from "next/image";




const saleCategories = [
  { title: "Furniture Sale", image: "/images/cat_living_room.png" },
  { title: "Decor Sale", image: "/images/cat_dining.png" },
  { title: "Lighting Sale", image: "/images/cat_bedroom.png" },
  { title: "Rug Sale", image: "/images/cat_living_room.png" },
  { title: "Outdoor Sale", image: "/images/cat_outdoor.png" },
  { title: "Bed + Bath Sale", image: "/images/cat_bedroom.png" },
  { title: "Home Renovation Sale", image: "/images/cat_dining.png" },
  { title: "Tabletop Sale", image: "/images/cat_outdoor.png" },
];

export default function SalePage() {
  return (
    <>

      <main className="bg-[#efefef] pb-10">
        <section className="mx-auto max-w-[1400px] px-4 pb-8 pt-4 sm:px-6">
          <div className="grid h-[180px] items-center bg-[#f13600] px-12 text-white md:grid-cols-2">
            <h1 className="text-[86px] font-black leading-none tracking-[-0.04em]">Sale</h1>
            <p className="text-right text-5xl font-light tracking-[-0.01em]">Modern&apos;s best for less</p>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-2 md:grid-cols-4">
            {saleCategories.map((item) => (
              <a key={item.title} href="#" className="block">
                <div className="relative aspect-[1.02/1] bg-slate-200">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="(max-width: 768px) 50vw, 25vw" />
                </div>
                <p className="pt-1 text-[30px] font-semibold text-slate-900">{item.title}</p>
              </a>
            ))}
          </div>

          <h2 className="mt-5 text-[44px] font-black tracking-[-0.02em] text-slate-900">Modern Designs, Lower Prices</h2>

          <div className="mt-2 grid gap-2 md:grid-cols-2">
            <a href="#" className="relative block overflow-hidden">
              <div className="relative aspect-[0.9/1]">
                <Image src="/images/cat_living_room.png" alt="All Sale" fill className="object-cover" sizes="50vw" />
              </div>
              <p className="absolute bottom-4 left-6 text-[72px] font-black leading-none tracking-[-0.03em] text-white">All Sale</p>
            </a>
            <a href="#" className="relative block overflow-hidden">
              <div className="relative aspect-[0.9/1]">
                <Image src="/images/cat_dining.png" alt="Top Rated" fill className="object-cover" sizes="50vw" />
              </div>
              <p className="absolute bottom-4 left-6 text-[72px] font-black leading-none tracking-[-0.03em] text-white">Top Rated</p>
            </a>
          </div>
        </section>
      </main>


    </>
  );
}
