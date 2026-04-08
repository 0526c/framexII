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
          DEFAULT: "#d4a84b",
          dim: "rgba(212,168,75,0.15)",
          glow: "rgba(212,168,75,0.3)",
          bright: "#e8c56a",
        },
        brand: {
          red: "#7c2d2d",      // 暗红色
          dark: "#5c1a1a",     // 更深
          glow: "rgba(124,45,45,0.4)",
        },
        cream: {
          DEFAULT: "#e8e4dc",
          dim: "rgba(232,228,220,0.6)",
        },
        border: "rgba(255,255,255,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
