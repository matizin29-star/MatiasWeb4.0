"use client";

import { useEffect, useRef } from "react";
import { useAdaptiveQuality } from "@/hooks/useAdaptiveQuality";

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec2 u_mouse;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

    float t = u_time * 0.04;

    float wave1 = sin(p.x * 4.0 + p.y * 3.0 + t * 1.8) * 0.5 + 0.5;
    float wave2 = cos(p.y * 5.0 - p.x * 3.5 + t * 2.2) * 0.5 + 0.5;
    float wave3 = sin((p.x + p.y) * 3.5 + t * 1.4) * 0.5 + 0.5;
    float wave4 = cos(length(p) * 8.0 - t * 2.5) * 0.5 + 0.5;

    float blend = (wave1 + wave2 + wave3 + wave4) * 0.25;

    float dist = length(p);
    float vignette = 1.0 - smoothstep(0.3, 1.2, dist);

    float mouseInfluence = 0.0;
    if (u_mouse.x > 0.0) {
      vec2 m = (u_mouse - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
      float md = length(p - m);
      mouseInfluence = exp(-md * 3.0) * 0.3;
    }

    float glow = exp(-dist * 3.0) * 0.4;

    vec3 electric = vec3(0.0, 0.4, 1.0);
    vec3 electricLight = vec3(0.2, 0.6, 1.0);
    vec3 accent = vec3(0.0, 0.83, 1.0);
    vec3 dark = vec3(0.02, 0.02, 0.04);

    vec3 color = mix(electric, electricLight, blend);
    color = mix(color, accent, mouseInfluence);
    color = mix(color, dark, smoothstep(0.2, 0.7, dist));
    color += glow * electric * 0.2;
    color += mouseInfluence * accent * 0.2;

    float alpha = (blend * 0.35 + 0.15) * vignette;

    gl_FragColor = vec4(color, alpha);
  }
`;

const sizes = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

export default function ShaderAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const q = useAdaptiveQuality();

  useEffect(() => {
    if (!q.enableShaders) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    const gl = (canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false, antialias: false }) as WebGLRenderingContext | null) ||
      canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false, antialias: false });
    if (!gl) return;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) return;

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");
    const mouseLocation = gl.getUniformLocation(program, "u_mouse");

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, sizes, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const mouse = { x: -1, y: -1 };
    const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let resizeTimeout: ReturnType<typeof setTimeout>;
    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        const isLow = q.tier === "low" || q.tier === "medium";
        const scale = isLow ? Math.min(q.canvasResolutionScale, 0.35) : q.canvasResolutionScale;
        const dpr = isLow ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);
        canvas.width = Math.floor(window.innerWidth * scale) * dpr;
        canvas.height = Math.floor(window.innerHeight * scale) * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        gl.viewport(0, 0, canvas.width, canvas.height);
      }, 200);
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    let animationId: number;
    const startTime = performance.now();
    const fpsInterval = 1000 / (q.tier === "low" || q.tier === "medium" ? Math.min(q.fpsTarget, 30) : q.fpsTarget);
    let lastFrame = 0;

    const render = (now: number) => {
      if (isVisible) {
        const delta = now - lastFrame;
        if (delta >= fpsInterval) {
          lastFrame = now - (delta % fpsInterval);
          gl.uniform1f(timeLocation, (now - startTime) * 0.0007);
          gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
          gl.uniform2f(mouseLocation, mouse.x, mouse.y);
          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }
      }
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(resizeTimeout);
      visibilityObserver.disconnect();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, [q.enableShaders, q.canvasResolutionScale, q.fpsTarget, q.tier]);

  if (!q.enableShaders) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.25] max-md:opacity-[0.1]"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
