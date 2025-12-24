/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
                "panel-border": "var(--panel-border)",
                "panel-background": "var(--panel-background)",
                "panel-hover": "var(--panel-hover)",
                "text-primary": "var(--text-primary)",
                "text-secondary": "var(--text-secondary)",
                accent: "var(--matcha)",
            },
        },
    },
    plugins: [],
}
