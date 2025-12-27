import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    accentColor: string | null;
    setAccentColor: (color: string) => void;
    resetAccentColor: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('dark'); // Default to dark as per subtext "Dark mode recommended" implied default or preference
    const [accentColor, setAccentColorState] = useState<string | null>(null);

    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme | null;
        if (savedTheme) {
            setTheme(savedTheme);
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setTheme('dark');
            document.documentElement.classList.add('dark');
        } else {
            setTheme('dark');
            // I will replicate the original logic exactly.
            if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                setTheme('dark');
                document.documentElement.classList.add('dark');
            } else {
                setTheme('light');
                document.documentElement.classList.remove('dark');
            }
        }
    }, []);

    const updateBackground = (color: string | null) => {
        const root = document.documentElement;
        if (color) {
            // Mix 5% of accent into neutral background
            root.style.setProperty('--background', `color-mix(in srgb, ${color} 5%, var(--neutral-background))`);
        } else {
            root.style.removeProperty('--background');
        }
    };

    const toggleTheme = () => {
        setTheme(prev => {
            const newTheme = prev === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', newTheme);
            if (newTheme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            return newTheme;
        });
    };

    const setAccentColor = (color: string) => {
        setAccentColorState(color);
        updateBackground(color);
        const root = document.documentElement;
        root.style.setProperty('--matcha', color);
        // Override global text and border colors with the selected accent
        root.style.setProperty('--text-primary', color);
        // For secondary text, we might want slightly less opacity or same color? 
        // User said "all should change to selected color". 
        // Using strict color might hurt hierarchy, but let's follow instruction.
        // Let's set them all to the selected color for the "Monochrome Tint" effect.
        root.style.setProperty('--text-secondary', color);
        root.style.setProperty('--panel-border', color);

        // Adaptive Hover: Mix 15% of accent with background for a subtle, accessible hover state
        root.style.setProperty('--panel-hover', `color-mix(in srgb, ${color} 15%, var(--neutral-background))`);
    };

    const resetAccentColor = () => {
        setAccentColorState(null);
        updateBackground(null);
        const root = document.documentElement;
        root.style.removeProperty('--matcha');
        root.style.removeProperty('--text-primary');
        root.style.removeProperty('--text-secondary');
        root.style.removeProperty('--panel-border');
        root.style.removeProperty('--panel-hover');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, accentColor, setAccentColor, resetAccentColor }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
}
