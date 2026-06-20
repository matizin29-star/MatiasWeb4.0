"use client";

import { useRef, useState, memo, useEffect } from "react";

interface StatCounterProps {
  value: string;
  title: string;
}

function StatCounter({ value, title }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);
  const [displayValue, setDisplayValue] = useState("0");
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const isLiteral = isNaN(numericValue);
  const prefix = value.replace(/[0-9]/g, "").replace(/%/g, "");
  const suffix = value.includes("%") ? "%" : "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.disconnect(); } },
      { rootMargin: "50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || isLiteral) return;

    const duration = 2000;
    const start = performance.now();
    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(numericValue * eased);
      setDisplayValue(prefix ? prefix + current.toLocaleString() : current.toLocaleString() + suffix);
      if (progress < 1) requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [isInView, isLiteral, numericValue, prefix, suffix]);

  return (
    <div
      ref={ref}
      className={`group relative glass-card rounded-xl p-6 md:p-8 text-center transition-all duration-500 ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"}`}
    >
      <div className="text-3xl md:text-4xl font-bold text-gradient-electric tabular-nums mb-2 min-h-[40px]">
        {isLiteral ? value : displayValue || "0"}
      </div>
      <div className="text-xs md:text-sm text-white/40 font-light">{title}</div>
    </div>
  );
}

export default memo(StatCounter);
