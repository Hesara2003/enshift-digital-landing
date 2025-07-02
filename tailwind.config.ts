import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        purple: {
          50: "#faf5ff",
          100: "#f3e8ff",
          200: "#e9d5ff",
          300: "#d8b4fe",
          400: "#c084fc",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7c3aed",
          800: "#6b21a8",
          900: "#581c87",
          950: "#3b0764",
        },
        pink: {
          50: "#fdf2f8",
          100: "#fce7f3",
          200: "#fbcfe8",
          300: "#f9a8d4",
          400: "#f472b6",
          500: "#ec4899",
          600: "#db2777",
          700: "#be185d",
          800: "#9d174d",
          900: "#831843",
          950: "#500724",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        "carbon-fiber": `
          radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0),
          linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 50%, transparent 60%)
        `,
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
      },
      fontFamily: {
        f1: ["Titillium Web", "Orbitron", "Rajdhani", "system-ui", "sans-serif"],
        "f1-mono": ["GeistMono", "monospace"],
        "f1-display": ["Orbitron", "Rajdhani", "system-ui", "sans-serif"],
        "f1-condensed": ["Rajdhani", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        f1: "0.1em",
        "f1-wide": "0.2em",
        "f1-ultra": "0.3em",
      },
      fontSize: {
        "f1-xs": ["0.75rem", { lineHeight: "1rem", letterSpacing: "0.1em" }],
        "f1-sm": ["0.875rem", { lineHeight: "1.25rem", letterSpacing: "0.1em" }],
        "f1-base": ["1rem", { lineHeight: "1.5rem", letterSpacing: "0.1em" }],
        "f1-lg": ["1.125rem", { lineHeight: "1.75rem", letterSpacing: "0.1em" }],
        "f1-xl": ["1.25rem", { lineHeight: "1.75rem", letterSpacing: "0.1em" }],
        "f1-2xl": ["1.5rem", { lineHeight: "2rem", letterSpacing: "0.15em" }],
        "f1-3xl": ["1.875rem", { lineHeight: "2.25rem", letterSpacing: "0.15em" }],
        "f1-4xl": ["2.25rem", { lineHeight: "2.5rem", letterSpacing: "0.2em" }],
        "f1-5xl": ["3rem", { lineHeight: "1", letterSpacing: "0.2em" }],
        "f1-6xl": ["3.75rem", { lineHeight: "1", letterSpacing: "0.2em" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
