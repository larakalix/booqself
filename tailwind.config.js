/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    darkMode: ["class"],
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/kit/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
        "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
            colors: {
                // --- SIDEBAR ---
                "main-blue": "#1A99D9",
                "link-gray": "#fff",
                "label-gray": "#374151",
                "sub-label-gray": "#6B7280",
                "label-gray-active": "#EBEDF1",
                sidebar: "#181818",
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
                // Chadcn UI
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
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
            borderRadius: {
                lg: `var(--radius)`,
                md: `calc(var(--radius) - 2px)`,
                sm: "calc(var(--radius) - 4px)",
            },
            fontFamily: {
                sans: ["var(--font-sans)", "sans-serif"],
            },
            keyframes: (theme) => ({
                "accordion-down": {
                    from: { height: 0 },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: 0 },
                },
                fadeOut: {
                    "0%": { opacity: 0 },
                    "100%": { opacity: 1 },
                },
            }),
            animation: {
                fade: "fadeOut 0.5s ease-in-out",
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [require("tailwindcss-animate")],
};
