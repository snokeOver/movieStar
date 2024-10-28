import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";
import colors from "tailwindcss/colors";
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: colors.gray[800],
          bg: colors.sky[400],
          hover: colors.sky[300],
          border: colors.sky[700],
          text: colors.sky[300],
          dark: colors.gray[800],
          ["dark-hover"]: colors.gray[900],
        },
        secondary: {
          DEFAULT: colors.gray[200],
          bg: colors.gray[400],
          hover: colors.gray[300],
          border: colors.gray[700],
          text: colors.gray[400],
          dark: colors.gray[800],
          ["dark-hover"]: colors.gray[900],
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
export default config;
