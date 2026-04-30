import Header from "@/components/Header";
import HelpChat from "@/components/HelpChat";
import Hero from "@/components/Hero";
import ShopByDepartment from "@/components/ShopByDepartment";
import OneStopOutdoorShop from "@/components/OneStopOutdoorShop";
import SimpleSummerRefreshes from "@/components/SimpleSummerRefreshes";
import NewArrivals from "@/components/NewArrivals";
import DesignDrop from "@/components/DesignDrop";
import ExploreCollections from "@/components/ExploreCollections";
import SaleBanner from "@/components/SaleBanner";
import RealLife from "@/components/RealLife";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white">
        {/* Promotional Banner */}
        <section className="bg-[#1f228b] text-white">
          <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row items-center justify-between px-4 py-3 text-center sm:px-6 md:text-left">
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-4">
              <span className="text-[13px] sm:text-[15px] uppercase tracking-wide opacity-90">MODERN OUTDOOR SALE</span>
              <span className="text-[24px] sm:text-[32px] font-bold tracking-tight">Up to 30% Off</span>
            </div>
            <a href="#" className="text-[12px] sm:text-[14px] font-bold uppercase tracking-wide text-white underline underline-offset-4 mt-2 md:mt-0 hover:opacity-80 transition-opacity">
              SHOP OUTDOOR FURNITURE, DECOR + MORE
            </a>
          </div>
        </section>

        <Hero />
        <ShopByDepartment />
        <OneStopOutdoorShop />
        <SimpleSummerRefreshes />
        <NewArrivals />
        <DesignDrop />
        <ExploreCollections />
        <SaleBanner />
        <RealLife />
        
      </main>
      <HelpChat />
      <Footer />
    </>
  );
}
