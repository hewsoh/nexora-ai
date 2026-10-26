import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "#0A0A0F",
          800: "#12121A",
          700: "#1A1A24",
          600: "#24242F",
        },
        violet: {
          DEFAULT: "#7C5CFF",
          soft: "#9B84FF",
          deep: "#5B3FE0",
        },
        electric: {
          DEFAULT: "#3B82F6",
          soft: "#60A5FA",
        },
        haze: "#8B8B9E",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      letterSpacing: {
        tightest: "-0.03em",
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      transitionTimingFunction: {
        calm: "cubic-bezier(0.4, 0, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
