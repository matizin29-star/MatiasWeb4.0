"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function CustomCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on desktop devices (non-touch)
    if (window.innerWidth < 768) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;

    if (!dot || !ring) return;

    // Set initial positions
    gsap.set(dot, { xPercent: -50, yPercent: -50 });
    gsap.set(ring, { xPercent: -50, yPercent: -50 });

    const mouse = { x: 0, y: 0 };
    const ringPos = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      // Immediately move the center dot
      gsap.to(dot, {
        x: mouse.x,
        y: mouse.y,
        duration: 0.05,
        ease: "power2.out",
      });
    };

    // Use GSAP ticker to smoothly interpolate the outer ring (lag behind effect)
    const onTick = () => {
      const ease = 0.15; // spring ease
      ringPos.x += (mouse.x - ringPos.x) * ease;
      ringPos.y += (mouse.y - ringPos.y) * ease;

      gsap.set(ring, {
        x: ringPos.x,
        y: ringPos.y,
      });
    };

    window.addEventListener("mousemove", onMouseMove);
    gsap.ticker.add(onTick);

    // Click Animations
    const onMouseDown = () => {
      gsap.to(dot, { scale: 0.5, duration: 0.15 });
      gsap.to(ring, { 
        scale: 1.5, 
        borderColor: "#8A2BE2", 
        borderWidth: "3px", 
        backgroundColor: "rgba(138, 43, 226, 0.15)", 
        duration: 0.15 
      });
    };

    const onMouseUp = () => {
      gsap.to(dot, { scale: 1, duration: 0.2 });
      gsap.to(ring, { 
        scale: 1, 
        borderColor: "#00D4FF", 
        borderWidth: "1.5px", 
        backgroundColor: "transparent", 
        duration: 0.2 
      });
    };

    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Hover effect on interactive items
    const onMouseOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[data-clickable]") ||
        target.closest("input") ||
        target.closest("textarea");

      if (isInteractive) {
        gsap.to(ring, {
          scale: 1.8,
          borderColor: "#8A2BE2",
          backgroundColor: "rgba(138, 43, 226, 0.08)",
          borderWidth: "1.5px",
          duration: 0.3,
        });
        gsap.to(dot, {
          scale: 1.5,
          backgroundColor: "#8A2BE2",
          duration: 0.3,
        });
      }
    };

    const onMouseOutInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = 
        target.tagName === "A" || 
        target.tagName === "BUTTON" || 
        target.closest("a") || 
        target.closest("button") || 
        target.closest("[data-clickable]") ||
        target.closest("input") ||
        target.closest("textarea");

      if (isInteractive) {
        gsap.to(ring, {
          scale: 1,
          borderColor: "#00D4FF",
          backgroundColor: "transparent",
          borderWidth: "1.5px",
          duration: 0.3,
        });
        gsap.to(dot, {
          scale: 1,
          backgroundColor: "#00D4FF",
          duration: 0.3,
        });
      }
    };

    document.addEventListener("mouseover", onMouseOverInteractive);
    document.addEventListener("mouseout", onMouseOutInteractive);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(onTick);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOverInteractive);
      document.removeEventListener("mouseout", onMouseOutInteractive);
    };
  }, []);

  return (
    <>
      {/* Central Neon Dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#00D4FF] rounded-full pointer-events-none z-[9999] hidden md:block"
        style={{
          boxShadow: "0 0 10px #00D4FF, 0 0 20px #00D4FF",
        }}
      />
      {/* Outer Spring Neon Ring */}
      <div
        ref={cursorRingRef}
        className="fixed top-0 left-0 w-9 h-9 border-[1.5px] border-[#00D4FF] rounded-full pointer-events-none z-[9998] hidden md:block"
        style={{
          boxShadow: "0 0 8px rgba(0, 212, 255, 0.3)",
        }}
      />
    </>
  );
}
