import type { Config } from "tailwindcss";
import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "var(--bg-primary)",
        "bg-secondary": "var(--bg-secondary)",
        panel: "var(--panel)",
        "panel-border": "var(--panel-border)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "accent-green": "var(--accent-green)",
        "accent-cyan": "var(--accent-cyan)",
        "accent-amber": "var(--accent-amber)",
        danger: "var(--danger)",
      },
      borderRadius: {
        xl: "1rem",
      },
      boxShadow: {
        panel: "0 24px 60px rgba(0, 0, 0, 0.22)",
      },
      backgroundImage: {
        mesh:
          "radial-gradient(circle at top left, rgba(77,220,255,0.18), transparent 40%), radial-gradient(circle at top right, rgba(67,242,166,0.12), transparent 30%), linear-gradient(180deg, rgba(255,255,255,0.03), rgba(255,255,255,0))",
      },
      fontFamily: {
        display: ["var(--font-display)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [animate],
};

export default config;
