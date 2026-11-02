import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["'Plus Jakarta Sans'", "sans-serif"],
        heading: ["'Plus Jakarta Sans'", "sans-serif"],
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        body: ["'Plus Jakarta Sans'", "sans-serif"],
        tech: ["'Space Grotesk'", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      colors: {
        void: "#06080E",
        space: "#0A0E17",
        deep: "#0F172A",
        surface: "#111827",
        "surface-2": "#1E293B",
        border: "rgba(255, 255, 255, 0.08)",
        "border-2": "rgba(255, 255, 255, 0.16)",
        // Silicon Ember & High-Tech Accents
        forge: "#FF5E1E",
        amber: {
          400: "#FBBF24",
          500: "#F59E0B",
          600: "#D97706",
        },
        orange: {
          400: "#FB923C",
          500: "#FF5E1E",
          600: "#EA4E0F",
          700: "#C2410C",
        },
        cobalt: {
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8",
        },
        cyan: {
          400: "#38BDF8",
          500: "#0284C7",
          600: "#0369A1",
        },
        "text-primary": "#F8FAFC",
        "text-secondary": "#94A3B8",
        "text-dim": "#64748B",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          from: { filter: "drop-shadow(0 0 4px rgba(0,212,255,0.4))" },
          to: { filter: "drop-shadow(0 0 16px rgba(0,212,255,0.8))" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
