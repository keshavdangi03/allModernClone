import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PromoGrid from "@/components/PromoGrid";
import ShopByDepartment from "@/components/ShopByDepartment";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex-1 bg-white pt-3">
        <Hero />
        <PromoGrid />
        <ShopByDepartment />
      </main>
      <Footer />
    </>
  );
}
