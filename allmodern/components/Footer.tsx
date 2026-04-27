import Link from "next/link";

const Instagram = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const Facebook = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const Twitter = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const Youtube = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 7.1C2 8.7 2 12 2 12s0 3.3.5 4.9a3 3 0 0 0 2 2.1C6.2 19.5 12 19.5 12 19.5s5.8 0 7.5-.5a3 3 0 0 0 2-2.1c.5-1.6.5-4.9.5-4.9s0-3.3-.5-4.9a3 3 0 0 0-2-2.1C17.8 4.5 12 4.5 12 4.5s-5.8 0-7.5.5a3 3 0 0 0-2 2.1z"/><path d="m9.5 15.5 6-3.5-6-3.5z"/></svg>
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <Link href="/" className="text-2xl font-black tracking-tighter uppercase mb-4 inline-block">
              AllModern<span className="text-primary">.</span>
            </Link>
            <p className="text-gray-400 text-sm mb-6">
              Modern furniture, beautifully designed and accessible to everyone.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-l-md focus:outline-none focus:ring-1 focus:ring-primary w-full text-sm"
              />
              <button
                type="submit"
                className="bg-primary hover:bg-orange-600 px-4 py-2 rounded-r-md text-sm font-bold transition-colors"
              >
                Join
              </button>
            </form>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wider">Customer Service</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Track Order</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Returns & Exchanges</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Shipping Info</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wider">About Us</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><Link href="#" className="hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-primary transition-colors">Trade Program</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase tracking-wider">Follow Us</h4>
            <div className="flex space-x-4">
              <Link href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Instagram />
              </Link>
              <Link href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Facebook />
              </Link>
              <Link href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Twitter />
              </Link>
              <Link href="#" className="bg-gray-800 p-2 rounded-full hover:bg-primary transition-colors">
                <Youtube />
              </Link>
            </div>
          </div>
          
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} AllModern Clone. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
