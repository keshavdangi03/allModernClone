import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import HelpChat from "@/components/layout/HelpChat";
import { CartProvider } from "@/components/context/CartContext";

export default function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <CartProvider>
      <Header />
      {children}
      <Footer />
      <HelpChat />
    </CartProvider>
  );
}
