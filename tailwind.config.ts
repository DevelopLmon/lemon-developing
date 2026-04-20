import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-base": "#0A0A12",
        "bg-card": "rgba(255,255,255,0.06)",
        lemon: "#E8E440",
        "lemon-dim": "#B8B430",
        violet: "#7C3AED",
        "violet-bright": "#9D5FF5",
        "text-primary": "#F0F0F8",
        "text-muted": "#8892A4",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "lemon-glow":
          "radial-gradient(ellipse at center, rgba(232,228,64,0.15) 0%, transparent 70%)",
        "violet-glow":
          "radial-gradient(ellipse at center, rgba(124,58,237,0.2) 0%, transparent 70%)",
      },
      boxShadow: {
        "lemon-sm": "0 0 15px rgba(232,228,64,0.3)",
        "lemon-md": "0 0 30px rgba(232,228,64,0.4)",
        "lemon-lg": "0 0 60px rgba(232,228,64,0.25)",
        "violet-sm": "0 0 15px rgba(124,58,237,0.3)",
        "violet-md": "0 0 30px rgba(124,58,237,0.4)",
        glass: "0 8px 32px rgba(0,0,0,0.4)",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "0.6" },
          "50%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        "cursor-blink": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "cursor-blink": "cursor-blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};

export default config;
