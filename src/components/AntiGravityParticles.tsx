"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  color: string;
  depth: number;
  originalX: number;
  originalY: number;
}

const MAX_DPR = 1.5;

export default function AntiGravityParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let isVisible = true;

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 40 : 80;
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const resizeCanvas = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.scale(dpr, dpr);
    };

    const colors = [
      "rgba(0, 212, 255, 0.3)",
      "rgba(138, 43, 226, 0.3)",
      "rgba(255, 255, 255, 0.25)",
    ];

    const initParticles = () => {
      particles = [];
      const w = window.innerWidth;
      const h = window.innerHeight;
      for (let i = 0; i < particleCount; i++) {
        const depth = Math.random();
        const size = Math.random() * (isMobile ? 1.5 : 2) + 0.5;
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: size * (depth * 0.8 + 0.2),
          speedY: -(Math.random() * 0.5 + 0.1) * (depth * 0.8 + 0.2),
          speedX: (Math.random() * 0.2 - 0.1) * (depth * 0.8 + 0.2),
          color: colors[Math.floor(Math.random() * colors.length)],
          depth,
          originalX: 0,
          originalY: 0,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    resizeCanvas();
    initParticles();

    const draw = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(draw);
        return;
      }
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y += p.speedY;
        p.x += p.speedX;

        if (p.y < -10) {
          p.y = window.innerHeight + 10;
          p.x = Math.random() * window.innerWidth;
        }
        if (p.x < -10 || p.x > window.innerWidth + 10) {
          p.x = Math.random() * window.innerWidth;
        }

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const dirX = dx / distance;
          const dirY = dy / distance;
          const factor = force * 35 * p.depth;
          p.x -= dirX * factor;
          p.y -= dirY * factor;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        if (p.depth > 0.75 && !isMobile) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = p.color;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.fillStyle = p.color;
        ctx.fill();
      }

      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-60"
      aria-hidden="true"
    />
  );
}
