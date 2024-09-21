import type { Config } from "tailwindcss";
import tailwindCssAnimate from "tailwindcss-animate";
import { breakpoints } from "./utils/constants/breakpoints";

const config: Config = {
  content: ["./components/**/*.{ts,tsx,mdx}", "./app/**/*.{ts,tsx,mdx}", "./business/**/*.{ts,tsx,mdx}"],
  theme: {
    screens: {
      ...breakpoints
    },
    extend: {
      fontFamily: {
        mono: ["var(--font-bueno-mono)", "Courrier New", "monospace"],
        sans: ["var(--font-inter)", "Arial", "Helvetica", "sans-serif"]
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
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      boxShadow: {
        "hover-button": "-0.1em 0.1em 0 0 var(--hover), -0.2em 0.2em 0 0 var(--hover)"
      }
    }
  },
  plugins: [tailwindCssAnimate]
};
export default config;
