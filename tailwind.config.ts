import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: "#5B8CFF",
        success: "#16A34A",
        warning: "#F59E0B",
        danger: "#DC2626",
        info: "#0EA5E9"
      },
      boxShadow: {
        card: "0 2px 10px rgba(0,0,0,0.06)"
      },
      borderRadius: {
        xl: "0.9rem",
        "2xl": "1.25rem"
      }
    }
  },
  plugins: []
} satisfies Config;
