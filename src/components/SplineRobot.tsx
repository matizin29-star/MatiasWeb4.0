"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";

const Spline = dynamic(() => import("@splinetool/react-spline"), {
  ssr: false,
  loading: () => <SplineRobotFallback />,
});

const SPLINE_SCENE_URL = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode";

function SplineRobotFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 rounded-full border border-white/5 flex items-center justify-center">
        <div className="w-4 h-4 rounded-full bg-electric/30 animate-pulse-subtle" />
      </div>
    </div>
  );
}

export default function SplineRobot() {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const onLoad = useCallback(() => {
    setLoaded(true);
  }, []);

  if (hasError) {
    return <SplineRobotFallback />;
  }

  return (
    <div className="w-full h-full relative">
      {!loaded && (
        <div className="absolute inset-0 z-10">
          <SplineRobotFallback />
        </div>
      )}
      <Spline
        scene={SPLINE_SCENE_URL}
        onLoad={onLoad}
        onError={() => setHasError(true)}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}
