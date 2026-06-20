"use client";

import { useEffect, useRef } from "react";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

const CONNECTION_DIST = 120;
const MAX_PARTICLES = 120;

interface Particle {
  x: number; y: number; size: number;
  speedY: number; speedX: number;
  baseSpeedY: number; baseSpeedX: number;
  color: string; layer: number;
  active: boolean;
}

const pool: Particle[] = [];
for (let i = 0; i < MAX_PARTICLES; i++) {
  pool.push({
    x: 0, y: 0, size: 0, speedY: 0, speedX: 0,
    baseSpeedY: 0, baseSpeedX: 0, color: "", layer: 0, active: false,
  });
}

const palette = [
  "rgba(0, 102, 255, 0.45)", "rgba(51, 153, 255, 0.35)",
  "rgba(255, 255, 255, 0.25)", "rgba(0, 212, 255, 0.3)",
];

export default function AntiGravityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const q = useAdaptiveQuality();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let activeCount = 0;
    let isVisible = true;
    const isMobile = window.innerWidth < 768;
    const isLowTier = q.tier === "low" || q.tier === "medium";

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    const mouse = { x: -1000, y: -1000, radius: 250, influence: 0 };
    let mouseThrottled = 0;
    let targetInfluence = 0;

    const resizeCanvas = () => {
      const dpr = isLowTier ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };

    const initParticles = () => {
      for (let i = 0; i < MAX_PARTICLES; i++) pool[i].active = false;
      activeCount = 0;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const count = Math.min(isLowTier ? Math.floor(q.particleCount * 0.6) : q.particleCount, MAX_PARTICLES);
      for (let i = 0; i < count; i++) {
        const p = pool[i];
        const layer = Math.random();
        const isLarge = Math.random() > 0.6;
        const size = isLarge
          ? Math.random() * (isMobile ? 1.5 : 2) + 2
          : Math.random() * (isMobile ? 0.8 : 1.5) + 0.8;
        const speedScale = layer * 0.5 + 0.1;
        p.x = Math.random() * w;
        p.y = Math.random() * h;
        p.size = size * (layer * 0.5 + 0.3);
        p.baseSpeedY = -(Math.random() * 0.4 + 0.06) * speedScale;
        p.baseSpeedX = (Math.random() * 0.2 - 0.1) * speedScale;
        p.speedY = p.baseSpeedY;
        p.speedX = p.baseSpeedX;
        p.color = palette[Math.floor(Math.random() * palette.length)];
        p.layer = layer;
        p.active = true;
      }
      activeCount = count;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now();
      if (now - mouseThrottled < q.mouseThrottleMs) return;
      mouseThrottled = now;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      targetInfluence = 1;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000; mouse.y = -1000;
      targetInfluence = 0;
    };

    const handleResize = () => { resizeCanvas(); initParticles(); };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    initParticles();

    const fpsInterval = 1000 / (isLowTier ? Math.min(q.fpsTarget, 30) : q.fpsTarget);
    const skipConnections = isMobile || isLowTier;
    const mRadius = mouse.radius;
    const mRadius35 = mRadius * 0.35;
    let lastFrame = 0;

    const draw = (now: number) => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      const delta = now - lastFrame;
      if (delta < fpsInterval) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now - (delta % fpsInterval);

      mouse.influence += (targetInfluence - mouse.influence) * 0.08;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < activeCount; i++) {
        const p = pool[i];
        if (!p.active) continue;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < mRadius * mRadius && mouse.influence > 0.01) {
          const dist = Math.sqrt(distSq);
          const force = (mRadius - dist) / mRadius;
          const norm = force * force * mouse.influence;
          const invDist = 1 / (dist || 1);
          const dirX = dx * invDist;
          const dirY = dy * invDist;

          if (dist < mRadius35) {
            const repel = (1 - dist / mRadius35) * norm * 3;
            p.speedX -= dirX * repel * 0.03 * p.layer;
            p.speedY -= dirY * repel * 0.03 * p.layer;
          } else {
            const attract = norm * 0.35;
            p.speedX += dirX * attract * 0.01 * p.layer;
            p.speedY += dirY * attract * 0.01 * p.layer;
          }
        }

        p.speedX += (p.baseSpeedX - p.speedX) * 0.02;
        p.speedY += (p.baseSpeedY - p.speedY) * 0.02;
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.y < -15) { p.y = window.innerHeight + 15; p.x = Math.random() * window.innerWidth; }
        if (p.x < -15) p.x = window.innerWidth + 15;
        else if (p.x > window.innerWidth + 15) p.x = -15;
      }

      if (!skipConnections) {
        const limit = Math.min(activeCount, 60);
        for (let i = 0; i < limit; i++) {
          const a = pool[i];
          if (!a.active) continue;
          const maxJ = Math.min(i + 6, limit);
          for (let j = i + 1; j < maxJ; j++) {
            const b = pool[j];
            if (!b.active) continue;
            const cdx = a.x - b.x;
            const cdy = a.y - b.y;
            if (cdx > CONNECTION_DIST || cdy > CONNECTION_DIST) continue;
            const cd = Math.sqrt(cdx * cdx + cdy * cdy);
            if (cd < CONNECTION_DIST) {
              const alpha = (1 - cd / CONNECTION_DIST) * 0.15;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.strokeStyle = `rgba(0,102,255,${alpha})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      ctx.shadowBlur = 0;
      for (let i = 0; i < activeCount; i++) {
        const p = pool[i];
        if (!p.active) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
    };
  }, [q.particleCount, q.fpsTarget, q.mouseThrottleMs, q.tier]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-85"
      aria-hidden="true"
    />
  );
}
