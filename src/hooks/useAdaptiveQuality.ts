"use client";

import { useSyncExternalStore } from "react";
import {
  getQualityConfig,
  subscribeToQuality,
  type QualityConfig,
} from "@/lib/adaptive-quality";

function subscribe(cb: () => void) {
  return subscribeToQuality(() => cb());
}

function getSnapshot(): QualityConfig {
  return getQualityConfig();
}

function getServerSnapshot(): QualityConfig {
  return {
    tier: "high",
    fpsTarget: 60,
    canvasResolutionScale: 0.6,
    enableShaders: true,
    enableCursor: true,
    enableSpline: true,
    particleCount: 70,
    mouseThrottleMs: 16,
  };
}

export function useAdaptiveQuality(): QualityConfig {
  const config = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return config;
}
