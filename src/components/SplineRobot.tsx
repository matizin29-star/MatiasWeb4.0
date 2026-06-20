"use client";

import { useEffect, useRef, useState } from "react";

const SPLINE_SCENE_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

function Fallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-electric/30 animate-pulse-subtle" />
      </div>
    </div>
  );
}

export default function SplineRobot() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    let app: any;
    let disposed = false;

    const init = async () => {
      try {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const { Application } = await import("@splinetool/runtime");
        if (disposed) return;

        app = new Application(canvas);
        await app.load(SPLINE_SCENE_URL);
        if (!disposed) {
          setReady(true);
        }
      } catch {
        if (!disposed) setHasError(true);
      }
    };

    init();

    return () => {
      disposed = true;
      if (app && typeof app.dispose === "function") {
        app.dispose();
      }
    };
  }, []);

  if (hasError) return <Fallback />;

  return (
    <div ref={containerRef} className="w-full h-full relative">
      {!ready && (
        <div className="absolute inset-0 z-10">
          <Fallback />
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: "block" }}
      />
    </div>
  );
}
