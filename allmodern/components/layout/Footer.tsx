"use client";

import Link from "next/link";
import { Clock, Phone } from "lucide-react";

const Instagram = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Facebook = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Youtube = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2 8.7 2 12 2 12s0 3.3.5 4.9a3 3 0 0 0 2 2.1C6.2 19.5 12 19.5 12 19.5s5.8 0 7.5-.5a3 3 0 0 0 2-2.1c.5-1.6.5-4.9.5-4.9s0-3.3-.5-4.9a3 3 0 0 0-2-2.1C17.8 4.5 12 4.5 12 4.5s-5.8 0-7.5.5a3 3 0 0 0-2 2.1z"/><path d="m9.5 15.5 6-3.5-6-3.5z"/></svg>
);
const Pinterest = ({ className }: { className?: string }) => (
  <svg className={className} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.406.042-3.431.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345l-.288 1.178c-.046.19-.152.232-.35.139-1.306-.615-2.121-2.542-2.121-4.098 0-3.333 2.42-6.398 6.993-6.398 3.67 0 6.521 2.614 6.521 6.096 0 3.648-2.298 6.582-5.491 6.582-1.073 0-2.081-.557-2.427-1.216l-.662 2.523c-.239.916-.892 2.061-1.332 2.759 1.05.323 2.155.498 3.298.498 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
);

export default function Footer() {

  return (
    <footer className="bg-white border-t border-slate-200 text-slate-900">
      {/* Newsletter Section */}
      <div className="border-b border-slate-200">
        <div className="mx-auto flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 py-10 px-6">
          <div className="text-center md:text-right">
            <p className="font-bold text-[15px] text-slate-900">We like your style. Want to stay in touch?</p>
            <Link href="#" className="text-[12.5px] text-slate-600 underline hover:text-slate-900 mt-1 block">
              Privacy Policy
            </Link>
          </div>
          <form className="flex flex-col sm:flex-row w-full max-w-[340px]">
            <input
              type="email"
              placeholder="Email Address"
              className="h-[38px] flex-1 border border-slate-300 px-3 text-[13px] outline-none focus:border-slate-800 focus:ring-1 focus:ring-slate-800"
            />
            <button
              type="submit"
              className="h-[38px] bg-[#595959] px-6 text-[13px] font-bold text-white transition hover:bg-[#404040]"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Links Section */}
      <div className="mx-auto max-w-[1000px] px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-12">
          
          {/* About Us */}
          <div>
            <h4 className="text-[17px] font-bold mb-5 text-slate-950">About Us</h4>
            <ul className="space-y-3.5 text-[13.5px] text-slate-600">
              <li><Link href="#" className="hover:underline hover:text-slate-900">About Us</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">AllModern Catalog</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">Wayfair Rewards</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">Wayfair Professional</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">Careers</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">Gift Cards</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">Free Design Services</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">AllModern Credit Card</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">AllModern Financing</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">Investor Relations</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">Locations</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-[17px] font-bold mb-5 text-slate-950">Customer Service</h4>
            <ul className="space-y-3.5 text-[13.5px] text-slate-600">
              <li><Link href="#" className="hover:underline hover:text-slate-900">My Orders</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">My Account</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">Return Policy</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">AllModern Accessibility Statement</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">Help Center</Link></li>
              <li><Link href="#" className="hover:underline hover:text-slate-900">Product Recalls</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4 className="text-[17px] font-bold mb-5 text-slate-950">Contact Us</h4>
            <div className="space-y-3 mb-8 max-w-[180px]">
              <button className="w-full flex items-center justify-center gap-2 bg-[#1f1d24] py-2 text-[13.5px] text-white hover:bg-black transition">
                <Clock className="w-[15px] h-[15px]" />
                Quick Help
              </button>
              <button className="w-full flex items-center justify-center gap-2 border border-slate-300 bg-white py-2 text-[13.5px] text-slate-900 hover:border-slate-500 transition">
                <Phone className="w-[15px] h-[15px]" />
                Call Us
              </button>
            </div>

            <div className="mb-6">
              <h5 className="font-bold text-[13.5px] text-slate-950 mb-1">Customer Service</h5>
              <p className="text-[13px] text-slate-600">Open. Closes at 10:00PM ET.</p>
              <Link href="#" className="text-[13px] text-slate-600 underline hover:text-slate-900 block mt-0.5">Weekly Hours</Link>
            </div>

            <div>
              <h5 className="font-bold text-[13.5px] text-slate-950 mb-1">Shopping Assistance</h5>
              <p className="text-[13px] text-slate-600">Open. Closes at 8:00PM ET.</p>
              <Link href="#" className="text-[13px] text-slate-600 underline hover:text-slate-900 block mt-0.5">Weekly Hours</Link>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-[1000px] px-6 py-8">
          
          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="text-[#7F187F] font-bold text-2xl tracking-tight flex items-center gap-1">
              <div className="grid grid-cols-3 gap-[2px] w-5 h-5 opacity-80 mr-1">
                <div className="bg-[#7F187F] rounded-full w-[4px] h-[4px]" />
                <div className="bg-[#7F187F] rounded-full w-[4px] h-[4px]" />
                <div className="bg-[#7F187F] rounded-full w-[4px] h-[4px]" />
                <div className="bg-[#7F187F] rounded-full w-[4px] h-[4px]" />
                <div className="bg-[#7F187F] rounded-full w-[4px] h-[4px]" />
                <div className="bg-[#7F187F] rounded-full w-[4px] h-[4px]" />
              </div>
              wayfair
            </div>
            <div className="font-serif tracking-widest text-[19px] text-slate-800">
              JOSS & MAIN
            </div>
            <div className="font-serif tracking-widest text-[19px] text-[#3e5622]">
              BIRCH LN
            </div>
          </div>

          <div className="flex gap-5 mb-8 text-slate-800">
            <Link href="#" className="hover:text-slate-600 transition"><Facebook className="w-[18px] h-[18px] fill-current" /></Link>
            <Link href="#" className="hover:text-slate-600 transition"><Pinterest /></Link>
            <Link href="#" className="hover:text-slate-600 transition"><Instagram className="w-[18px] h-[18px]" /></Link>
            <Link href="#" className="hover:text-slate-600 transition"><Youtube className="w-[18px] h-[18px]" /></Link>
          </div>

          <div className="space-y-4">
            <p className="text-[12px] text-slate-700">Your Opt Out Preference Signal is Honored</p>
            <p className="text-[12.5px] font-bold text-slate-950 max-w-[800px]">
              Could not generate your unique web-ID verification code, please refresh or try a different page. If you&apos;re using an Ad Blocker or VPN, consider turning it off and trying again.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link href="#" className="text-[11px] text-slate-600 underline hover:text-slate-900">Terms of Use</Link>
              <Link href="#" className="text-[11px] text-slate-600 underline hover:text-slate-900">Privacy Policy</Link>
              <Link href="#" className="text-[11px] text-slate-600 underline hover:text-slate-900">Your Privacy Rights & Choices</Link>
            </div>
            <p className="text-[10.5px] text-slate-500 pt-3">
              &copy; 2026 by Wayfair LLC, 4 Copley Place, 7th Floor, Boston, MA 02116
            </p>
          </div>

        </div>
      </div>
    </footer>
  );
}
