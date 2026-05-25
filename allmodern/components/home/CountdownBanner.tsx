"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Clock } from "lucide-react";
import { getCountdown } from "@/lib/actions/settings";

function useCountdown(targetDate: string) {
  const [timeLeft, setTimeLeft] = useState({ hours: "00", minutes: "00", seconds: "00", expired: false });
  
  useEffect(() => {
    const calc = () => {
      const diff = new Date(targetDate).getTime() - Date.now();
      if (diff <= 0) { setTimeLeft({ hours: "00", minutes: "00", seconds: "00", expired: true }); return; }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setTimeLeft({ hours: String(h).padStart(2, "0"), minutes: String(m).padStart(2, "0"), seconds: String(s).padStart(2, "0"), expired: false });
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  
  return timeLeft;
}

export default function CountdownBanner() {
  const [countdown, setCountdown] = useState<any>(null);

  useEffect(() => {
    async function load() {
      const data = await getCountdown();
      if (data && data.enabled) {
        setCountdown({
          ...data,
          subtitle: "Up to 60% Off", // Hardcoded fallback subtitle since not in schema initially
          bgColor: data.color
        });
      }
    }
    load();
  }, []);

  const timeLeft = useCountdown(countdown?.endDate || "");

  if (!countdown || timeLeft.expired) return null;

  return (
    <section style={{ backgroundColor: countdown.bgColor || "#e43a06" }} className="text-white">
      <div className="mx-auto max-w-[1400px] px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6">
        <div className="text-center sm:text-left">
          {countdown.subtitle && <span className="font-bold text-sm">{countdown.subtitle} | </span>}
          <span className="font-bold text-sm">{countdown.title}</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/20 px-4 py-1.5 rounded-full">
          <Clock size={14} />
          <span className="font-mono font-bold text-sm tabular-nums">
            {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
          </span>
        </div>
        <Link href="/sale" className="text-xs font-bold underline underline-offset-2 hover:opacity-80 transition whitespace-nowrap">
          SHOP NOW →
        </Link>
      </div>
    </section>
  );
}
