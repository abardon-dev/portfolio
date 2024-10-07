import type { Config } from "tailwindcss";
import tailwindCssAnimate from "tailwindcss-animate";
import tailwindCssContainerQueries from "@tailwindcss/container-queries";
import { breakpoints } from "./utils/constants/breakpoints";

//TODO: Rework on the shadow to be more visible with the current design
const config: Config = {
  content: ["./components/**/*.{ts,tsx,mdx}", "./app/**/*.{ts,tsx,mdx}", "./business/**/*.{ts,tsx,mdx}"],
  theme: {
    container: {
      center: true
    },
    screens: {
      ...breakpoints
    },
    extend: {
      fontSize: {
        "2xs": ["0.625rem", "0.75rem"]
      },
      fontFamily: {
        mono: ["var(--font-bueno-mono)", "Courrier New", "monospace"],
        sans: ["var(--font-inter)", "Arial", "Helvetica", "sans-serif"],
        twemoji: ["var(--font-twemoji)"]
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        third: {
          DEFAULT: "hsl(var(--third))",
          foreground: "hsl(var(--third-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        accent: "-0.1em 0.1em 0 0 hsl(var(--accent)), -0.2em 0.2em 0 0 hsl(var(--accent))",
        "fun-fact": "-0.1em 0.1em 0 0 hsl(var(--secondary)), -0.2em 0.2em 0 0 hsl(var(--secondary))"
      },
      dropShadow: {
        "hover-button": ["-0.1em 0.1em 0 hsl(var(--accent))", "-0.2em 0.2em 0 hsl(var(--accent))"]
      },
      animation: {
        bump: "bump 0.3s ease-out"
      },
      keyframes: {
        bump: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.2)" }
        }
      }
    }
  },
  plugins: [tailwindCssAnimate, tailwindCssContainerQueries]
};
export default config;
