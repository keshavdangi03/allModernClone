"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, CircleUserRound, ShoppingCart, Menu, X, ChevronRight, ChevronDown, ArrowRight } from "lucide-react";
import DepartmentNavigation from "@/components/layout/DepartmentNavigation";
import { headerLinks, departmentNavItems, categoryMenus } from "@/components/layout/navigation-data";

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
  const pathname = usePathname();
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
    // eslint-disable-next-line
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
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 py-1 sm:py-0">
            <span className="font-semibold tracking-tight text-[#a1a1a1] flex items-center gap-1">
              <div className="w-[11px] h-[11px] border-[1.5px] border-[#a1a1a1] relative before:absolute before:inset-[1.5px] before:bg-[#a1a1a1] flex items-center justify-center">
                <div className="w-[2px] h-[2px] bg-black z-10 rounded-full" />
              </div>
              wayfair
            </span>
            <span className="font-bold tracking-widest uppercase text-white">ALLMODERN</span>
            <span className="hidden font-semibold tracking-widest uppercase text-[#a1a1a1] sm:inline">BIRCH LN</span>
            <span className="hidden font-semibold tracking-widest uppercase text-[#a1a1a1] sm:inline">JOSS & MAIN</span>
            <span className="hidden font-semibold tracking-widest uppercase text-[#a1a1a1] lg:inline">PERIGOLD</span>
          </div>
          <div className="hidden items-center text-[#a1a1a1] md:flex text-[11px] font-semibold tracking-wide">
            <a href="#" className="hover:text-white transition">Join the Trade Program</a>
            <span className="mx-2">|</span>
            <a href="#" className="hover:text-white transition text-white font-bold">Furniture Over $35 Ships FREE*</a>
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
            <Link href="/" className="text-[20px] font-medium tracking-[0.15em] uppercase text-slate-950 sm:text-[30px] ml-2 sm:ml-4">
              ALLMODERN
            </Link>
          </div>

          <div className="flex flex-1 items-center justify-end gap-2 sm:gap-3">
            <div
              ref={profileMenuRef}
              className="relative"
              onMouseEnter={openProfileMenu}
              onMouseLeave={closeProfileMenu}
            >
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setProfileOpen(true);
                }}
                className="inline-flex h-7 w-7 items-center justify-center text-slate-800 transition hover:text-slate-950"
                aria-label="Open account menu"
                aria-expanded={profileOpen}
              >
                <CircleUserRound className="h-[23px] w-[23px] stroke-[1.6]" />
              </button>
              <AnimatePresence>
                {profileOpen ? (
                  <motion.div
                    className="absolute right-[-10px] top-[calc(100%+4px)] z-50 w-[290px] pt-[10px] sm:right-auto sm:left-1/2 sm:-translate-x-1/2"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.12, ease: "easeOut" }}
                  >
                    <div className="relative border border-[#c8ceda] bg-white px-5 py-5 shadow-lg">
                      <div className="absolute right-[16px] sm:right-auto sm:left-1/2 top-[-6px] h-3 w-3 sm:-translate-x-1/2 rotate-45 border-l border-t border-[#c8ceda] bg-white" />
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
              <span className="absolute -right-1.5 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e43216] px-1 text-[9px] font-bold text-white">
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

      <div className="hidden md:block border-b border-slate-200">
        <DepartmentNavigation />
      </div>

      {pathname !== "/" && (
        <div className="bg-[#f04e1e] text-white">
          <div className="mx-auto flex max-w-[1400px] justify-center px-4 py-1.5 sm:px-6">
            <Link href="#" className="flex items-center text-[13px] font-bold tracking-wide hover:underline">
              Up to 60% Off | 48-Hour Markdowns
              <ArrowRight className="ml-1 h-3.5 w-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      )}

      <AnimatePresence>
        {mobileOpen ? (
          <motion.div
            className="fixed inset-0 z-50 bg-slate-950/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute left-0 top-0 flex h-full w-[86vw] max-w-sm flex-col overflow-hidden bg-white shadow-2xl"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 240, damping: 28 }}
            >
              <div className="flex shrink-0 items-center border-b border-slate-200 px-4 py-4">
                <button
                  type="button"
                  onClick={() => setMobileOpen(false)}
                  className="mr-4 text-slate-500 hover:text-slate-900"
                  aria-label="Close menu"
                >
                  <X className="h-[22px] w-[22px] stroke-[1]" />
                </button>
                <div className="text-[20px] font-medium tracking-[0.15em] uppercase text-slate-950 sm:text-[24px]">
                  ALLMODERN
                </div>
              </div>

              <div className="flex-1 overflow-y-auto">
                <div className="flex flex-col">
                  {departmentNavItems.map((item) => (
                    <div key={item.label}>
                      {item.label === "Sale" ? (
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center justify-between border-b border-slate-200 px-5 py-4 text-[15px] text-slate-800 transition hover:bg-slate-50"
                        >
                          <span className="text-red-600 font-semibold">{item.label}</span>
                        </Link>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setMobileSection((current) => (current === item.label ? null : item.label))}
                          className="flex w-full items-center justify-between border-b border-slate-200 px-5 py-4 text-left text-[15px] text-slate-800 transition hover:bg-slate-50"
                        >
                          <span>{item.label}</span>
                          {mobileSection === item.label ? (
                            <ChevronDown className="h-4 w-4 text-slate-400 stroke-[1.5]" />
                          ) : (
                            <ChevronRight className="h-4 w-4 text-slate-400 stroke-[1.5]" />
                          )}
                        </button>
                      )}
                      <AnimatePresence>
                        {mobileSection === item.label && item.label !== "Sale" ? (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden bg-slate-50"
                          >
                            <div className="space-y-4 p-5 border-b border-slate-200 text-[14px] text-slate-700">
                              {categoryMenus[item.label]?.sections.map((section) => (
                                <div key={section.title}>
                                  <p className="mb-2 font-bold text-slate-900">{section.title}</p>
                                  <div className="space-y-2.5">
                                    {section.links.map((link) => (
                                      <Link key={link} href="#" className="block hover:underline">
                                        {link}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        ) : null}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col">
                  {[
                    "Best Sellers",
                    "Inspiration",
                    "Seasonal Catalog",
                    "Shop by Style",
                    "Free Design Services",
                    "Trade"
                  ].map((label) => (
                    <Link
                      key={label}
                      href="#"
                      className="border-b border-slate-200 px-5 py-4 text-[15px] text-slate-800 transition hover:bg-slate-50"
                    >
                      {label}
                    </Link>
                  ))}
                </div>

                <div className="px-5 py-6 pb-24">
                  <h3 className="mb-5 text-[15px] font-bold text-slate-950">Shop Other Brands</h3>
                  <div className="flex flex-col gap-6">
                    <div className="flex items-center text-[#7F187F]">
                      <svg className="h-[22px] w-auto" viewBox="0 0 200 45" fill="currentColor">
                        <path d="M48.2 26.6l-5.3-15h-4.3l7 19.3h5l7-19.3h-4.2l-5.2 15zm23-4c-3.4 0-5.6-2.1-5.6-5.5s2.2-5.5 5.6-5.5 5.6 2.1 5.6 5.5-2.2 5.5-5.6 5.5zm0-14.3c-5.7 0-9.8 3.8-9.8 8.8s4 8.8 9.8 8.8 9.8-3.8 9.8-8.8-4-8.8-9.8-8.8zm21.1 27.6l10-27h-4.7l-7.7 20.8-2.6-7h-4.2l5.4 14.6-5.2 14 4 1.2 5-13.6zm13.1-23.4h-3.3v-4h3.3v4zm0 2.2h-3.3v15h3.3v-15zm13-10.7c-2 0-3.6 1.6-3.6 3.6 0 2 1.6 3.6 3.6 3.6s3.6-1.6 3.6-3.6c0-2-1.6-3.6-3.6-3.6zm1.7 13.5v-2.8h-3.4v15h3.4v-8.2c0-3.3 1.5-4.4 3.4-4.4v-3c-1.3 0-2.6.8-3.4 3.4zm10.7-5.1c-3.4 0-5.6 2.1-5.6 5.5s2.2 5.5 5.6 5.5 5.6-2.1 5.6-5.5-2.2-5.5-5.6-5.5zm0-3.4c5.7 0 9.8 3.8 9.8 8.8s-4 8.8-9.8 8.8-9.8-3.8-9.8-8.8 4-8.8 9.8-8.8zm-113.8 8c-2.3 0-4.3-1.8-4.3-4.2 0-2.3 2-4.2 4.3-4.2s4.3 1.8 4.3 4.2c0 2.3-2 4.2-4.3 4.2zm-9.3-4.2c0-5 3.8-9.3 8.8-9.3s8.8 4.2 8.8 9.3c0 5-3.8 9.3-8.8 9.3s-8.8-4.2-8.8-9.3zm-6.2 8.3c2.3 0 4.3 1.8 4.3 4.2 0 2.3-2 4.2-4.3 4.2s-4.3-1.8-4.3-4.2c0-2.3 2-4.2 4.3-4.2zm9.3 4.2c0 5-3.8 9.3-8.8 9.3s-8.8-4.2-8.8-9.3c0-5 3.8-9.3 8.8-9.3s8.8 4.2 8.8 9.3z" />
                      </svg>
                    </div>
                    <div className="flex items-center text-[#1f1d24]">
                      <span className="font-serif text-[22px] tracking-[0.08em] text-[#1f1d24] leading-none">JOSS & MAIN</span>
                    </div>
                    <div className="flex items-center text-[#4b5a45]">
                      <span className="font-serif text-[24px] tracking-wide font-medium leading-none">BIRCH <span className="underline underline-offset-[4px] decoration-1">LN</span></span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="shrink-0 border-t border-slate-200 bg-white px-4 py-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <button
                  type="button"
                  onClick={goToAccountPage}
                  className="w-full bg-[#222222] py-3.5 text-[15px] text-white transition hover:bg-black"
                >
                  Sign In
                </button>
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
