module.exports = {
  content: ['./src/pages/**/*.{js,ts,jsx,tsx}', './src/frontend/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      aspectRatio: {
        myVideo: '16 / 9',
      },
      fontFamily: {
        pretendard:
          "Pretendard, -apple-system, 'system-ui', system-ui, Roboto, 'Helvetica Neue', 'Segoe UI', 'Apple SD Gothic Neo', 'Noto Sans KR', 'Malgun Gothic', arial, sans-serif;",
      },
      colors: {
        'PC-200': '#609BFF',
        'PC-400': '#6A99CD',
        'PC-600': '#285A92',
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
