"use client";

import { useState, useRef, useEffect } from "react";
import SortFilterBar from "./SortFilterBar";
import DesktopFilterSidebar from "./DesktopFilterSidebar";

interface FilterableProductLayoutProps {
  title: string;
  itemCount: number;
  children: React.ReactNode;
}

export default function FilterableProductLayout({ title, itemCount, children }: FilterableProductLayoutProps) {
  const [showDesktopFilters, setShowDesktopFilters] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const stickyTriggerRef = useRef<HTMLDivElement>(null);
  const sectionEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const triggerEl = stickyTriggerRef.current;
    const endEl = sectionEndRef.current;
    if (!triggerEl || !endEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the trigger sentinel scrolls out of view upward, activate sticky
        setIsSticky(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: "0px 0px 0px 0px" }
    );

    observer.observe(triggerEl);

    // Also observe the end sentinel to unstick when footer area is reached
    const endObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsSticky(false);
        }
      },
      { threshold: 0 }
    );

    endObserver.observe(endEl);

    return () => {
      observer.disconnect();
      endObserver.disconnect();
    };
  }, []);

  return (
    <section className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 sm:px-6">
      {/* Header */}
      <div className="flex items-end gap-2 pb-6">
        <h2 className="text-2xl font-bold text-slate-950 sm:text-[28px]">{title}</h2>
        <span className="pb-1 text-[13px] text-slate-600">{itemCount.toLocaleString()} Items</span>
      </div>

      {/* Intersection sentinel: when this scrolls out of view, we go sticky */}
      <div ref={stickyTriggerRef} className="h-0 w-full" aria-hidden="true" />

      {/* 
        Mobile Sticky Filter Bar Container 
        On mobile (< sm): becomes sticky at top when scrolling past the sentinel.
        On desktop (>= sm): normal flow, never sticky.
      */}
      <div
        className={`
          sm:relative sm:top-auto sm:z-auto sm:bg-transparent sm:shadow-none
          transition-shadow duration-200
          ${isSticky 
            ? "fixed top-0 left-0 right-0 z-[90] bg-white shadow-[0_2px_8px_rgba(0,0,0,0.08)] sm:static sm:shadow-none" 
            : ""
          }
        `}
      >
        {/* On mobile sticky: show compact title row */}
        {isSticky && (
          <div className="sm:hidden px-4 pt-3 pb-1 border-b border-slate-100">
            <div className="flex items-end gap-2">
              <h2 className="text-lg font-bold text-slate-950">{title}</h2>
              <span className="pb-0.5 text-[12px] text-slate-500">{itemCount.toLocaleString()} Items</span>
            </div>
          </div>
        )}

        <div className={isSticky ? "px-4 sm:px-0 pb-2 sm:pb-0" : ""}>
          {/* Responsive Sort & Filter Toolbar */}
          <SortFilterBar 
            productCount={itemCount}
            showDesktopFilters={showDesktopFilters}
            onToggleDesktopFilters={() => setShowDesktopFilters(!showDesktopFilters)}
          />
        </div>
      </div>

      {/* Spacer to prevent content jump when the bar becomes fixed on mobile */}
      {isSticky && <div className="sm:hidden h-[72px]" aria-hidden="true" />}

      {/* Grid Layout Area */}
      <div className="mt-6 flex flex-col sm:flex-row items-start">
        {/* Desktop Sidebar */}
        {showDesktopFilters && (
          <div className="hidden sm:block shrink-0 overflow-hidden w-[280px]">
            <DesktopFilterSidebar />
          </div>
        )}

        {/* Right Content Area (Product Grid) */}
        <div className="flex-1 w-full pt-4">
          {children}
        </div>
      </div>

      {/* End sentinel: when this becomes visible, unstick the bar */}
      <div ref={sectionEndRef} className="h-0 w-full" aria-hidden="true" />
    </section>
  );
}
