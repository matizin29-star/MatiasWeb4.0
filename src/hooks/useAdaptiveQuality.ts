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

export function useAdaptiveQuality(): QualityConfig {
  const config = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
  return config;
}
