/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            screens: {
                'xs': '480px',
            },
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "panel-border": "var(--panel-border)",
                "panel-background": "var(--panel-background)",
                "panel-hover": "var(--panel-hover)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                accent: "var(--matcha)",
                "brand-yellow": "#FFF500",
            },
            boxShadow: {
                card: "0px 1px 2px rgba(0, 0, 0, 0.08)",
            },
        },
    },
    plugins: [],
}
