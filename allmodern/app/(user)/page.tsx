import Hero from "@/components/home/Hero";
import ShopByDepartment from "@/components/home/ShopByDepartment";
import OneStopOutdoorShop from "@/components/home/OneStopOutdoorShop";
import SimpleSummerRefreshes from "@/components/home/SimpleSummerRefreshes";
import NewArrivals from "@/components/home/NewArrivals";
import DesignDrop from "@/components/home/DesignDrop";
import ExploreCollections from "@/components/home/ExploreCollections";
import SaleBanner from "@/components/home/SaleBanner";
import RealLife from "@/components/home/RealLife";
import CountdownBanner from "@/components/home/CountdownBanner";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import PromoBanner from "@/components/home/PromoBanner";

export default function Home() {
  return (
    <>
      <main className="flex-1 bg-white">
        {/* Countdown Banner - Admin › Customization › Countdown */}
        <CountdownBanner />

        {/* Promotional Banner - Admin › Customization › Header Settings */}
        <PromoBanner />

        <Hero />
        <ShopByDepartment />
        <OneStopOutdoorShop />
        <SimpleSummerRefreshes />
        <NewArrivals />
        <DesignDrop />
        <ExploreCollections />
        <SaleBanner />
        <TestimonialsSection />
        <RealLife />
      </main>
    </>
  );
}
