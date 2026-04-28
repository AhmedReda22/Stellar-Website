import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Brand palette extracted from the original site
        primary: {
          DEFAULT: "#D50057",
          light: "#e60073",
          dark: "#9d0544",
        },
        secondary: {
          DEFAULT: "#00205C",
          light: "#0d3a8a",
        },
        accent: {
          DEFAULT: "#052460",
          light: "#415a99",
        },
        // Theme-aware surface tokens (used via CSS vars for dark mode)
        surface: {
          DEFAULT: "rgb(var(--surface) / <alpha-value>)",
          muted: "rgb(var(--surface-muted) / <alpha-value>)",
          elevated: "rgb(var(--surface-elevated) / <alpha-value>)",
        },
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          muted: "rgb(var(--ink-muted) / <alpha-value>)",
          subtle: "rgb(var(--ink-subtle) / <alpha-value>)",
        },
        border: {
          DEFAULT: "rgb(var(--border) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-poppins)", "system-ui", "sans-serif"],
        arabic: ["var(--font-cairo)", "var(--font-poppins)", "system-ui", "sans-serif"],
        display: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.75rem",
      },
      boxShadow: {
        soft: "0 2px 10px rgba(0, 0, 0, 0.08)",
        card: "0 8px 30px rgba(0, 0, 0, 0.08)",
        "card-dark": "0 8px 30px rgba(0, 0, 0, 0.4)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-fade": {
          "0%": { opacity: "0", transform: "scale(1.05)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-rtl": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(50%)" },
        },
        pulse: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.6" },
          "50%": { transform: "scale(1.1)", opacity: "0.3" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.7s ease-out forwards",
        "fade-in": "fade-in 0.5s ease-out forwards",
        "slide-fade": "slide-fade 1s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        "marquee-rtl": "marquee-rtl 40s linear infinite",
        "pulse-soft": "pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
