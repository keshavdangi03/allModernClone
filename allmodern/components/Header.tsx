"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CircleUserRound, ShoppingCart, Menu, X, ChevronRight, ChevronDown } from "lucide-react";
import DepartmentNavigation from "./DepartmentNavigation";
import { headerLinks, departmentNavItems, categoryMenus } from "./navigation-data";

const collectionsMenu = {
  links: [
    "Outdoor Collections",
    "Bedroom Collections",
    "Sofa + Sectional Collections",
    "Living Room Accent Collections",
    "Kitchen + Dining Collections",
    "Rug Collections",
    "Home Office Collections",
    "Lighting Collections",
  ],
  tiles: [
    { title: "Shop Top-Rated Outdoor Collections", image: "/images/cat_outdoor.png" },
    { title: "Shop Top-Rated Bedroom Collections", image: "/images/cat_bedroom.png" },
    { title: "Shop Top-Rated Sofa + Sectional Collections", image: "/images/cat_living_room.png" },
  ],
};

export default function Header() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileSection, setMobileSection] = useState<string | null>(null);
  const [activeTopMenu, setActiveTopMenu] = useState<string | null>(null);
  const topMenuCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileCloseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const profileMenuRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLDivElement | null>(null);

  const openTopMenu = (label: string) => {
    if (topMenuCloseTimeoutRef.current) {
      clearTimeout(topMenuCloseTimeoutRef.current);
      topMenuCloseTimeoutRef.current = null;
    }
    setActiveTopMenu(label);
  };

  const closeTopMenu = () => {
    topMenuCloseTimeoutRef.current = setTimeout(() => setActiveTopMenu(null), 120);
  };

  const openProfileMenu = () => {
    if (profileCloseTimeoutRef.current) {
      clearTimeout(profileCloseTimeoutRef.current);
      profileCloseTimeoutRef.current = null;
    }
    setProfileOpen(true);
  };

  const closeProfileMenu = () => {
    profileCloseTimeoutRef.current = setTimeout(() => setProfileOpen(false), 120);
  };

  const goToAccountPage = () => {
    setProfileOpen(false);
    router.push("/account");
  };

  const handleSignOut = () => {
    localStorage.removeItem("allmodern-auth");
    setIsAuthenticated(false);
    setProfileOpen(false);
  };

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("allmodern-auth") === "true");

    const handleOutsideClick = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchOpen(false);
      }
    };

    if (profileOpen || searchOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      if (topMenuCloseTimeoutRef.current) {
        clearTimeout(topMenuCloseTimeoutRef.current);
      }
      if (profileCloseTimeoutRef.current) {
        clearTimeout(profileCloseTimeoutRef.current);
      }
    };
  }, [profileOpen, searchOpen]);

  return (
    <header className="sticky top-0 z-50 bg-white/95 shadow-sm shadow-slate-900/5">
      <div className="bg-[#000000] text-[#a1a1a1]">
        <div className="mx-auto flex h-[26px] max-w-[1400px] items-center justify-between px-4 text-[11px] sm:px-6">
          <div className="flex items-center gap-4">
            <span className="font-bold tracking-tight text-white flex items-center gap-1">
              <div className="w-[11px] h-[11px] border-[1.5px] border-white relative before:absolute before:inset-[1.5px] before:bg-white flex items-center justify-center">
                <div className="w-[2px] h-[2px] bg-black z-10 rounded-full" />
              </div>
              wayfair
            </span>
            <span className="font-medium tracking-widest uppercase text-white">ALLMODERN</span>
            <span className="font-medium tracking-widest uppercase text-[#a1a1a1]">BIRCH LN</span>
            <span className="font-medium tracking-widest uppercase text-[#a1a1a1]">JOSS & MAIN</span>
            <span className="font-medium tracking-widest uppercase text-[#a1a1a1]">PERIGOLD</span>
          </div>
          <div className="hidden items-center text-white md:flex text-[11px] font-medium tracking-wide">
            <a href="#" className="hover:underline">Join the Trade Program</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:underline">Furniture Over $35 Ships FREE*</a>
          </div>
        </div>
      </div>

      <div className="bg-white">
        <div className="mx-auto flex max-w-[1400px] items-center gap-3 px-4 py-2 sm:gap-4 sm:px-6 sm:py-3.5">
          <div className="flex flex-1 items-center md:min-w-[220px]">
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="mr-2 inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-900 transition hover:border-slate-300 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
            <div className="relative w-full max-w-[320px]" ref={searchRef}>
              <Search className="pointer-events-none absolute left-1 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                aria-label="Search site"
                placeholder="Search"
                onFocus={() => setSearchOpen(true)}
                className="hidden w-full border-b border-slate-300 bg-transparent py-2 pl-6 pr-2 text-[13px] text-slate-900 outline-none placeholder:text-slate-400 focus:border-slate-900 md:block"
              />
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    className="absolute left-0 top-full z-50 mt-[-1px] hidden w-[600px] border border-slate-200 bg-white p-6 shadow-[0_8px_24px_rgba(0,0,0,0.12)] md:block"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  >
                    <div className="mb-5 flex items-end justify-between">
                      <h3 className="text-xl font-bold text-slate-950">Recently Viewed</h3>
                      <Link href="#" className="text-[13px] text-slate-700 underline underline-offset-2 hover:text-slate-950">
                        See all
                      </Link>
                    </div>
                    <div className="grid grid-cols-4 gap-4">
                      <Link href="#" className="group block">
                        <div className="relative aspect-square overflow-hidden bg-[#f4f4f4] flex items-center justify-center p-3">
                          <Image
                            src="/images/cat_living_room.png"
                            alt="Recently viewed sofa"
                            width={140}
                            height={140}
                            className="object-contain transition-transform duration-300 group-hover:scale-105 mix-blend-multiply"
                          />
                          <div className="absolute bottom-0 left-0 bg-[#a63f15] px-2 py-0.5 text-[11px] font-bold text-white">
                            Sale
                          </div>
                        </div>
                      </Link>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>

          <div className="flex flex-1 justify-center md:justify-center">
            <Link href="/" className="text-[26px] font-medium tracking-[0.15em] uppercase text-slate-950 sm:text-[30px] ml-4">
              ALLMODERN
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
            <div
              ref={profileMenuRef}
              className="relative hidden md:block"
              onMouseEnter={openProfileMenu}
              onMouseLeave={closeProfileMenu}
            >
              <button
                type="button"
                onClick={() => setProfileOpen((current) => !current)}
                className="inline-flex h-7 w-7 items-center justify-center text-slate-800 transition hover:text-slate-950"
                aria-label="Open account menu"
                aria-expanded={profileOpen}
              >
                <CircleUserRound className="h-[23px] w-[23px] stroke-[1.6]" />
              </button>
              <AnimatePresence>
                {profileOpen ? (
                  <motion.div
                    className="absolute left-1/2 top-[calc(100%+4px)] z-50 w-[290px] -translate-x-1/2 pt-[10px]"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                  >
                    <div className="relative border border-[#c8ceda] bg-white px-5 py-5 shadow-lg">
                      <div className="absolute left-1/2 top-[-6px] h-3 w-3 -translate-x-1/2 rotate-45 border-l border-t border-[#c8ceda] bg-white" />
                      {!isAuthenticated ? (
                        <>
                          <div className="text-center">
                            <button
                              type="button"
                              onClick={goToAccountPage}
                              className="w-full bg-[#1f1d24] py-3 text-[14px] font-medium text-white transition hover:bg-black"
                            >
                              Sign In
                            </button>
                            <button
                              type="button"
                              onClick={goToAccountPage}
                              className="mt-4 text-[13.5px] text-[#1f1d24] underline underline-offset-2 hover:text-black"
                            >
                              Create an Account
                            </button>
                          </div>
                          <div className="mt-5 border-t border-[#e5e7eb]" />
                        </>
                      ) : (
                        <>
                          <div className="text-[17px] font-bold text-slate-900">Welcome</div>
                          <div className="mt-3 border-t border-[#e5e7eb]" />
                        </>
                      )}
                      <div className="mt-4 text-[14px] text-[#333333]">
                        <Link href="/account" onClick={() => setProfileOpen(false)} className="block py-1.5 hover:underline">
                          My Account
                        </Link>
                        <a href="#" className="block py-1.5 hover:underline">My Orders</a>
                        <a href="#" className="block py-1.5 hover:underline">My Boards</a>
                        <a href="#" className="block py-1.5 hover:underline">Review My Purchases</a>
                        <a href="#" className="block py-1.5 hover:underline">Recently Viewed</a>
                        <a href="#" className="block py-1.5 hover:underline">Help & Contact</a>
                      </div>
                      <div className="mt-4 border-t border-[#e5e7eb]" />
                      <div className="mt-4 text-[14px] text-[#333333]">
                        <a href="#" className="block py-1.5 hover:underline">Free Design Services</a>
                        <a href="#" className="block py-1.5 hover:underline">Gift Card</a>
                        <a href="#" className="block py-1.5 hover:underline">Wayfair Rewards</a>
                        <a href="#" className="block py-1.5 hover:underline">AllModern Credit Card</a>
                        <a href="#" className="block py-1.5 hover:underline">AllModern Financing</a>
                      </div>
                      {isAuthenticated && (
                        <div className="mt-7 text-[12.5px] text-[#333333]">
                          On a public or shared device?{" "}
                          <button
                            type="button"
                            onClick={handleSignOut}
                            className="underline underline-offset-2 hover:text-black"
                          >
                            Sign Out
                          </button>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative inline-flex h-8 w-8 items-center justify-center text-slate-800 transition hover:text-slate-950 sm:h-9 sm:w-9"
              aria-label="Open cart"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="absolute -right-1.5 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-orange-600 px-1 text-[9px] font-bold text-white">
                0
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="relative hidden bg-white md:block" onMouseLeave={closeTopMenu}>
        <div
          className="mx-auto flex max-w-[1400px] items-center justify-center overflow-x-auto whitespace-nowrap px-4 py-1.5 text-[9px] font-medium uppercase tracking-[0.08em] text-slate-600 sm:px-6"
          onMouseEnter={() => {
            if (topMenuCloseTimeoutRef.current) {
              clearTimeout(topMenuCloseTimeoutRef.current);
              topMenuCloseTimeoutRef.current = null;
            }
          }}
        >
          {headerLinks.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onMouseEnter={() => (item.label === "Collections" ? openTopMenu(item.label) : setActiveTopMenu(null))}
              className={`px-3 py-1.5 transition hover:text-slate-950 ${activeTopMenu === item.label ? "text-slate-950 underline underline-offset-4" : ""}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <AnimatePresence>
          {activeTopMenu === "Collections" ? (
            <motion.div
              className="absolute inset-x-0 top-full z-50 border-t border-slate-200 bg-white shadow-lg"
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
              onMouseEnter={() => {
                if (topMenuCloseTimeoutRef.current) {
                  clearTimeout(topMenuCloseTimeoutRef.current);
                  topMenuCloseTimeoutRef.current = null;
                }
              }}
            >
              <div className="mx-auto grid max-w-[1400px] grid-cols-[220px_1fr] gap-4 px-4 py-4 sm:px-6">
                <div>
                  <h3 className="mb-2 text-[11px] font-bold uppercase tracking-[0.05em] text-slate-900">Collections</h3>
                  <div className="space-y-1.5">
                    {collectionsMenu.links.map((link) => (
                      <Link
                        key={link}
                        href="#"
                        className="block text-[12px] leading-5 text-slate-700 transition hover:text-slate-950 hover:underline"
                      >
                        {link}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {collectionsMenu.tiles.map((tile) => (
                    <Link key={tile.title} href="#" className="group block">
                      <div className="relative aspect-[1.85/1] overflow-hidden bg-slate-100">
                        <Image
                          src={tile.image}
                          alt={tile.title}
                          fill
                          sizes="(max-width: 1200px) 30vw, 24vw"
                          className="object-cover transition duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                      <p className="pt-1.5 text-[12px] font-semibold text-slate-900">{tile.title}</p>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>

      <div className="hidden md:block">
        <DepartmentNavigation />
      </div>
      <div className="hidden border-b border-slate-200 bg-[#f7f2ef] md:block">
        <div className="mx-auto max-w-[1400px] px-4 py-1 text-center text-[10px] font-semibold text-slate-900 sm:px-6">
          Up to 30% off Outdoor
          <span className="ml-1.5">&gt;</span>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute left-0 top-0 h-full w-[86vw] max-w-sm overflow-y-auto bg-white p-5 shadow-2xl sm:p-6"
              initial={{ x: -360 }}
              animate={{ x: 0 }}
              exit={{ x: -360 }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.35em] text-slate-500">Menu</p>
                  <p className="mt-1 text-xl font-black text-slate-950">AllModern</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="search"
                    aria-label="Search site"
                    placeholder="Search modern furniture, decor..."
                    className="w-full rounded-full border border-slate-200 bg-slate-50 py-3.5 pl-12 pr-4 text-sm text-slate-900 outline-none focus:border-slate-400 focus:ring-2 focus:ring-orange-400/20"
                  />
                </div>

                <div className="mt-7 space-y-2">
                  {departmentNavItems.map((item) => (
                    <div key={item.label}>
                      {item.label === "Sale" ? (
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-red-600 shadow-sm transition hover:border-slate-300"
                        >
                          <span>{item.label}</span>
                        </Link>
                      ) : (
                        <>
                          <button
                            type="button"
                            onClick={() => setMobileSection((current) => (current === item.label ? null : item.label))}
                            className="flex w-full items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3 text-left text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-300"
                          >
                            <span>{item.label}</span>
                            <ChevronDown
                              className={`h-4 w-4 text-slate-400 transition-transform ${mobileSection === item.label ? "rotate-180" : ""}`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileSection === item.label ? (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                              >
                                <div className="space-y-3 border-l-2 border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
                                  {categoryMenus[item.label]?.sections.map((section) => (
                                    <div key={section.title}>
                                      <p className="text-xs uppercase tracking-[0.32em] text-slate-500">{section.title}</p>
                                      <div className="mt-2 space-y-1">
                                        {section.links.map((link) => (
                                          <a key={link} href="#" className="block rounded-xl px-3 py-2 transition hover:bg-white hover:text-slate-950">
                                            {link}
                                          </a>
                                        ))}
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </motion.div>
                            ) : null}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  ))}
                </div>

                <div className="mt-8 rounded-3xl bg-slate-950 p-6 text-white shadow-xl">
                  <p className="text-xs uppercase tracking-[0.35em] text-orange-300">Need help?</p>
                  <h3 className="mt-3 text-lg font-black">Explore seasonal decor.</h3>
                  <p className="mt-3 text-sm text-slate-300">
                    Find curated inspiration, bold accents, and brand-new arrivals in one place.
                  </p>
                  <Link href="#" className="mt-5 inline-flex items-center text-sm font-semibold text-orange-300 hover:text-white">
                    Discover more
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {cartOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="fixed right-0 top-0 bottom-0 h-screen w-full max-w-[520px] overflow-y-auto bg-white shadow-2xl"
              initial={{ x: 360 }}
              animate={{ x: 0 }}
              exit={{ x: 360 }}
              transition={{ type: "spring", stiffness: 220, damping: 28 }}
            >
              <div className="flex items-center justify-between border-b border-slate-200 px-7 py-6">
                <div>
                  <h2 className="text-xl font-black text-slate-950">In Your Cart</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setCartOpen(false)}
                  className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-900 shadow-sm transition hover:border-slate-300"
                  aria-label="Close cart"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="px-7 py-8">
                <h3 className="text-xl font-black text-slate-950">Oh-no! Looks like your cart is empty.</h3>
                <p className="mt-4 text-sm leading-6 text-slate-700">
                  Here are some options to get you started:
                </p>
                <div className="mt-8 space-y-4 text-sm text-slate-900">
                  <a href="#" className="block font-semibold text-slate-950 transition hover:text-orange-600">
                    Sign In to view your saved items
                  </a>
                  <a href="#" className="block font-semibold text-slate-950 transition hover:text-orange-600">
                    Start saving with Daily Sales
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
