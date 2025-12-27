import React, { useState, useEffect } from 'react';
import { Section } from '../data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
    enabledSections: Section[];
}

export default function Navbar({ enabledSections }: NavbarProps) {
    const [activeSection, setActiveSection] = useState<string>('hero');

    const [scrolled, setScrolled] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            setScrolled(scrollY > 50);

            // Determine active section
            const sections = enabledSections.map(s => s.id);
            if (!sections.includes('hero')) sections.unshift('hero');
            if (sections.includes('contact')) sections.push('contact');

            let current = 'hero';
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    // Midpoint check
                    if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
                        current = section;
                        break;
                    }
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [enabledSections]);

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const targetId = id.replace('#', '');
        setActiveSection(targetId);

        const element = document.querySelector(id);
        if (element) {
            const offset = 80;
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };



    // Prepare nav items
    const navItems = enabledSections.filter(s => s.id !== 'hero' && s.id !== 'contact');

    const activeTab = activeSection;

    return (
        <>
            {/* Top Bar - Minimal */}
            <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 pointer-events-none ${scrolled ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100 py-6'}`}>
                <div className="container mx-auto px-6 relative flex justify-between items-center pointer-events-auto">
                    {/* Logo */}
                    <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="hover:opacity-80 transition-opacity text-text-primary">
                        <div
                            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-text-primary transition-all"
                            style={{
                                maskImage: 'url(/icon/512.svg)',
                                WebkitMaskImage: 'url(/icon/512.svg)',
                                maskSize: 'contain',
                                WebkitMaskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskPosition: 'center'
                            }}
                        />
                    </a>

                    {/* Right Side Actions (Hire Me) */}
                    <div className="flex items-center gap-4">
                        <a
                            href="#contact"
                            onClick={(e) => handleLinkClick(e, '#contact')}
                            className="flex items-center gap-2 bg-text-primary text-background px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg"
                        >
                            Hire Me
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>
            </nav>

            {/* Floating Dock Container */}
            <div className="nav sticky bottom-5 z-50 mx-auto mb-5 rounded-full md:fixed md:bottom-8 md:left-1/2 md:mb-0 md:-translate-x-1/2 flex items-center justify-center pointer-events-none">

                <div className="relative flex items-center">
                    <nav className="border-panel-border bg-panel-background shadow-card relative z-1 flex items-center gap-2 rounded-full border-[2px] p-1 pointer-events-auto">

                        {/* Home */}
                        <a
                            href="#hero"
                            onClick={(e) => handleLinkClick(e, '#hero')}
                            className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'hero' ? 'text-background' : 'text-text-primary hover:text-text-primary'}`}
                        >
                            {activeTab === 'hero' && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-accent rounded-full -z-10"
                                    transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}

                                />
                            )}
                            <span className="relative z-10">Home</span>
                        </a>

                        {/* Dynamic Sections */}
                        {navItems.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                onClick={(e) => handleLinkClick(e, `#${section.id}`)}
                                className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === section.id ? 'text-background' : 'text-text-primary hover:text-text-primary'}`}
                            >
                                {activeTab === section.id && (
                                    <motion.div
                                        layoutId="active-pill"
                                        className="absolute inset-0 bg-accent rounded-full -z-10"
                                        transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                                    />
                                )}
                                <span className="relative z-10">{section.content?.title || section.type}</span>
                            </a>
                        ))}

                        {/* Contact */}
                        <a
                            href="#contact"
                            onClick={(e) => handleLinkClick(e, '#contact')}
                            className={`relative z-10 px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${activeTab === 'contact' ? 'text-background' : 'text-text-primary hover:text-text-primary'}`}
                        >
                            {activeTab === 'contact' && (
                                <motion.div
                                    layoutId="active-pill"
                                    className="absolute inset-0 bg-accent rounded-full -z-10"
                                    transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
                                />
                            )}
                            <span className="relative z-10">Contact</span>
                        </a>

                        {/* Theme Toggle */}
                        <div className="px-1 relative z-10">
                            <ThemeToggle />
                        </div>
                    </nav>


                </div>
            </div>
        </>
    );
}
