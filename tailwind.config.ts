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
        // Pastel surfaces
        cream: "#fdf7f3", // card background
        pagewash: "#f7eceb", // page background
        wash: "#f6e6e3", // warm wash — Categories, Contact
        blush: "#f3dcdf", // Services band, hero panel
        mint: "#dde8dc",
        lilac: "#e3d9e6",
        butter: "#f3e4bf",
        // Accent — dusty rose
        rose: {
          DEFAULT: "#d98a94", // primary — CTAs, pill
          hover: "#c87a85", // hover / micro-labels
          deep: "#a85666", // deep accent
          soft: "#e8a8b0", // soft heart overlay
        },
        // Ink & text
        ink: "#3a2f3a", // headings / primary text
        body: "#5a4a52",
        muted: "#7a6670",
        "muted-soft": "#a08a90",
        eyebrow: "#8a5560",
        "eyebrow-deep": "#6a4a52",
        // Hairlines
        hairline: "#f0dcdc",
        "hairline-rose": "#f0cdd0",
        "hairline-warm": "#e8c8c8",
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
