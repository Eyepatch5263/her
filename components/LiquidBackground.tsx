"use client";

import { useEffect, useRef } from "react";

interface RipplePoint {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  opacity: number;
  speed: number;
}

export default function LiquidBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const ripples: RipplePoint[] = [];
    const mouse = { x: width / 2, y: height / 2, lastX: width / 2, lastY: height / 2 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const dist = Math.hypot(currentX - mouse.lastX, currentY - mouse.lastY);

      // Spawn liquid ripple if cursor moves sufficiently
      if (dist > 15) {
        ripples.push({
          x: currentX,
          y: currentY,
          radius: 10,
          maxRadius: Math.min(width, height) * 0.25,
          opacity: 0.6,
          speed: 2.5,
        });

        mouse.lastX = currentX;
        mouse.lastY = currentY;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Create base liquid river flow background gradient
      const baseGradient = ctx.createRadialGradient(
        width / 2 + Math.sin(time) * 120,
        height / 2 + Math.cos(time * 0.8) * 120,
        50,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      baseGradient.addColorStop(0, "rgba(255, 43, 66, 0.12)");
      baseGradient.addColorStop(0.5, "rgba(139, 0, 0, 0.08)");
      baseGradient.addColorStop(1, "rgba(5, 5, 5, 0)");

      ctx.fillStyle = baseGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw flowing liquid river grid mesh distortion lines
      const step = 45;
      ctx.lineWidth = 1;

      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        for (let y = 0; y < height; y += step) {
          // Calculate wave offset
          let waveX = Math.sin(y * 0.008 + time * 1.5) * 12;
          let waveY = Math.cos(x * 0.008 + time * 1.2) * 12;

          // Apply mouse ripple distortions
          for (let i = 0; i < ripples.length; i++) {
            const r = ripples[i];
            const dx = x - r.x;
            const dy = y - r.y;
            const dist = Math.hypot(dx, dy);

            if (dist < r.radius + 60 && dist > r.radius - 60) {
              const factor = Math.sin(((dist - r.radius) / 60) * Math.PI);
              waveX += (dx / (dist || 1)) * factor * 18 * r.opacity;
              waveY += (dy / (dist || 1)) * factor * 18 * r.opacity;
            }
          }

          if (y === 0) {
            ctx.moveTo(x + waveX, y + waveY);
          } else {
            ctx.lineTo(x + waveX, y + waveY);
          }
        }
        ctx.strokeStyle = "rgba(255, 43, 66, 0.04)";
        ctx.stroke();
      }

      // Render and update interactive ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        r.opacity *= 0.96;

        if (r.opacity < 0.01 || r.radius > r.maxRadius) {
          ripples.splice(i, 1);
          continue;
        }

        const rippleGrad = ctx.createRadialGradient(
          r.x,
          r.y,
          Math.max(0, r.radius - 20),
          r.x,
          r.y,
          r.radius
        );
        rippleGrad.addColorStop(0, "rgba(255, 43, 66, 0)");
        rippleGrad.addColorStop(0.5, `rgba(255, 43, 66, ${r.opacity * 0.25})`);
        rippleGrad.addColorStop(1, "rgba(255, 43, 66, 0)");

        ctx.fillStyle = rippleGrad;
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}
