import type { Config } from "tailwindcss";

/**
 * Professional, trust-forward palette for a B2B government-procurement audience.
 * Deep navy ("ink") as the authority color, a confident blue accent, and a
 * warm signal color ("gold") for value/proof moments. Light-first.
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: "1.25rem", lg: "2rem" },
      screens: { "2xl": "1200px" },
    },
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0b1b3a",
          900: "#081530",
          800: "#0b1b3a",
          700: "#13294f",
          600: "#1d3a66",
        },
        brand: {
          DEFAULT: "#1d63d8",
          50: "#eef4ff",
          100: "#dbe6ff",
          200: "#bccffe",
          300: "#8eabfc",
          400: "#5a7ef8",
          500: "#3457ef",
          600: "#1d63d8",
          700: "#1b4fb0",
          800: "#1c438c",
          900: "#1c3c71",
        },
        gold: {
          DEFAULT: "#c8932f",
          50: "#fbf6ea",
          100: "#f4e6c4",
          400: "#dcab4c",
          500: "#c8932f",
          600: "#a6781f",
        },
        paper: {
          DEFAULT: "#ffffff",
          soft: "#f7f9fc",
          muted: "#eef2f8",
        },
        line: {
          DEFAULT: "#e2e8f2",
          strong: "#cdd7e6",
        },
        // ── Dark "report" surface tokens (GOIR app). Additive; the marketing
        //    site never uses these keys. Border default is pinned below so the
        //    light pages keep their existing borders.
        bg: {
          DEFAULT: "hsl(222 44% 3.5%)",
          subtle: "hsl(222 40% 5%)",
          panel: "hsl(222 34% 7%)",
          raised: "hsl(221 30% 9.5%)",
          hover: "hsl(221 26% 13%)",
        },
        border: {
          DEFAULT: "hsl(220 22% 15%)",
          subtle: "hsl(220 20% 11%)",
        },
        fg: {
          DEFAULT: "hsl(200 30% 97%)",
          muted: "hsl(214 15% 62%)",
          subtle: "hsl(216 14% 42%)",
        },
        accent: {
          DEFAULT: "hsl(184 100% 52%)",
          glow: "hsl(184 100% 64%)",
          soft: "hsl(187 70% 16%)",
        },
        violet: {
          DEFAULT: "hsl(265 89% 66%)",
          soft: "hsl(265 60% 20%)",
        },
        success: { DEFAULT: "hsl(150 80% 50%)", soft: "hsl(150 60% 15%)" },
        warn: { DEFAULT: "hsl(38 92% 58%)", soft: "hsl(38 60% 18%)" },
        danger: { DEFAULT: "hsl(0 84% 62%)", soft: "hsl(0 60% 18%)" },
        info: { DEFAULT: "hsl(210 92% 62%)", soft: "hsl(210 60% 18%)" },
      },
      // Keep the marketing site's light default border despite adding the
      // `border` color scale above (used by the dark report via border-border).
      borderColor: {
        DEFAULT: "#e2e8f2",
      },
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
        serif: ["var(--font-serif)", "Georgia", "ui-serif", "serif"],
      },
      maxWidth: {
        prose: "44rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,27,58,0.04), 0 12px 32px -16px rgba(11,27,58,0.18)",
        lift: "0 24px 60px -28px rgba(11,27,58,0.35)",
        panel: "0 1px 0 hsl(220 30% 16% / 0.6) inset, 0 10px 30px -18px hsl(222 80% 1% / 0.8)",
        glow: "0 0 0 1px hsl(184 100% 52% / 0.45), 0 0 28px -4px hsl(184 100% 52% / 0.5)",
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 20% 0%, hsl(265 89% 66% / 0.10), transparent 40%), radial-gradient(circle at 80% 10%, hsl(184 100% 52% / 0.10), transparent 45%)",
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 0 0 hsl(186 100% 55% / 0.55)" },
          "50%": { boxShadow: "0 0 0 8px hsl(186 100% 55% / 0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out both",
        pulseGlow: "pulseGlow 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
