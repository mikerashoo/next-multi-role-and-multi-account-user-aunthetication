/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./client/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('daisyui') 
  ],

  daisyui: {
    themes: [
      {
        mytheme: {
          
          "primary": "#f7cdb2",
                   
          "secondary": "#cbffad",
                   
          "accent": "#7b6bd6",
                   
          "neutral": "#15181e",
                   
          "base-100": "#f1f3f4",
                   
          "info": "#9be3f3",
                   
          "success": "#64dda5",
                   
          "warning": "#f99810",
                   
          "error": "#f95d62",
          },
      }
    ],
  },
}
