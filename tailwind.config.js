import daisyui from 'daisyui';

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      {
        light: {
          primary: "#ff7700",
          secondary: "#ff7700",
          "base-100": "#f6f5ed",
          neutral: "#f3f4f6",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
        dark: {
          primary: "#ff7700",
          secondary: "#ff7700",
          "base-100": "#111827",
          neutral: "#1f2937",
          info: "#0ea5e9",
          success: "#10b981",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
    ],
  },
};
