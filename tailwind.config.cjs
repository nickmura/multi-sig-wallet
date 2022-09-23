const config = {
  content: ['./src/**/*.{html,js,svelte,ts}'],

  theme: {
    extend: {
      screens: {
        'xs': '335px',
        's': '410px',
      },
      fontFamily: {
        serif: ['Open Sans', 'sans-serif']
      }
    }
  },
  darkMode: 'class',
  plugins: []
  
};

module.exports = config;
