/** @type {import('tailwindcss').Config} */
export default {
  // Tailwind quét các file này để biết bạn dùng class nào (gồm cả .json vì màu khối nằm trong fields.json)
  content: ['./index.html', './src/**/*.{js,jsx,json}'],
  theme: {
    extend: {
      colors: { yu: { DEFAULT: '#0055A4', dark: '#003B73', light: '#E6F0FA' } },
      fontFamily: { sans: ['"Be Vietnam Pro"', '"Noto Sans KR"', 'system-ui', 'sans-serif'] },
    },
  },
  plugins: [],
};
