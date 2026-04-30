import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

const aboutLinks = [
  "About Us",
  "AllModern Catalog",
  "Wayfair Rewards",
  "Wayfair Professional",
  "Careers",
  "Gift Cards",
  "Free Design Services",
  "AllModern Credit Card",
  "AllModern Financing",
  "Investor Relations",
  "Locations",
];

const serviceLinks = [
  "My Orders",
  "My Account",
  "Return Policy",
  "AllModern Accessibility Statement",
  "Help Center",
  "Product Recalls",
];

export default function SaleFooter() {
  return (
    <footer className="border-t border-slate-300 bg-[#f3f3f3]">
      <div className="mx-auto max-w-[1400px]">
        <div className="border-b border-slate-300 px-6 py-5">
          <div className="flex flex-wrap items-center justify-center gap-2 text-[14px]">
            <p className="font-semibold text-slate-900">We like your style. Want to stay in touch?</p>
            <input className="h-8 w-44 border border-slate-500 bg-white px-2 text-[12px]" placeholder="Email Address" />
            <button className="h-8 border border-slate-900 bg-slate-900 px-4 text-[12px] text-white">Submit</button>
          </div>
          <p className="mt-1 text-center text-[11px] text-slate-600 underline">Privacy Policy</p>
        </div>

        <div className="grid gap-8 px-6 py-8 md:grid-cols-3">
          <div>
            <h3 className="text-[34px] font-black leading-none text-slate-900">About Us</h3>
            <div className="mt-3 space-y-1.5 text-[12px] text-slate-700">
              {aboutLinks.map((link) => (
                <Link key={link} href="#" className="block hover:underline">
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[34px] font-black leading-none text-slate-900">Customer Service</h3>
            <div className="mt-3 space-y-1.5 text-[12px] text-slate-700">
              {serviceLinks.map((link) => (
                <Link key={link} href="#" className="block hover:underline">
                  {link}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-[34px] font-black leading-none text-slate-900">Contact Us</h3>
            <div className="mt-4 max-w-[240px] space-y-3">
              <button className="flex h-9 w-full items-center justify-center gap-2 border border-slate-900 bg-slate-900 text-[12px] text-white">
                <MessageCircle className="h-3.5 w-3.5" /> Quick Help
              </button>
              <button className="flex h-9 w-full items-center justify-center gap-2 border border-slate-900 bg-white text-[12px] text-slate-900">
                <Phone className="h-3.5 w-3.5" /> Call Us
              </button>
              <div>
                <p className="text-[28px] font-black leading-none text-slate-900">Customer Service</p>
                <p className="text-[12px] text-slate-700">Open. Closes at 11:59PM ET.</p>
                <p className="text-[12px] text-slate-700 underline">Weekly Hours</p>
              </div>
              <div>
                <p className="text-[28px] font-black leading-none text-slate-900">Shopping Assistance</p>
                <p className="text-[12px] text-slate-700">Open. Closes at 11:55PM ET.</p>
                <p className="text-[12px] text-slate-700 underline">Weekly Hours</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-300 px-6 py-5">
          <div className="flex flex-wrap items-center gap-6 text-[38px] font-black tracking-tight text-slate-900">
            <span className="text-purple-600">wayfair</span>
            <span className="text-[32px]">JOSS & MAIN</span>
            <span className="text-[34px]">BIRCH LN</span>
          </div>
          <div className="mt-2 flex items-center gap-3 text-slate-800">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M13.5 8H15V5h-1.8C10.7 5 9 6.7 9 9.2V11H7v3h2v5h3v-5h2.2l.3-3H12V9.3c0-.8.2-1.3 1.5-1.3Z" />
            </svg>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="4" />
              <circle cx="12" cy="12" r="4.2" />
              <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
            </svg>
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M10 15.5v-7l6 3.5-6 3.5ZM22 12s0-3.3-.4-4.8a2.5 2.5 0 0 0-1.8-1.8C18.3 5 12 5 12 5s-6.3 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.7 2 12 2 12s0 3.3.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.7 19 12 19 12 19s6.3 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8c.4-1.5.4-4.8.4-4.8Z" />
            </svg>
          </div>
          <p className="mt-2 text-[12px] text-slate-700">Your Opt Out Preference Signal is Honored</p>
          <p className="mt-2 text-[12px] font-semibold text-slate-900">
            Could not generate your unique web-ID verification code, please refresh or try a different page. If you&apos;re using an Ad Blocker or VPN, consider turning it off and trying again.
          </p>
          <div className="mt-2 flex flex-wrap gap-4 text-[10px] text-slate-600 underline">
            <Link href="#">Terms of Use</Link>
            <Link href="#">Privacy Policy</Link>
            <Link href="#">Your Privacy Rights & Choices</Link>
          </div>
          <p className="mt-2 text-[10px] text-slate-500">© 2026 by Wayfair LLC. 4 Copley Place 7th Floor, Boston, MA 02116</p>
        </div>
      </div>
    </footer>
  );
}
