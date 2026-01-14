import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                // 프리텐다드를 기본 폰트로 설정
                sans: ['Pretendard', 'sans-serif'],
            },
        },
    },
    plugins: [],
} satisfies Config