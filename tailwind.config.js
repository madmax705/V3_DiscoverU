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
      colors: {
        blue: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
          950: "#172554",
        },
        gray: {
          5: "#FAFAFA",
          150: "#EBEDF0",
          250: "#E1E4E8",
          450: "#6E7681",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#2563EB" /* blue-600 */,
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1D4ED8" /* blue-700 */,
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#DBEAFE" /* blue-100 */,
          foreground: "#1E40AF" /* blue-800 */,
        },
        accent: {
          DEFAULT: "#3B82F6" /* blue-500 */,
          foreground: "#FFFFFF",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "1rem",
        md: "0.75rem",
        sm: "0.5rem",
        xl: "1.5rem",
        "2xl": "2rem",
        "3xl": "3rem",
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
        gradient: {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center",
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center",
          },
        },
        "confetti-1": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(-100px) rotate(720deg)",
            opacity: "0",
          },
        },
        "confetti-2": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(-120px) rotate(-720deg)",
            opacity: "0",
          },
        },
        "confetti-3": {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "1" },
          "100%": {
            transform: "translateY(-80px) rotate(360deg)",
            opacity: "0",
          },
        },
        "bounce-x": {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        gradient: "gradient 3s ease infinite",
        "confetti-1": "confetti-1 1s ease-out forwards",
        "confetti-2": "confetti-2 1.2s ease-out forwards",
        "confetti-3": "confetti-3 0.9s ease-out forwards",
        "bounce-x": "bounce-x 1s infinite",
      },
      backgroundSize: {
        "200%": "200%",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
