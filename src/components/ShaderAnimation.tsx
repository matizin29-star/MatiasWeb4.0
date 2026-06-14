"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision mediump float;
  uniform vec2 u_resolution;
  uniform float u_time;

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution;
    float t = u_time * 0.05;

    float dist = distance(uv, vec2(0.5));
    float wave1 = sin(uv.x * 6.0 + uv.y * 5.0 + t * 2.5) * 0.5 + 0.5;
    float wave2 = cos(uv.y * 7.0 - uv.x * 4.0 + t * 3.0) * 0.5 + 0.5;
    float wave3 = sin((uv.x + uv.y) * 5.0 + t * 1.8) * 0.5 + 0.5;
    float wave4 = cos(dist * 10.0 - t * 2.0) * 0.5 + 0.5;

    float blend = (wave1 + wave2 + wave3 + wave4) * 0.25;
    float glow = exp(-dist * 2.5) * 0.6;

    vec3 neonBlue = vec3(0.0, 0.83, 1.0);
    vec3 neonPurple = vec3(0.54, 0.17, 0.89);
    vec3 dark = vec3(0.0, 0.0, 0.05);

    vec3 color = mix(neonBlue, neonPurple, blend);
    color = mix(color, dark, smoothstep(0.3, 0.8, dist));
    color += glow * neonBlue * 0.15;

    float alpha = blend * 0.5 + 0.2;

    gl_FragColor = vec4(color, alpha);
  }
`;

const MAX_DPR = 1.5;

export default function ShaderAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 }
    );
    visibilityObserver.observe(canvas);

    const gl =
      (canvas.getContext("webgl2", { alpha: true, premultipliedAlpha: false }) as WebGLRenderingContext | null) ||
      canvas.getContext("webgl", { alpha: true, premultipliedAlpha: false });
    if (!gl) return;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const positionLocation = gl.getAttribLocation(program, "a_position");
    const resolutionLocation = gl.getUniformLocation(program, "u_resolution");
    const timeLocation = gl.getUniformLocation(program, "u_time");

    const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    let resizeTimeout: ReturnType<typeof setTimeout>;

    const resize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        if (!canvas) return;
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
        const width = window.innerWidth;
        const height = window.innerHeight;

        let targetWidth = width;
        let targetHeight = height;

        if (width < 768) {
          targetWidth = Math.floor(width * 0.5);
          targetHeight = Math.floor(height * 0.5);
        }

        canvas.width = targetWidth * dpr;
        canvas.height = targetHeight * dpr;
        canvas.style.width = width + "px";
        canvas.style.height = height + "px";

        gl.viewport(0, 0, canvas.width, canvas.height);
      }, 150);
    };

    resize();
    window.addEventListener("resize", resize);

    let animationId: number;
    const startTime = performance.now();

    const render = (now: number) => {
      if (isVisible) {
        const elapsed = (now - startTime) * 0.7;
        gl.uniform1f(timeLocation, elapsed * 0.001);
        gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      clearTimeout(resizeTimeout);
      visibilityObserver.disconnect();
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.35] max-md:opacity-[0.15]"
      style={{ mixBlendMode: "screen" }}
      aria-hidden="true"
    />
  );
}
