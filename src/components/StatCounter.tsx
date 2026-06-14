"use client";

import { useRef, useState, useEffect, memo } from "react";
import { motion, useInView } from "framer-motion";

function StatCounter({ value, title }: { value: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const numericPart = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (isNaN(numericPart)) return;

    let startTime: number;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeProgress = progress * (2 - progress);
      setCount(Math.floor(easeProgress * numericPart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value]);

  const prefix = value.startsWith("+") ? "+" : "";
  const suffix = value.replace(/[0-9+]/g, "");

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="text-center p-6 md:p-8 glass-panel rounded-2xl relative overflow-hidden group border border-white/5 hover:border-neon-blue/30 transition-colors duration-500"
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-neon-purple to-neon-blue transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
      <div className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-neon-blue via-white to-neon-purple bg-clip-text text-transparent mb-2">
        {prefix}{count}{suffix}
      </div>
      <p className="text-gray-400 text-xs md:text-sm uppercase tracking-wider font-semibold">{title}</p>
    </motion.div>
  );
}

export default memo(StatCounter);
