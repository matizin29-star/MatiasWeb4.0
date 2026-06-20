"use client";

import { useEffect, useRef } from "react";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

export default function MouseLighting() {
  const lightRef = useRef<HTMLDivElement>(null);
  const q = useAdaptiveQuality();

  useEffect(() => {
    if (!q.enableCursor) return;
    if (window.innerWidth < 768) return;

    const light = lightRef.current;
    if (!light) return;

    let rafId: number;
    const mouse = { x: 0.5, y: 0.5 };
    const current = { x: 0.5, y: 0.5 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX / window.innerWidth;
      mouse.y = e.clientY / window.innerHeight;
    };

    const animate = () => {
      current.x += (mouse.x - current.x) * 0.05;
      current.y += (mouse.y - current.y) * 0.05;

      light.style.setProperty("--mx", String(Math.round(current.x * 100)));
      light.style.setProperty("--my", String(Math.round(current.y * 100)));

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, [q.enableCursor]);

  return (
    <div
      ref={lightRef}
      className="fixed inset-0 pointer-events-none z-[1]"
      style={{ background: "radial-gradient(600px circle at var(--mx, 50)% var(--my, 50)%, rgba(0,102,255,0.03), transparent 60%)" }}
      aria-hidden="true"
    />
  );
}
