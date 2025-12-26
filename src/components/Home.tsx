import React from 'react';
import { ArrowDown, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { portfolioData } from '../data/portfolio';
import Navbar from './Navbar';
import Hero from './Hero';
import About from './About';
import Skills from './Skills';
import Projects from './Projects';
import Contact from './Contact';
import InteractiveBackground from './InteractiveBackground';

export default function Home() {
    const { profile, sections, skills, projects } = portfolioData;
    const enabledSections = sections.filter(s => s.enabled).sort((a, b) => a.order - b.order);

    const { theme, toggleTheme } = useTheme();

    if (theme === 'light') {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-background text-text-primary text-center p-4 transition-colors duration-300">
                <h1 className="text-5xl sm:text-6xl md:text-8xl font-black mb-6">
                    Light mode? Bold choice.
                </h1>
                <p className="text-xl md:text-2xl text-text-secondary mb-12">
                    Dark mode recommended.
                </p>

                <div className="flex flex-col items-center gap-4 animate-bounce">
                    <ArrowDown size={32} className="text-accent" />
                </div>

                <button
                    onClick={toggleTheme}
                    className="mt-4 p-4 rounded-full bg-panel-background border-2 border-accent text-accent hover:bg-accent hover:text-white transition-all shadow-lg hover:scale-110"
                    aria-label="Switch to Dark Mode"
                >
                    <Moon size={32} />
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen text-text-primary">
            <Navbar enabledSections={enabledSections} />

            <main>
                <Hero profile={profile} />

                {enabledSections.map(section => {
                    if (section.id === 'hero') return null;

                    switch (section.id) {
                        case 'about':
                            return <About key={section.id} profile={profile} section={section} />;
                        case 'skills':
                            return <Skills key={section.id} skills={skills} section={section} />;
                        case 'projects':
                            return <Projects key={section.id} projects={projects} section={section} />;
                        case 'contact':
                            return <Contact key={section.id} profile={profile} section={section} />;
                        default:
                            return null;
                    }
                })}
            </main>

            <footer className="py-8 text-center text-text-secondary text-sm">
                <p>© {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
            </footer>
        </div>
    );
}
