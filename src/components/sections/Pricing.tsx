"use client";

import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { RippleButton } from "@/components/ui/ripple-button";

// WebGL animated shader background (adapted from easemize/animated-glassy-pricing)
const ShaderCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const glProgramRef = useRef<WebGLProgram | null>(null);
  const glBgColorLocationRef = useRef<WebGLUniformLocation | null>(null);
  const glRef = useRef<WebGLRenderingContext | null>(null);

  // Always use our dark bg: #0A0A12 = rgb(10, 10, 18)
  const backgroundColor = [10 / 255, 10 / 255, 18 / 255];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl");
    if (!gl) return;
    glRef.current = gl;

    const vertSrc = `attribute vec2 aPosition; void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }`;
    const fragSrc = `
      precision highp float;
      uniform float iTime;
      uniform vec2 iResolution;
      uniform vec3 uBackgroundColor;
      mat2 rotate2d(float a){ float c=cos(a),s=sin(a); return mat2(c,-s,s,c); }
      float variation(vec2 v1,vec2 v2,float strength,float speed){
        return sin(dot(normalize(v1),normalize(v2))*strength+iTime*speed)/100.0;
      }
      vec3 paintCircle(vec2 uv,vec2 center,float rad,float width){
        vec2 diff=center-uv;
        float len=length(diff);
        len+=variation(diff,vec2(0.,1.),5.,2.);
        len-=variation(diff,vec2(1.,0.),5.,2.);
        float circle=smoothstep(rad-width,rad,len)-smoothstep(rad,rad+width,len);
        return vec3(circle);
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/iResolution.xy;
        uv.x*=1.5; uv.x-=0.25;
        float mask=0.0;
        float radius=.35;
        vec2 center=vec2(.5);
        mask+=paintCircle(uv,center,radius,.035).r;
        mask+=paintCircle(uv,center,radius-.018,.01).r;
        mask+=paintCircle(uv,center,radius+.018,.005).r;
        vec2 v=rotate2d(iTime)*uv;
        // Lemon (#E8E440) and Violet (#7C3AED) tones
        vec3 lemon=vec3(0.91,0.89,0.25);
        vec3 violet=vec3(0.49,0.23,0.93);
        vec3 fgColor=mix(lemon,violet,v.x*0.5+0.5);
        fgColor=mix(fgColor,vec3(v.x,v.y,.7-v.y*v.x),0.4);
        vec3 color=mix(uBackgroundColor,fgColor,mask*0.85);
        color=mix(color,vec3(0.91,0.89,0.25),paintCircle(uv,center,radius,.003).r);
        gl_FragColor=vec4(color,1.);
      }`;

    const compile = (type: number, src: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      return shader;
    };

    const program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, vertSrc));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragSrc));
    gl.linkProgram(program);
    gl.useProgram(program);
    glProgramRef.current = program;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const aPos = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const iTimeLoc = gl.getUniformLocation(program, "iTime");
    const iResLoc = gl.getUniformLocation(program, "iResolution");
    glBgColorLocationRef.current = gl.getUniformLocation(program, "uBackgroundColor");
    gl.uniform3fv(glBgColorLocationRef.current, new Float32Array(backgroundColor));

    let animId: number;
    const render = (t: number) => {
      gl.uniform1f(iTimeLoc, t * 0.001);
      gl.uniform2f(iResLoc, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(render);
    };

    const resize = () => {
      const section = canvas.parentElement;
      canvas.width = section?.offsetWidth ?? window.innerWidth;
      canvas.height = section?.offsetHeight ?? window.innerHeight;
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    resize();
    window.addEventListener("resize", resize);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full block"
      style={{ opacity: 0.55 }}
    />
  );
};

// Check icon
const Check = () => (
  <svg
    width="16" height="16" viewBox="0 0 24 24"
    fill="none" stroke="currentColor" strokeWidth="3"
    strokeLinecap="round" strokeLinejoin="round"
    className="text-lemon flex-shrink-0"
  >
    <path d="M20 6 9 17l-5-5" />
  </svg>
);

interface Plan {
  name: string;
  price: string;
  description: string;
  features: string[];
  cta: string;
  popular?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "499",
    description: "Perfekt für Einzelunternehmer und kleine Projekte.",
    features: [
      "1-Pager Website",
      "Modernes Design, mobiloptimiert",
      "Professionelle Texte für deine Seiten",
      "Kontaktformular",
      "Basic SEO Setup",
      "SSL & Hosting-Setup",
      "1 Monat Support",
    ],
    cta: "Jetzt anfragen",
  },
  {
    name: "Pro",
    price: "999",
    description: "Für wachsende Unternehmen mit professionellem Auftritt.",
    features: [
      "Bis zu 8 Seiten",
      "Custom UI/UX Design",
      "CMS Integration",
      "Advanced SEO",
      "Performance-Optimierung",
      "3 Monate Support",
      "Analytics Setup",
    ],
    cta: "Jetzt anfragen",
    popular: true,
  },
  {
    name: "Premium",
    price: "1.999",
    description: "Full-Custom für anspruchsvolle Projekte ohne Kompromisse.",
    features: [
      "Unbegrenzte Seiten",
      "Full Custom Development",
      "Web-App Features",
      "Enterprise SEO",
      "Core Web Vitals Garantie",
      "12 Monate Wartung",
      "Prioritäts-Support",
    ],
    cta: "Jetzt anfragen",
  },
];

function PricingCard({ plan, index }: { plan: Plan; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      className={`relative flex-1 max-w-sm rounded-2xl flex flex-col px-7 py-8 transition-all duration-300 ${
        plan.popular ? "scale-105" : ""
      }`}
      style={{
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        background: plan.popular
          ? "linear-gradient(135deg, rgba(232,228,64,0.18) 0%, rgba(232,228,64,0.06) 100%)"
          : "linear-gradient(135deg, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.04) 100%)",
        border: plan.popular
          ? "1px solid rgba(232,228,64,0.35)"
          : "1px solid rgba(255,255,255,0.1)",
        boxShadow: plan.popular
          ? "0 0 60px rgba(232,228,64,0.15), 0 8px 40px rgba(0,0,0,0.5)"
          : "0 8px 32px rgba(0,0,0,0.4)",
      }}
    >
      {plan.popular && (
        <div
          className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full text-xs font-mono font-bold text-bg-base whitespace-nowrap"
          style={{
            background: "linear-gradient(135deg, #E8E440, #B8B430)",
            boxShadow: "0 0 20px rgba(232,228,64,0.5)",
          }}
        >
          Beliebteste Wahl
        </div>
      )}

      {/* Plan name */}
      <div className="mb-3">
        <h3
          className="text-5xl font-extralight tracking-tight"
          style={{ color: plan.popular ? "#E8E440" : "#F0F0F8" }}
        >
          {plan.name}
        </h3>
        <p className="text-text-muted text-sm mt-2">{plan.description}</p>
      </div>

      {/* Price */}
      <div className="my-5 flex items-baseline gap-1">
        <span className="text-text-muted text-sm">ab</span>
        <span className="font-heading font-black text-4xl text-text-primary">
          {plan.price}€
        </span>
      </div>

      {/* Divider */}
      <div
        className="w-full h-px mb-5"
        style={{
          background: plan.popular
            ? "linear-gradient(90deg, transparent, rgba(232,228,64,0.3), transparent)"
            : "linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)",
        }}
      />

      {/* Features */}
      <ul className="flex-1 flex flex-col gap-2.5 mb-6">
        {plan.features.map((f) => (
          <li key={f} className="flex items-center gap-2.5 text-sm text-text-muted">
            <Check />
            {f}
          </li>
        ))}
      </ul>

      {/* CTA */}
      <a href="#kontakt">
        <RippleButton
          className={`w-full py-3 rounded-xl font-heading font-semibold text-sm transition-all duration-300 ${
            plan.popular
              ? "text-bg-base"
              : "text-text-primary border border-white/15 hover:border-lemon/30 hover:bg-white/5"
          }`}
          style={
            plan.popular
              ? {
                  background: "linear-gradient(135deg, #E8E440, #B8B430)",
                  boxShadow: "0 0 25px rgba(232,228,64,0.35)",
                }
              : {}
          }
          rippleColor={plan.popular ? "rgba(0,0,0,0.15)" : "rgba(232,228,64,0.15)"}
        >
          {plan.cta}
        </RippleButton>
      </a>
    </motion.div>
  );
}

interface PricesProps {
  starter?: string;
  pro?: string;
  premium?: string;
}

export default function Pricing({ prices }: { prices?: PricesProps }) {
  const livePlans = plans.map((plan) => ({
    ...plan,
    price:
      plan.name === "Starter" ? (prices?.starter ?? plan.price) :
      plan.name === "Pro" ? (prices?.pro ?? plan.price) :
      (prices?.premium ?? plan.price),
  }));
  return (
    <section id="pakete" className="relative py-28 px-6 overflow-hidden">
      {/* WebGL animated background */}
      <ShaderCanvas />

      {/* Overlay to darken canvas further */}
      <div className="absolute inset-0 bg-bg-base/30 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-lemon text-sm tracking-widest uppercase">
            
          </span>
          <h2 className="section-heading mt-3">
            Transparente{" "}
            <span className="bg-gradient-to-r from-yellow-400 to-purple-500 bg-clip-text text-transparent">
                Pakete
              </span>
          </h2>
          <p className="section-subheading">
            Klare Preise, kein Kleingedrucktes. Wähle das Paket, das zu deinem
            Projekt passt.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="flex flex-col md:flex-row gap-6 justify-center items-center md:items-stretch">
          {livePlans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center text-text-muted text-sm mt-10"
        >
          Alle Preise zzgl. MwSt. · Individuelle Anfragen auf Anfrage.
        </motion.p>
      </div>
    </section>
  );
}
