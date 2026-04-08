import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        void: {
          DEFAULT: "#050505",
          light: "#0a0a0c",
          lighter: "#111113",
          surface: "#161618",
        },
        gold: {
          DEFAULT: "#C9A961",
          dim: "rgba(201,169,97,0.15)",
          glow: "rgba(201,169,97,0.4)",
          bright: "#D4BC7E",
        },
        brand: {
          red: "#8B2635",
          "red-hover": "#A6384A",
          "red-text": "#C45465",
          glow: "rgba(139,38,53,0.5)",
          subtle: "rgba(139,38,53,0.25)",
        },
        cream: {
          DEFAULT: "#e8e4dc",
          dim: "rgba(232,228,220,0.6)",
        },
        border: "rgba(255,255,255,0.06)",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans SC", "sans-serif"],
        mono: ["Courier Prime", "monospace"],
      },
      animation: {
        "grain": "grain 8s steps(8) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s infinite",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        "fade-in": "fade-in 0.5s ease-out",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      keyframes: {
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "20%": { transform: "translate(1%, -1%)" },
          "40%": { transform: "translate(-1%, 1%)" },
          "60%": { transform: "translate(1%, 1%)" },
          "80%": { transform: "translate(-1%, -1%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { transform: "translateX(-100%) rotate(25deg)" },
          "100%": { transform: "translateX(100%) rotate(25deg)" },
        },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,168,75,0.3)" },
          "50%": { boxShadow: "0 0 30px rgba(212,168,75,0.4), 0 0 40px rgba(212,168,75,0.2)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};

export default config;
