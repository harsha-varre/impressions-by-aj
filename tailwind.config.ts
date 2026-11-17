import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base surfaces
        cream: "#fdf7f3",
        wash: "#f6e6e3",
        blush: "#f3dcdf",
        // Pastel accents
        mint: "#dde8dc",
        lilac: "#e3d9e6",
        butter: "#f3e4bf",
        // Brand rose
        rose: {
          DEFAULT: "#d98a94",
          hover: "#c87a85",
          deep: "#a85666",
        },
        // Text
        ink: "#2d2528",
        body: "#5a4a52",
        muted: "#7a6670",
        hairline: "#f0dcdc",
      },
      fontFamily: {
        display: ["var(--font-caslon)", "Georgia", "serif"],
        sans: ["var(--font-archivo)", "system-ui", "sans-serif"],
        script: ["var(--font-parisienne)", "cursive"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.25em",
      },
      maxWidth: {
        shell: "1200px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
