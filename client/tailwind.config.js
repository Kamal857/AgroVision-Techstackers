/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#10B981", // Emerald 500
                secondary: "#34D399", // Emerald 400
                background: "#F0FDF4", // Emerald 50
                surface: "#FFFFFF",
                text: "#1F2937", // Gray 800
                textLight: "#6B7280", // Gray 500
                warning: "#F59E0B",
                danger: "#EF4444",
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
            }
        },
    },
    plugins: [],
}
