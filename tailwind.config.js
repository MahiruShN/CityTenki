/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors : {
        "weather-primary": "#1C9CF6",
        "weather-primary2": "#1C9CF6",
        "weather-secondary": "#1D71F2",

      },
      backgroundImage: {
        'weather-primary2': 'linear-gradient(180deg, #1D71F2, #1C9CF6, #97CFFC)', // Apple Weather-like gradient
      },
    },

    fontFamily: {
      Roboto: ["Roboto, sans-serif"]
    },

    container: {
      padding: "2rem",
      center: true,
    },

    screens: {
      sm: "640px",
      md: "768px",
    }
  },
  plugins: [],
}

