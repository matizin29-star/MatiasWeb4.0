"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center" aria-label="Carregando modelo 3D">
      <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [shouldLoad, setShouldLoad] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {shouldLoad ? (
        <Spline scene={scene} className="w-full h-full" />
      ) : (
        <div className="w-full h-full flex items-center justify-center" aria-label="Carregando modelo 3D">
          <div className="w-8 h-8 border-2 border-neon-blue border-t-transparent rounded-full animate-spin" />
        </div>
      )}
    </div>
  );
}
