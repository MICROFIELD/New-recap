import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        studio: {
          ink: "#0B1020",
          panel: "rgba(255,255,255,0.12)",
          border: "rgba(255,255,255,0.22)",
          glow: "#8B5CF6",
          cyan: "#22D3EE",
          pink: "#F472B6"
        }
      },
      boxShadow: {
        glass: "0 24px 80px rgba(15, 23, 42, 0.32)",
        glow: "0 0 48px rgba(139, 92, 246, 0.35)"
      },
      backgroundImage: {
        "studio-gradient":
          "radial-gradient(circle at top left, rgba(34,211,238,0.28), transparent 34%), radial-gradient(circle at top right, rgba(244,114,182,0.28), transparent 30%), linear-gradient(135deg, #0B1020 0%, #17122E 48%, #111827 100%)"
      }
    }
  },
  plugins: []
};

export default config;
