"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const MOUSE_SMOOTH = 0.06;
const AUTO_ROTATE_SPEED = 0.003;
const ORBIT_SPEED = 0.004;
const PULSE_SPEED = 0.6;

export default function Robot3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (typeof window === "undefined") return;
    if (!container.isConnected) return;

    const rect = container.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;
    if (w === 0 || h === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 100);
    camera.position.set(0, 0.5, 6);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
      });
      renderer.setSize(w, h);
      renderer.setPixelRatio(dpr);
      renderer.setClearColor(0x000000, 0);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.5;
      container.appendChild(renderer.domElement);
    } catch {
      return;
    }

    const group = new THREE.Group();
    scene.add(group);

    // --- Core: Torus Knot ---
    const coreGeo = new THREE.TorusKnotGeometry(0.7, 0.25, 128, 16);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#0066FF"),
      emissive: new THREE.Color("#0066FF"),
      emissiveIntensity: 0.15,
      metalness: 0.7,
      roughness: 0.2,
      clearcoat: 0.3,
      transparent: true,
      opacity: 0.9,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    core.rotation.x = Math.PI / 4;
    core.rotation.z = Math.PI / 6;
    group.add(core);

    // --- Inner glow sphere ---
    const glowGeo = new THREE.SphereGeometry(0.5, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color("#0066FF"),
      transparent: true,
      opacity: 0.08,
    });
    const glowSphere = new THREE.Mesh(glowGeo, glowMat);
    group.add(glowSphere);

    // --- Rings ---
    const ringMaterial = (color: string, opacity: number) =>
      new THREE.MeshBasicMaterial({
        color: new THREE.Color(color),
        transparent: true,
        opacity,
        side: THREE.DoubleSide,
        depthWrite: false,
      });

    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.1, 0.015, 32, 64),
      ringMaterial("#0066FF", 0.25)
    );
    ring1.rotation.x = Math.PI / 3;
    ring1.rotation.z = Math.PI / 5;
    group.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.3, 0.01, 32, 64),
      ringMaterial("#3399FF", 0.15)
    );
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.z = Math.PI / 3;
    group.add(ring2);

    const ring3 = new THREE.Mesh(
      new THREE.TorusGeometry(0.9, 0.008, 24, 64),
      ringMaterial("#00D4FF", 0.12)
    );
    ring3.rotation.x = Math.PI / 2;
    ring3.rotation.z = Math.PI / 4;
    group.add(ring3);

    // --- Orbital Particles ---
    const particleCount = 120;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    const particleOrbit = new Float32Array(particleCount * 2);
    const particleSpeeds = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 1.6 + Math.random() * 1.2;
      particlePos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePos[i * 3 + 1] = radius * Math.cos(phi);
      particlePos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      particleOrbit[i * 2] = theta;
      particleOrbit[i * 2 + 1] = phi;
      particleSpeeds[i] = 0.2 + Math.random() * 0.6;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(particlePos, 3));

    const particleMat = new THREE.PointsMaterial({
      color: new THREE.Color("#3399FF"),
      size: 0.04,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    group.add(particles);

    // --- Floor glow ring ---
    const floorRing = new THREE.Mesh(
      new THREE.RingGeometry(1.4, 1.8, 64),
      new THREE.MeshBasicMaterial({
        color: new THREE.Color("#0066FF"),
        transparent: true,
        opacity: 0.06,
        side: THREE.DoubleSide,
        depthWrite: false,
      })
    );
    floorRing.rotation.x = -Math.PI / 2;
    floorRing.position.y = -1.0;
    group.add(floorRing);

    // Mouse tracking
    const mouse = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let isMouseOver = false;

    const onMouseMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      mouse.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      mouse.y = -((e.clientY - r.top) / r.height) * 2 + 1;
      isMouseOver = true;
    };

    const onMouseLeave = () => {
      isMouseOver = false;
    };

    container.addEventListener("mousemove", onMouseMove, { passive: true });
    container.addEventListener("mouseleave", onMouseLeave, { passive: true });

    // Visibility
    let isVisible = true;
    const visibilityObserver = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    visibilityObserver.observe(container);

    // Resize
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const r = container.getBoundingClientRect();
        const nw = r.width;
        const nh = r.height;
        if (nw === 0 || nh === 0) return;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      }, 100);
    };
    window.addEventListener("resize", onResize, { passive: true });

    // Animation
    let animId: number;
    let time = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (!isVisible) return;

      time += 1;

      // Smooth mouse interpolation
      if (isMouseOver) {
        current.x += (mouse.x - current.x) * MOUSE_SMOOTH;
        current.y += (mouse.y - current.y) * MOUSE_SMOOTH;
      } else {
        current.x += (0 - current.x) * 0.02;
        current.y += (0 - current.y) * 0.02;
      }

      // Apply rotation to main group
      group.rotation.x = current.y * 0.3;
      group.rotation.y = current.x * 0.4 + time * AUTO_ROTATE_SPEED;

      // Core pulse
      const pulse = 1 + Math.sin(time * PULSE_SPEED * 0.02) * 0.03;
      core.scale.set(pulse, pulse, pulse);
      coreMat.emissiveIntensity = 0.15 + Math.sin(time * PULSE_SPEED * 0.02) * 0.08;
      glowSphere.scale.set(pulse * 1.1, pulse * 1.1, pulse * 1.1);
      glowMat.opacity = 0.06 + Math.sin(time * PULSE_SPEED * 0.02) * 0.03;

      // Rotate rings
      ring1.rotation.z += 0.003;
      ring2.rotation.x += 0.004;
      ring3.rotation.y += 0.005;

      // Animate particles
      const pos = particles.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        const speed = particleSpeeds[i] * ORBIT_SPEED;
        particleOrbit[i * 2] += speed;
        const theta = particleOrbit[i * 2];
        const phi = particleOrbit[i * 2 + 1];
        const radius = 1.6 + ((i % 10) / 10) * 1.2;
        pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = radius * Math.cos(phi);
        pos[i * 3 + 2] = radius * Math.sin(phi) * Math.sin(theta);
      }
      particles.geometry.attributes.position.needsUpdate = true;

      // Floor ring pulse
      floorRing.material.opacity = 0.04 + Math.sin(time * PULSE_SPEED * 0.02) * 0.03;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);
      visibilityObserver.disconnect();
      container.removeEventListener("mousemove", onMouseMove);
      container.removeEventListener("mouseleave", onMouseLeave);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full"
      style={{ background: "radial-gradient(circle at 50% 50%, rgba(0,102,255,0.04) 0%, transparent 70%)" }}
    />
  );
}
