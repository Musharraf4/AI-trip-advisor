import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
    },
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '7xl': '2400px'
    },
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        'primary-bg': "var(--primary-bg)",
        warning: "var(--warning)",
        'light-bg': "var(--light-bg)",
        outline: "#B3B3B3",
        'primary-text': "#262626",
        'chat-bg': "#475569",
      },
    },
  },
};
export default config;
