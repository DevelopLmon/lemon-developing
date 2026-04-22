"use client";

import { motion } from "framer-motion";
import TypewriterText from "@/components/ui/TypewriterText";
import { useEffect, useRef } from "react";

const PARTICLE_COUNT = 60;

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);

    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      r: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(16,157,230,${p.alpha})`;
        ctx.fill();
      });

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(16,157,230,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      animId = requestAnimationFrame(draw);
    };

    draw();

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ opacity: 0.6 }}
    />
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-base">
      {/* Background gradients */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(58,150,237,0.2) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 80% 80%, rgba(16,157,230,0.08) 0%, transparent 50%)",
        }}
      />

      <ParticleCanvas />

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto px-6">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-text-muted mb-8"
        >
          <span
            className="w-2 h-2 rounded-full #109de6 animate-glow-pulse"
            style={{ boxShadow: "0 0 8px rgba(16,157,230,0.8)" }}
          />
          Webdesign & Development — Deutschland
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="font-heading font-black text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-6"
        >
          Wir bauen{" "}
          <span className="text-gradient-blue-400">digitale</span>
          <br />
          <span className="text-gradient-violet">Erlebnisse.</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="font-mono text-xl md:text-2xl text-text-muted mb-10 h-8"
        >
          <TypewriterText
            texts={[
              "Wir entwickeln performante Websites.",
              "Wir gestalten beeindruckende Interfaces.",
              "Wir optimieren deine SEO-Performance.",
              "Wir bringen deine Ideen zum Leben.",
            ]}
            speed={60}
          />
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a href="#pakete" className="btn-primary text-base px-8 py-4">
            Jetzt starten
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </a>
          <a href="#portfolio" className="btn-ghost text-base px-8 py-4">
            Portfolio ansehen
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.1 }}
          className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
        >
          {[
            { value: "100%", label: "Festpreisgarantie" },
            { value: "100%", label: "Zufriedenheit" },
            { value: "3×", label: "Schneller" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-heading font-black text-3xl text-gradient-blue-400">
                {stat.value}
              </div>
              <div className="text-text-muted text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>


    </section>
  );
}
