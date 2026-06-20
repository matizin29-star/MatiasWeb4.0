"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

const MAX_PARTICLES = 24;
const MAX_PULSES = 6;
const MAX_CLICK_PARTICLES = 12;
const TRAIL_INTERVAL = 4;

export default function CustomCursor() {
  const coreRef = useRef<HTMLDivElement>(null);
  const holoRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const auraRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const q = useAdaptiveQuality();

  useEffect(() => {
    if (!q.enableCursor) return;
    if (window.innerWidth < 768) return;

    document.body.classList.add("has-custom-cursor");

    const core = coreRef.current;
    const holo = holoRef.current;
    const orbit = orbitRef.current;
    const aura = auraRef.current;
    const canvas = canvasRef.current;
    if (!core || !holo || !orbit || !aura || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isLowTier = q.tier === "low" || q.tier === "medium";
    const dpr = isLowTier ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.scale(dpr, dpr);

    gsap.set(core, { xPercent: -50, yPercent: -50 });
    gsap.set(holo, { xPercent: -50, yPercent: -50 });
    gsap.set(orbit, { xPercent: -50, yPercent: -50 });
    gsap.set(aura, { xPercent: -50, yPercent: -50 });

    const mouse = { x: 0, y: 0 };
    let prevX = 0;
    let prevY = 0;
    let frameCount = 0;
    let nextSpawnSlot = 0;
    let nextPulseSlot = 0;
    let nextClickSlot = 0;

    const particles: {
      x: number; y: number; vx: number; vy: number;
      life: number; decay: number; size: number; colorIdx: number; active: boolean;
    }[] = [];
    for (let i = 0; i < MAX_PARTICLES; i++) {
      particles.push({ x: 0, y: 0, vx: 0, vy: 0, life: 0, decay: 0, size: 0, colorIdx: 0, active: false });
    }

    const pulses: {
      x: number; y: number; radius: number; maxRadius: number; life: number; active: boolean;
    }[] = [];
    for (let i = 0; i < MAX_PULSES; i++) {
      pulses.push({ x: 0, y: 0, radius: 0, maxRadius: 0, life: 0, active: false });
    }

    const clickParticles: {
      x: number; y: number; vx: number; vy: number;
      life: number; maxLife: number; size: number; colorIdx: number; active: boolean;
    }[] = [];
    for (let i = 0; i < MAX_CLICK_PARTICLES; i++) {
      clickParticles.push({ x: 0, y: 0, vx: 0, vy: 0, life: 0, maxLife: 0, size: 0, colorIdx: 0, active: false });
    }

    function spawnParticle(x: number, y: number) {
      let slot = nextSpawnSlot;
      for (let i = 0; i < MAX_PARTICLES; i++) {
        if (!particles[slot].active) { break; }
        slot = (slot + 1) % MAX_PARTICLES;
      }
      nextSpawnSlot = (slot + 1) % MAX_PARTICLES;
      const p = particles[slot];
      const angle = Math.random() * Math.PI * 2;
      p.x = x; p.y = y;
      p.vx = Math.cos(angle) * (0.3 + Math.random() * 0.8) + (Math.random() - 0.5) * 0.5;
      p.vy = Math.sin(angle) * (0.3 + Math.random() * 0.8) + (Math.random() - 0.5) * 0.5;
      p.life = 1;
      p.size = 1 + Math.random() * 2;
      p.colorIdx = Math.random() > 0.3 ? 0 : 1;
      p.decay = 1.5 + Math.random() * 2;
      p.active = true;
    }

    function spawnClickPulse(x: number, y: number) {
      const pulse = pulses[nextPulseSlot];
      nextPulseSlot = (nextPulseSlot + 1) % MAX_PULSES;
      pulse.x = x; pulse.y = y;
      pulse.radius = 2;
      pulse.maxRadius = 14 + Math.random() * 8;
      pulse.life = 1;
      pulse.active = true;

      const cpCount = Math.min(isLowTier ? 3 : 4 + Math.floor(Math.random() * 4), MAX_CLICK_PARTICLES);
      for (let p = 0; p < cpCount; p++) {
        const cp = clickParticles[nextClickSlot];
        nextClickSlot = (nextClickSlot + 1) % MAX_CLICK_PARTICLES;
        const a = Math.random() * Math.PI * 2;
        const spd = isLowTier ? 0.2 + Math.random() * 0.5 : 0.3 + Math.random() * 0.8;
        cp.x = x; cp.y = y;
        cp.vx = Math.cos(a) * spd;
        cp.vy = Math.sin(a) * spd;
        cp.life = 1;
        cp.maxLife = 0.5 + Math.random() * 0.4;
        cp.size = 1 + Math.random() * 1.5;
        cp.colorIdx = Math.random() > 0.25 ? 0 : 1;
        cp.active = true;
      }
    }

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.scale(dpr, dpr);
      }, 150);
    };
    window.addEventListener("resize", onResize, { passive: true });

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      gsap.to(core, {
        x: mouse.x, y: mouse.y,
        duration: 0.03,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onTick = () => {
      const speed = Math.sqrt((mouse.x - prevX) ** 2 + (mouse.y - prevY) ** 2);
      prevX = mouse.x;
      prevY = mouse.y;
      const speedNorm = Math.min(speed / 50, 1);

      gsap.set(aura, { opacity: 0.06 + speedNorm * 0.2, scale: 1 + speedNorm * 0.5 });

      if (speed > 12) {
        frameCount++;
        if (frameCount % TRAIL_INTERVAL === 0) {
          const count = Math.min(Math.floor(speed / 40) + 1, 2);
          for (let i = 0; i < count; i++) {
            spawnParticle(mouse.x + (Math.random() - 0.5) * 4, mouse.y + (Math.random() - 0.5) * 4);
          }
        }
      }

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < MAX_PARTICLES; i++) {
        const p = particles[i];
        if (!p.active) continue;
        p.life -= p.decay * 0.016;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.97;
        p.vy *= 0.97;
        if (p.life <= 0) { p.active = false; continue; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = (p.colorIdx === 0 ? "rgba(0,102,255," : "rgba(255,255,255,") + p.life * 0.6 + ")";
        ctx.fill();
      }

      for (let i = 0; i < MAX_PULSES; i++) {
        const p = pulses[i];
        if (!p.active) continue;
        p.life -= 3.5 * 0.016;
        p.radius += (p.maxRadius - p.radius) * 0.08;
        if (p.life <= 0) { p.active = false; continue; }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0,102,255,${p.life * 0.5})`;
        ctx.lineWidth = 1.5 * p.life;
        ctx.stroke();
      }

      for (let i = 0; i < MAX_CLICK_PARTICLES; i++) {
        const cp = clickParticles[i];
        if (!cp.active) continue;
        cp.life -= (1 / cp.maxLife) * 0.016;
        cp.x += cp.vx;
        cp.y += cp.vy;
        cp.vx *= 0.96;
        cp.vy *= 0.96;
        if (cp.life <= 0) { cp.active = false; continue; }
        ctx.beginPath();
        ctx.arc(cp.x, cp.y, cp.size * cp.life, 0, Math.PI * 2);
        ctx.fillStyle = (cp.colorIdx === 0 ? "rgba(0,102,255," : "rgba(255,255,255,") + cp.life * 0.7 + ")";
        ctx.fill();
      }
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    gsap.ticker.add(onTick);

    const onMouseDown = () => {
      spawnClickPulse(mouse.x, mouse.y);
      gsap.to(core, { scale: 0.35, duration: 0.1, ease: "power2.out", overwrite: "auto" });
      gsap.to(holo, { scale: 1.5, borderColor: "rgba(0,102,255,0.8)", backgroundColor: "rgba(0,102,255,0.08)", duration: 0.1, ease: "power2.out", overwrite: "auto" });
      gsap.to(aura, { scale: 3, opacity: 0.4, duration: 0.1, ease: "power2.out", overwrite: "auto" });
    };
    const onMouseUp = () => {
      gsap.to(core, { scale: 1, duration: 0.25, ease: "power2.out", overwrite: "auto" });
      gsap.to(holo, { scale: 1, borderColor: "rgba(255,255,255,0.3)", backgroundColor: "transparent", duration: 0.25, ease: "power2.out", overwrite: "auto" });
      gsap.to(aura, { scale: 1, opacity: 0.06, duration: 0.3, ease: "power2.out", overwrite: "auto" });
    };
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    const isInteractive = (target: HTMLElement): boolean => {
      return !!(target.closest("a") || target.closest("button") || target.closest("[data-clickable]") || target.closest("input") || target.closest("textarea"));
    };
    const onMouseOverInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isInteractive(target)) {
        gsap.to(core, { scale: 2, backgroundColor: "#FFFFFF", duration: 0.25, ease: "power2.out", overwrite: "auto" });
        gsap.to(holo, { scale: 1.6, borderColor: "rgba(0,102,255,0.6)", backgroundColor: "rgba(0,102,255,0.05)", duration: 0.25, ease: "power2.out", overwrite: "auto" });
        gsap.to(aura, { scale: 2.2, opacity: 0.25, duration: 0.25, ease: "power2.out", overwrite: "auto" });
      }
    };
    const onMouseOutInteractive = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (isInteractive(target)) {
        gsap.to(core, { scale: 1, backgroundColor: "#0066FF", duration: 0.3, ease: "power2.out", overwrite: "auto" });
        gsap.to(holo, { scale: 1, borderColor: "rgba(255,255,255,0.3)", backgroundColor: "transparent", duration: 0.3, ease: "power2.out", overwrite: "auto" });
        gsap.to(aura, { scale: 1, opacity: 0.06, duration: 0.3, ease: "power2.out", overwrite: "auto" });
      }
    };
    document.addEventListener("mouseover", onMouseOverInteractive);
    document.addEventListener("mouseout", onMouseOutInteractive);

    return () => {
      document.body.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimeout);
      gsap.ticker.remove(onTick);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseover", onMouseOverInteractive);
      document.removeEventListener("mouseout", onMouseOutInteractive);
    };
  }, [q.enableCursor, q.tier]);

  if (!q.enableCursor) return null;

  return (
    <>
      <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-[9995] hidden md:block" aria-hidden="true" />
      <div ref={auraRef} className="fixed top-0 left-0 w-[280px] h-[280px] rounded-full pointer-events-none z-[9996] hidden md:block" style={{ background: "radial-gradient(circle, rgba(0,102,255,0.06) 0%, rgba(0,102,255,0.015) 40%, transparent 70%)", opacity: 0.06, willChange: "transform" }} />
      <div ref={orbitRef} className="fixed top-0 left-0 w-11 h-11 rounded-full pointer-events-none z-[9998] hidden md:block" style={{ border: "1px solid rgba(0,102,255,0.06)", willChange: "transform" }} />
      <div ref={holoRef} className="fixed top-0 left-0 w-7 h-7 rounded-full pointer-events-none z-[9998] hidden md:block" style={{ border: "1px solid rgba(255,255,255,0.3)", boxShadow: "0 0 4px rgba(0,102,255,0.1)", willChange: "transform" }} />
      <div ref={coreRef} className="fixed top-0 left-0 w-[3px] h-[3px] rounded-full pointer-events-none z-[9999] hidden md:block" style={{ backgroundColor: "#0066FF", boxShadow: "0 0 4px rgba(0,102,255,0.8), 0 0 12px rgba(0,102,255,0.4)", willChange: "transform" }} />
    </>
  );
}
