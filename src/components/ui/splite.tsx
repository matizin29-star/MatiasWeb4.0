"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => null,
});

export default function SplineScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const q = useAdaptiveQuality();

  useEffect(() => {
    if (!q.enableSpline) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [q.enableSpline]);

  if (!q.enableSpline) {
    return (
      <div ref={containerRef} className="w-full h-full flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
          <div className="w-4 h-4 rounded-full bg-electric/30 animate-pulse-subtle" />
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {isVisible ? (
        <Spline scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode" />
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-electric/30 animate-pulse-subtle" />
          </div>
        </div>
      )}
    </div>
  );
}
