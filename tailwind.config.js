module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/frontend/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      animation: {
        'pulse-fast': 'pulse 0.7s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      fontFamily: {
        pretendard:
          "Pretendard, -apple-system, 'system-ui', system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', arial, sans-serif;",
      },
      colors: {
        'PC-200': '#609BFF',
        'PC-400': '#3487E2',
        'PC-600': '#094C99',
        'PC-800': '#082E59',
        Kakao: '#FEE500',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/typography'),
  ],
};
