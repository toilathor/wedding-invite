/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        theme: {
          primary: "#A12F0C",
          secondary: "#F4DBCE",
          bg: "#FBF7F5",
          accent: "#D4AF37",
          dark: "#2A1810",
          text: "#333333",
          muted: "#666666",
        },
        'dark-200': '#2A1810',
      },
      fontFamily: {
        playfair: ['PlayfairDisplay', 'Playfair Display', 'serif'],
        birthstone: ['Birthstone', 'cursive'],
        vietnam: ['BeVietnamPro', 'Be Vietnam Pro', 'sans-serif'],
        beVietnamPro: ['BeVietnamPro', 'Be Vietnam Pro', 'sans-serif'],
        phudu: ['Phudu', 'sans-serif'],
        pinyon: ['PinyonScript', 'Pinyon Script', 'cursive'],
        pinyonScript: ['PinyonScript', 'Pinyon Script', 'cursive'],
        prata: ['Prata', 'serif'],
        corinthia: ['Corinthia', 'cursive'],
        muli: ['MuliDisplayVN', 'sans-serif'],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'fadeIn': 'fadeIn 0.4s ease-in-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        }
      }
    },
  },
  plugins: [],
}
