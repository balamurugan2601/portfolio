import React from 'react';
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
