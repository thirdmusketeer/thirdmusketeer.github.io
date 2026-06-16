export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Hanken Grotesk"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      colors: {
        paper: { DEFAULT: '#ffffff', 2: '#f3f4f6' },
        ink: { DEFAULT: '#1a1c20', soft: '#3f444c' },
        muted: '#8b9099',
        rule: '#e3e5e9',
        accent: { DEFAULT: '#4a5568', soft: '#6b7689' },
        link: { DEFAULT: '#3d5a80', soft: '#5b7aa8' },
      },
    },
  },
  plugins: [],
}
