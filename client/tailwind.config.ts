import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#40E0D0", // turquoise
          DEFAULT: "#2BB9A3", // teal
          dark: "#1E3A8A", // deep blue
        },
      },
    },
  },
  plugins: [],
};
export default config;
