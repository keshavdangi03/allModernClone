

import Hero from "@/components/home/Hero";
import ShopByDepartment from "@/components/home/ShopByDepartment";
import OneStopOutdoorShop from "@/components/home/OneStopOutdoorShop";
import SimpleSummerRefreshes from "@/components/home/SimpleSummerRefreshes";
import NewArrivals from "@/components/home/NewArrivals";
import DesignDrop from "@/components/home/DesignDrop";
import ExploreCollections from "@/components/home/ExploreCollections";
import SaleBanner from "@/components/home/SaleBanner";
import RealLife from "@/components/home/RealLife";


export default function Home() {
  return (
    <>

      <main className="flex-1 bg-white">
        {/* Promotional Banner */}
        <section className="bg-[#ea3e15] text-white">
          <div className="mx-auto flex max-w-[1400px] flex-col md:flex-row items-center justify-between px-4 py-4 text-center sm:px-6 md:text-left">
            <span className="text-[22px] sm:text-[34px] font-bold tracking-tight">Up to 60% Off | 48-Hour Markdowns</span>
            <a href="#" className="text-[14px] sm:text-[16px] font-bold uppercase tracking-wide text-white underline underline-offset-4 mt-2 md:mt-0 hover:opacity-80 transition-opacity">
              SHOP NOW
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


    </>
  );
}
