import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        nexus: {
          bg: "#F4F7F9",
          card: "#FFFFFF",
          border: "#E9ECEF",
          text: "#2B313B",
          textMuted: "#858C96",
          primary: "#4F46E5",
          primaryLight: "#EEF2FF",
        }
      },
    },
  },
  plugins: [],
};
export default config;
