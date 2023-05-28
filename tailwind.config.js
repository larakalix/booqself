/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/kit/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                // --- SIDEBAR ---
                "main-blue": "#1A99D9",
                "link-gray": "#4B5563",
                "label-gray": "#374151",
                "sub-label-gray": "#6B7280",
                "label-gray-active": "#EBEDF1",
                sidebar: "#F3F4F6",
                "main-gray-border": "#E5E7EB",
                "input-border": "#D1D5DB",
                // --- UI ---
                "black-accent": "#1E354E",
                "blue-accent": "#00B5FF",
                "blue-hover": "#34C4FF",
                "blue-pressed": "#0FA9E8",
                "red-accent": "#FF1F1F",
                "yellow-accent": "#FFB000",
                "gray-1": "#242A33",
                "gray-2": "#828D9E",
                "gray-3": "#DDDFE3",
                "gray-4": "#F1F3F6",
                "gray-image": "#FAFBFD",
                "gray-border": "#E2E5EA",
                "gray-pressed": "##FBFCFD",
                "shadow-color": "#FFFFFF",
                "default-bg": "#FFFFFF",
            },
            height: {
                "dropdown-height": "3.125rem",
            },
            fontSize: {
                "heading-1": "3rem",
                "heading-2": "2rem",
                "heading-3": "1.5rem",
                "heading-4": "1.125rem",
                "heading-5": "1rem",
                "heading-6": "0.75rem",
            },
        },
    },
    plugins: [],
};
