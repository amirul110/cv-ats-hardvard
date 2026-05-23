/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        surface: "#f7f9fb",
        "surface-container": "#eceef0",
        "surface-container-low": "#f2f4f6",
        "surface-container-high": "#e6e8ea",
        "surface-container-highest": "#e0e3e5",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#c6c6cd",
        outline: "#76777d",
        primary: "#000000",
        "on-primary": "#ffffff",
        "primary-container": "#131b2e",
        "on-primary-fixed": "#131b2e",
        "on-primary-container": "#7c839b",
        secondary: "#505f76",
        "on-secondary-container": "#54647a",
        "on-surface": "#191c1e",
        "on-surface-variant": "#45464d",
        "primary-fixed": "#dae2fd",
      },
      fontFamily: {
        "cv-body": ["'Source Serif 4'", "Georgia", "serif"],
        "cv-name": ["'Source Serif 4'", "Georgia", "serif"],
        "cv-section-title": ["'Source Serif 4'", "Georgia", "serif"],
        "editor-body": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        "editor-header": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        "editor-label": ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "0.125rem",
        lg: "0.25rem",
        xl: "0.5rem",
        full: "0.75rem",
      },
    },
  },
  plugins: [],
};
