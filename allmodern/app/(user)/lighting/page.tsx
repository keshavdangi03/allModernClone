import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart } from "lucide-react";
import Header from "@/components/layout/Header";
import FilterableProductLayout from "@/components/ui/FilterableProductLayout";
import Footer from "@/components/layout/Footer";
import HelpChat from "@/components/layout/HelpChat";

const topCategories = [
  { title: "Ceiling Lights", image: "/images/cat_living_room.png" },
  { title: "Wall Lights", image: "/images/cat_dining.png" },
  { title: "Table + Floor Lamps", image: "/images/cat_bedroom.png" },
  { title: "Outdoor Lighting", image: "/images/cat_outdoor.png" },
  { title: "LED Lighting", image: "/images/hero.png" },
];

const mainGridProducts = [
  { id: "mg1", name: "Mendel 60\" Floor Lamp", subtitle: "Black/Brass", price: 145, originalPrice: 180, extraText: "Free Fast Delivery", reviews: 124, rating: 4.5, badge: "Sale", image: "/images/cat_living_room.png" },
  { id: "mg2", name: "Aedan 1-Light Dimmable Wall Sconce", subtitle: "Brass", price: 85, originalPrice: null, extraText: "Free 3-Day Delivery", reviews: 89, rating: 5, badge: null, image: "/images/cat_dining.png" },
  { id: "mg3", name: "Ove 2-Light Dimmable Vanity Light", subtitle: "Brass/Frosted Glass", price: 120, originalPrice: 150, extraText: "Free Fast Delivery", reviews: 210, rating: 4.5, badge: "Limited Time Only", image: "/images/cat_bedroom.png" },
  { id: "mg4", name: "Rooks 2-Light Dimmable Vanity Light", subtitle: "White, Midnight Black", price: 108, originalPrice: null, extraText: "Free 3-Day Delivery", reviews: 692, rating: 4.5, badge: null, image: "/images/cat_outdoor.png", colors: ["#fff", "#000"] },
  { id: "mg5", name: "Rooks 3-Light Dimmable Vanity Light", subtitle: "Satin Brass, Clear", price: 162, originalPrice: null, extraText: "Free 3-Day Delivery", reviews: 785, rating: 4.5, badge: null, image: "/images/hero.png", colors: ["#c5b358", "#ccc"] },
  { id: "mg6", name: "Childerley 2 Light Vanity", subtitle: "Clear, Satin Brass", price: 108, originalPrice: null, extraText: "Free Fast Delivery", reviews: 452, rating: 4.5, badge: null, image: "/images/cat_living_room.png", colors: ["#c5b358", "#000"] },
  { id: "mg7", name: "Lyle 60 Watt Dimmable Clear Bulb\n(Set of 3)", subtitle: null, price: 40, originalPrice: null, extraText: "$13.33 per item", reviews: 3041, rating: 4.5, badge: null, image: "/images/cat_dining.png" },
  { id: "mg8", name: "Emersynn 78.7\" Arched/Arc Floor Lamp with Remote Control, LED Bulb Included, and Metal Shade", subtitle: "Black", price: 103, originalPrice: 108, extraText: "Free Fast Delivery\nQuickview", reviews: 377, rating: 4.5, badge: "Sale", image: "/images/cat_bedroom.png", colors: ["#000", "#fff"] },
  { id: "mg9", name: "Dedmon Single Light Bell Outdoor Wall Light", subtitle: "No, Black", price: 48, originalPrice: 62, extraText: "Free Fast Delivery", reviews: 422, rating: 4.5, badge: "Limited Time Only", image: "/images/cat_outdoor.png", colors: ["#000", "#333"] },
  { id: "mg10", name: "9.45\" H All Iron Frame Rattan Lantern With Hemp Rope Handle", subtitle: "Natural", price: 30, originalPrice: 35, extraText: "3-Day Delivery", reviews: 26, rating: 4.5, badge: null, image: "/images/hero.png", colorCount: 2 },
  { id: "mg11", name: "Childerley 1 - Light 10\" Simple Globe Semi Flush Mount", subtitle: "Satin Brass", price: 74, originalPrice: null, extraText: "Free Fast Delivery", reviews: 95, rating: 4.5, badge: null, image: "/images/cat_living_room.png", colors: ["#c5b358", "#000"] },
  { id: "mg12", name: "Boyes Ceramic Table Lamp", subtitle: "Rust", price: 139, originalPrice: 175, extraText: "Free Fast Delivery", reviews: 104, rating: 4.5, badge: "Limited Time Only", image: "/images/cat_dining.png", colorCount: 3 },
];

function StarRating({ rating }: { rating: number }) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  return (
    <div className="flex text-black text-[10px]">
      {[...Array(fullStars)].map((_, i) => <span key={`full-${i}`}>★</span>)}
      {hasHalfStar && <span>★</span>}
      {[...Array(emptyStars)].map((_, i) => <span key={`empty-${i}`} className="text-slate-300">★</span>)}
    </div>
  );
}

export default function LightingPage() {
  return (
    <>
      <main className="bg-white">

        {/* Hero Section */}
        <section className="relative h-[250px] w-full sm:h-[350px] md:h-[450px]">
          <Image src="/images/hero.png" alt="Lighting" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white drop-shadow-md sm:text-5xl md:text-[80px]">
              Lighting
            </h1>
          </div>
        </section>

        {/* Top Category Tiles */}
        <section className="mx-auto max-w-[1400px] px-4 pt-10 sm:px-6">
          <div className="flex justify-between gap-4 overflow-x-auto pb-4">
            {topCategories.map((cat) => (
              <Link key={cat.title} href="#" className="group flex min-w-[140px] flex-1 flex-col items-center">
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100 mb-3">
                  <Image src={cat.image} alt={cat.title} fill className="object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <p className="text-center text-[13px] font-medium text-slate-900 group-hover:underline">
                  {cat.title}
                </p>
              </Link>
            ))}
            <button className="flex h-10 w-10 shrink-0 self-center items-center justify-center border border-slate-300 bg-white hover:bg-slate-50">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>
        </section>

        {/* MAIN CATEGORY SECTION: Lighting */}
        <FilterableProductLayout title="Lighting" itemCount={2212}>

          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:gap-x-6 lg:gap-y-12">
            {mainGridProducts.map((p) => (
              <div key={p.id} className="group relative flex flex-col">
                <div className="relative aspect-square w-full overflow-hidden bg-[#f4f4f4]">
                  <Image src={p.image || "/images/hero.png"} alt={p.name} fill className="object-cover mix-blend-multiply" />
                  <button className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-slate-600 shadow-sm backdrop-blur-sm hover:text-slate-950 hover:bg-white">
                    <Heart className="h-4 w-4" />
                  </button>
                  {p.badge && (
                    <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white z-10">
                      {p.badge}
                    </div>
                  )}
                </div>

                <div className="mt-3 flex flex-1 flex-col">
                  {p.colors && (
                    <div className="mb-1.5 flex items-center gap-1">
                      {p.colors.map((color, idx) => (
                        <div key={idx} className="h-[15px] w-[15px] rounded-full border border-slate-300" style={{ backgroundColor: color }}></div>
                      ))}

                    </div>
                  )}
                  <h3 className="mt-0.5 text-[13px] leading-tight text-slate-900 group-hover:underline whitespace-pre-line">
                    {p.name}
                  </h3>
                  {p.subtitle && <div className="text-[12px] text-slate-500 mt-0.5">{p.subtitle}</div>}
                  {p.rating && (
                    <div className="mt-1 flex items-center gap-1">
                      <StarRating rating={p.rating} />
                      <span className="text-[11px] text-slate-500">({p.reviews || 0})</span>
                    </div>
                  )}
                  <div className="mt-1 flex flex-wrap items-baseline gap-2">
                    <span className="text-[15px] font-bold text-[#a63f15]">${p.price}</span>
                    {p.originalPrice && (
                      <span className="text-[12px] text-slate-500 line-through">${p.originalPrice}</span>
                    )}
                  </div>
                  {p.extraText && (
                    <div className="mt-1 text-[11px] text-slate-600 whitespace-pre-line leading-tight">
                      {p.extraText}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-16 flex items-center justify-center gap-3">
            <button className="flex h-10 w-10 items-center justify-center border border-slate-300 bg-white text-slate-400 hover:bg-slate-50" aria-label="Previous page">
              <svg className="h-4 w-4 rotate-180" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
            <div className="flex items-center gap-4 text-[13px] text-slate-700">
              <span className="font-bold underline underline-offset-4">1</span>
              <button className="hover:underline">2</button>
              <button className="hover:underline">3</button>
              <button className="hover:underline">4</button>
              <span>...</span>
              <button className="hover:underline">10</button>
            </div>
            <button className="flex h-10 w-10 items-center justify-center border border-slate-900 bg-white text-slate-900 hover:bg-slate-50" aria-label="Next page">
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

        </FilterableProductLayout>

        {/* SEO Text */}
        <section className="mx-auto max-w-[1400px] px-4 pb-20 pt-8 sm:px-6">
          <h2 className="mb-4 text-xl font-bold text-slate-950">Modern & Contemporary Lighting</h2>
          <div className="space-y-4 text-[13px] leading-relaxed text-slate-700">
            <p>
              Every home needs lighting options for different times of the day. The best lighting gives you the ability to change the intensity based on the mood you want to cultivate in your home. If you&apos;re passionate about modern d&eacute;cor, then chances are that you&apos;ll also want to find modern &amp; contemporary lighting for your entire home. There is a variety of contemporary lights, including room lighting, lighting fixtures, and location lighting. Modern &amp; contemporary lighting has features that are characteristic of modern design, including clean, geometric lines and perfectly shaped circles and ovals. The best modern &amp; contemporary lighting enhances the rest of your d&eacute;cor and helps you establish a cohesive look across your home.
            </p>
            <p>
              Modern &amp; contemporary lighting best for a bedroom ranges from ceiling lights to lamps for your bedside tables. Your bedroom most likely needs different lighting sources depending on the time of day. In the morning, most people get ready for the day in their bedrooms. Having a proper ceiling light like a flush mount or a ceiling fan, will provide the perfect amount of light so you&apos;re not stuck getting dressed in the dark. At the end of the day, however, chances are you&apos;ll want to read or relax before bed. You can incorporate modern bedside lamps to provide dim lighting that won&apos;t strain your eyes before bed, allowing for a good night&apos;s sleep. If you want to create a dramatic and decorative statement in your bedroom, then modern wall sconces might be the perfect addition.
            </p>
            <p>
              Aside from bedroom lighting, you&apos;ll also want to make sure that you have appropriate lighting for your dining room and kitchen. Modern &amp; contemporary lighting best suited for the kitchen ranges from track lighting to recessed lighting. The best modern kitchen light fixtures emit enough light so that you can see the food you&apos;re preparing, and cook it to perfection. Modern pendant light fixtures are popular in homes where the kitchen gracefully spills into the dining area. Try adding some pendants above your kitchen island to add some flair into your open-concept kitchen, and hang a sputnik chandelier above your dining room table for a bold and modern look. This will make for the perfect space for you to relax and pop open a bottle of wine with your guests.
            </p>
          </div>
        </section>

        {/* Related Searches */}
        <section className="mx-auto max-w-[1400px] px-4 pb-20 pt-8 sm:px-6">
          <p className="mb-4 text-[13px] font-bold text-slate-950">Your modern and contemporary lighting choices are not limited to the indoors. Shop our modern outdoor lighting fixtures to bring a modern curb appeal to your home. Incorporate a wall sconce by your main entrance to add some much needed light to the night. Doing this will complete your cohesive modern look, that is sure to impress your friends.</p>
          <Link href="#" className="text-[13px] font-bold text-slate-900 underline hover:text-slate-600 block mb-8">Read Less</Link>

          <h3 className="text-[19px] font-bold text-slate-950 mb-4">Related Searches</h3>
          <div className="flex flex-wrap gap-2.5">
            {["Outdoor Wall Lights", "Chandeliers", "Table Lamps", "Outdoor Lighting", "Floor Lamps", "Flush Mount Lighting", "Battery Powered Floor Lamps", "Ceiling Lights", "Vanity Lighting", "Wall Sconces", "Wall Lights", "Outdoor Hanging Lights", "Pendant Lighting", "Table + Floor Lamps", "Modern Touch Lamps", "Light Bulbs", "Modern Ceiling Fans", "String Lights", "Battery Powered Wall Sconces", "Outdoor Lanterns"].map((term) => (
              <Link key={term} href="#" className="rounded-full border border-slate-300 bg-white px-4 py-1.5 text-[12px] text-slate-700 hover:border-slate-900 hover:text-slate-900 transition">
                {term}
              </Link>
            ))}
          </div>
        </section>

      </main>
      <Footer />
      <HelpChat />
    </>
  );
}
