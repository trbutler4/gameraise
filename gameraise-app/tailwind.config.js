export const colorPallate = {
  border: "hsl(var(--border))",
  input: "hsl(var(--input))",
  ring: "hsl(var(--ring))",
  background: "hsl(var(--background))",
  foreground: "hsl(var(--foreground))",
  //  primary: {
  //    DEFAULT: "hsl(var(--primary))",
  //    foreground: "hsl(var(--primary-foreground))",
  //  },
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
  mint_green: {
    DEFAULT: "#bee9e8",
    100: "#163f3e",
    200: "#2b7e7d",
    300: "#41bdbb",
    400: "#7fd3d2",
    500: "#bee9e8",
    600: "#cbeded",
    700: "#d8f2f1",
    800: "#e5f6f6",
    900: "#f2fbfa",
  },
  moonstone: {
    DEFAULT: "#62b6cb",
    100: "#0f272d",
    200: "#1e4e5a",
    300: "#2d7587",
    400: "#3c9cb5",
    500: "#62b6cb",
    600: "#82c4d5",
    700: "#a1d3e0",
    800: "#c0e2ea",
    900: "#e0f0f5",
  },
  indigo_dye: {
    DEFAULT: "#1b4965",
    100: "#050e14",
    200: "#0b1d28",
    300: "#102b3c",
    400: "#153a51",
    500: "#1b4965",
    600: "#2b74a1",
    700: "#4a9ccf",
    800: "#86bddf",
    900: "#c3deef",
  },
  columbia_blue: {
    DEFAULT: "#cae9ff",
    100: "#00365c",
    200: "#006bb8",
    300: "#149dff",
    400: "#70c3ff",
    500: "#cae9ff",
    600: "#d6eeff",
    700: "#e0f2ff",
    800: "#ebf7ff",
    900: "#f5fbff",
  },
  picton_blue: {
    DEFAULT: "#5fa8d3",
    100: "#0d2330",
    200: "#1a4760",
    300: "#276a90",
    400: "#358dc0",
    500: "#5fa8d3",
    600: "#7fbadc",
    700: "#9fcbe5",
    800: "#bfdced",
    900: "#dfeef6",
  },
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
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
      colors: colorPallate,
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
      fontFamily: {
        sans: ['JetBrains Mono', 'monospace'],
        serif: [ 'JetBrains Mono', 'monospace'],
        mono: ['JetBrains Mono', 'monospace'],
        bold: ['JetBrains Mono Bold', 'monospace'],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
