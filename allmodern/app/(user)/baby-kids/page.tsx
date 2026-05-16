import Image from "next/image";
import FilterableProductLayout from "@/components/ui/FilterableProductLayout";




const babyCategories = [
  "Baby Furniture",
  "Changing Tables + Toppers",
  "Crib Bedding + Mattresses",
  "Kids Furniture",
  "Baby + Kids Rugs",
];

const productNames = [
  "Sealy Baby Premium Firm Hypoallergenic Crib Mattress",
  "Grace Premium Crib and Toddler Bed Mattress",
  "Horizon 6 Drawer Double Dresser",
  "Porto Twin Bed",
  "Amadi Two Tone Wicker Basket with Handles",
  "Piper Swivel Reclining Glider",
  "Brise 3 in 1 Convertible Crib",
  "Solid Wood Upholstered Panel Bed with Rectangular Headboard",
  "Santos 2-Drawer Nightstand",
  "Cardou Solid Hardwood Twin-over-Twin Bunk Bed",
  "Arlo Recliner and Swivel Glider",
  "Colby 4-in-1 Convertible Crib with Storage",
];

const relatedSearches = [
  "Crib Sheets",
  "Cribs",
  "Nursery Furniture Sets",
  "Toddler Bed Rails",
  "Round Baby Cribs",
  "Cradle + Bassinet Bedding",
  "Kids Decor + Playroom",
  "Baby Blankets",
  "Crib Bedding + Mattresses",
  "Changing Tables",
  "Gliders",
  "Crib Mattresses",
  "White Cribs",
  "Swivel Rocker Chairs",
  "Small Swivel Rockers",
  "Baby Changing Table Dressers",
];

export default function BabyKidsPage() {
  return (
    <>

      <main className="bg-[#f3f3f3] pb-12">
        <section className="mx-auto max-w-[1400px] px-4 pb-8 pt-4 sm:px-6">
          <div className="relative overflow-hidden bg-slate-200">
            <div className="relative h-[340px] md:h-[420px]">
              <Image src="/images/cat_bedroom.png" alt="Baby + Kids" fill className="object-cover" priority />
            </div>
            <div className="absolute inset-0 bg-black/10" />
            <h1 className="absolute inset-x-0 top-1/2 -translate-y-1/2 text-center text-5xl font-bold text-white md:text-7xl">
              Baby + Kids
            </h1>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-5">
            {babyCategories.map((category, idx) => (
              <a key={category} href="#" className="block bg-white">
                <div className="relative aspect-[1.45/1] bg-slate-200">
                  <Image
                    src={idx % 2 === 0 ? "/images/cat_bedroom.png" : "/images/cat_living_room.png"}
                    alt={category}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="py-1 text-center text-[12px] text-slate-700">{category}</p>
              </a>
            ))}
          </div>

          <FilterableProductLayout title="Baby + Kids" itemCount={547} products={[]} categoryName="Baby + Kids"></FilterableProductLayout>

          <section className="mt-10 bg-[#f3f3f3] text-slate-800">
            <h3 className="text-[34px] font-bold tracking-[-0.02em]">Baby + Kids</h3>
            <p className="mt-3 max-w-[1250px] text-[13px] leading-6">
              Design a fun, creative room with modern baby & kids furniture pieces. From contemporary cribs to bunk
              beds, choose from hundreds of different colors and styles that help create the ultimate modern baby &
              kids bedroom. Bookcases, rocking chairs and even dressers can all help organize the space while showing
              your own personal style.
            </p>
            <div className="mt-7 space-y-8">
              <div>
                <h4 className="text-[16px] font-semibold">Modern Nursery Furniture</h4>
                <p className="mt-2 text-[13px] leading-6 text-slate-700">
                  Preparing for a new baby is an exciting process, and decorating your modern nursery is one of the
                  best parts. From cribs to changing tables, there are a ton of options to choose from when deciding
                  your baby&apos;s furniture.
                </p>
              </div>
              <div>
                <h4 className="text-[16px] font-semibold">Modern Kids Bedroom Furniture</h4>
                <p className="mt-2 text-[13px] leading-6 text-slate-700">
                  Design a fun and colorful space with modern kids bedroom furniture. Whether your child is graduating
                  from toddler furniture or you&apos;re just looking to upgrade the space, discover bunk beds, dressers
                  and bookcases that suit your style.
                </p>
              </div>
              <div>
                <h4 className="text-[16px] font-semibold">Modern Playroom and Storage</h4>
                <p className="mt-2 text-[13px] leading-6 text-slate-700">
                  One way to add colorful and creative accents to the design of your nursery or kids bedroom is with
                  modern playroom and storage furniture. From toy boxes and organizers to playhouses and teepees, these
                  pieces add personality to your modern nursery or kids bedroom.
                </p>
              </div>
            </div>
          </section>

          <section className="mt-8">
            <h4 className="text-[30px] font-bold tracking-[-0.02em] text-slate-900">Related Searches</h4>
            <div className="mt-3 flex flex-wrap gap-2">
              {relatedSearches.map((item) => (
                <a key={item} href="#" className="rounded-full border border-slate-400 bg-white px-3 py-1.5 text-[12px] text-slate-700">
                  {item}
                </a>
              ))}
            </div>
          </section>
        </section>
      </main>


    </>
  );
}
