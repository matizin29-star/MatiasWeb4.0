export type QualityTier = "low" | "medium" | "high" | "ultra";

export interface QualityConfig {
  tier: QualityTier;
  fpsTarget: number;
  canvasResolutionScale: number;
  enableShaders: boolean;
  enableCursor: boolean;
  enableSpline: boolean;
  particleCount: number;
  mouseThrottleMs: number;
}

type QualityListener = (config: QualityConfig) => void;

const TIERS: QualityTier[] = ["low", "medium", "high", "ultra"];

function buildConfig(tier: QualityTier): QualityConfig {
  switch (tier) {
    case "ultra":
      return {
        tier: "ultra",
        fpsTarget: 60,
        canvasResolutionScale: 0.75,
        enableShaders: true,
        enableCursor: true,
        enableSpline: true,
        particleCount: 100,
        mouseThrottleMs: 0,
      };
    case "high":
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
    case "medium":
      return {
        tier: "medium",
        fpsTarget: 30,
        canvasResolutionScale: 0.4,
        enableShaders: false,
        enableCursor: true,
        enableSpline: false,
        particleCount: 35,
        mouseThrottleMs: 32,
      };
    case "low":
      return {
        tier: "low",
        fpsTarget: 24,
        canvasResolutionScale: 0.25,
        enableShaders: false,
        enableCursor: false,
        enableSpline: false,
        particleCount: 20,
        mouseThrottleMs: 50,
      };
  }
}

function detectTier(): QualityTier {
  const isMobile = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const deviceMemory = (navigator as unknown as Record<string, unknown>).deviceMemory as number | undefined;
  const cpuCores = navigator.hardwareConcurrency || 4;
  const conn = (navigator as unknown as Record<string, unknown>).connection as
    | { effectiveType?: string }
    | undefined;

  let score = 0;

  if (deviceMemory) {
    if (deviceMemory >= 8) score += 3;
    else if (deviceMemory >= 4) score += 2;
    else if (deviceMemory >= 2) score += 1;
  } else {
    score += 2;
  }

  if (cpuCores >= 8) score += 3;
  else if (cpuCores >= 4) score += 2;
  else if (cpuCores >= 2) score += 1;

  if (!conn?.effectiveType || conn.effectiveType === "4g") score += 2;
  else if (conn.effectiveType === "3g") score += 1;

  if (isMobile) score -= 1;

  if (score >= 7) return "ultra";
  if (score >= 5) return "high";
  if (score >= 3) return "medium";
  return "low";
}

class AdaptiveQualityEngine {
  private config: QualityConfig;
  private listeners = new Set<QualityListener>();
  private frameAccum = 0;
  private frameCount = 0;
  private lastFrameTime = 0;
  private monitoringId: number | null = null;
  private initialTier: QualityTier;
  private destroyed = false;

  constructor() {
    this.initialTier = detectTier();
    this.config = buildConfig(this.initialTier);
    if (typeof requestAnimationFrame !== "undefined") {
      this.startMonitoring();
    }
  }

  private startMonitoring() {
    const monitor = (time: number) => {
      if (this.destroyed) return;
      if (this.lastFrameTime > 0) {
        this.frameAccum += time - this.lastFrameTime;
        this.frameCount++;
        if (this.frameCount >= 60) {
          this.analyzePerformance();
          this.frameCount = 0;
          this.frameAccum = 0;
        }
      }
      this.lastFrameTime = time;
      this.monitoringId = requestAnimationFrame(monitor);
    };
    this.monitoringId = requestAnimationFrame(monitor);
  }

  private analyzePerformance() {
    if (this.frameCount === 0) return;
    const avg = this.frameAccum / this.frameCount;
    const fps = 1000 / avg;
    const idx = TIERS.indexOf(this.config.tier);

    if (fps < this.config.fpsTarget * 0.6 && idx > 0) {
      this.setTier(TIERS[idx - 1]);
    } else if (fps > this.config.fpsTarget * 1.4 && idx < TIERS.indexOf(this.initialTier)) {
      this.setTier(TIERS[idx + 1]);
    }
  }

  private setTier(tier: QualityTier) {
    this.config = buildConfig(tier);
    this.listeners.forEach((fn) => fn(this.config));
  }

  getConfig(): QualityConfig {
    return { ...this.config };
  }

  subscribe(listener: QualityListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  destroy() {
    this.destroyed = true;
    if (this.monitoringId !== null) cancelAnimationFrame(this.monitoringId);
    this.listeners.clear();
  }
}

let instance: AdaptiveQualityEngine | null = null;

export function getQualityEngine(): AdaptiveQualityEngine {
  if (!instance || (instance as unknown as { destroyed: boolean }).destroyed) {
    instance = new AdaptiveQualityEngine();
  }
  return instance;
}

export function getQualityConfig(): QualityConfig {
  return getQualityEngine().getConfig();
}

export function subscribeToQuality(listener: QualityListener): () => void {
  return getQualityEngine().subscribe(listener);
}
