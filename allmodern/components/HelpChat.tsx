"use client";

import { useState } from "react";
import { X, ChevronUp } from "lucide-react";
import Link from "next/link";

const ChatIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[20px] text-slate-700">
    <path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4c0-1.1.9-2 2-2h8a2 2 0 0 1 2 2z" />
    <path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
  </svg>
);

export default function HelpChat() {
  const [open, setOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="mb-2 w-[340px] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-slate-200">
          <div className="flex items-center justify-between border-b border-slate-100 p-4">
            <div className="w-5" /> {/* Spacer for centering */}
            <h2 className="font-bold text-[15px] text-slate-900">Help</h2>
            <button
              onClick={() => setOpen(false)}
              className="text-slate-500 hover:text-slate-900 transition"
              aria-label="Close help"
            >
              <X className="h-5 w-5 stroke-[1.5]" />
            </button>
          </div>

          <div className="p-6">
            <h3 className="text-[17px] font-bold text-slate-950 mb-1">
              We're here to help.
            </h3>
            <p className="text-[14px] text-slate-700 mb-6">
              How can we assist you today?
            </p>

            <div className="space-y-3 mb-8">
              <button className="w-full flex items-center px-4 border border-slate-400 bg-white py-3.5 text-[14px] text-slate-900 hover:border-slate-600 transition">
                Live Shopping Assistance
              </button>
              <button className="w-full flex items-center px-4 border border-slate-400 bg-white py-3.5 text-[14px] text-slate-900 hover:border-slate-600 transition">
                Customer Service Help
              </button>
            </div>

            <div className="border-t border-slate-200 pt-5 space-y-3">
              <Link href="#" className="block text-[14px] text-slate-800 underline underline-offset-2 hover:text-black">
                My Orders
              </Link>
              <Link href="#" className="block text-[14px] text-slate-800 underline underline-offset-2 hover:text-black">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Floating Buttons */}
      <div className="flex flex-col gap-2">
        {!open && (
          <button
            onClick={scrollToTop}
            className="bg-white border border-slate-300 w-[42px] h-[42px] flex items-center justify-center shadow-sm hover:bg-slate-50 transition"
            aria-label="Scroll to top"
          >
            <ChevronUp className="w-5 h-5 text-slate-600" />
          </button>
        )}
        <button
          onClick={() => setOpen(!open)}
          className="bg-white border border-slate-300 w-[42px] h-[42px] flex items-center justify-center shadow-sm hover:bg-slate-50 transition"
          aria-label={open ? "Close chat" : "Open chat"}
        >
          {open ? (
            <X className="w-5 h-5 text-slate-600 stroke-[1.5]" />
          ) : (
            <ChatIcon />
          )}
        </button>
      </div>
    </div>
  );
}
