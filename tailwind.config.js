/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        button: "var(--bg-button)",
      },
      textColor: {
        accent: "var(--text-accent)",
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        button: "var(--bg-secondary)",
      },
      borderColor: {
        accent: "var(--text-accent)",
        primary: "var(--bg-primary)",
        secondary: "var(--bg-secondary)",
        input: "var(--bg-input)",
      },
    },
  },
  plugins: [],
};
