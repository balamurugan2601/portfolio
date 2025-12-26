import React, { useState, useEffect } from 'react';
import { Section } from '../data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
    enabledSections: Section[];
}

export default function Navbar({ enabledSections }: NavbarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu when clicking a link
    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.querySelector(id);
        element?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/90 backdrop-blur-md border-b-[1px] border-panel-border py-4' : 'bg-transparent py-4 md:py-6'}`}>
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center relative">
                    <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="text-2xl font-bold display-font text-text-primary tracking-tighter hover:text-text-secondary transition-colors">
                        Balaa<span className="text-accent">.me</span>
                    </a>

                    {/* Desktop Menu - Centered */}
                    <div className="hidden md:flex items-center gap-6 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        {enabledSections.map((section) => (
                            section.id !== 'hero' && section.id !== 'contact' && (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    onClick={(e) => handleLinkClick(e, `#${section.id}`)}
                                    className="text-xs font-bold text-text-primary hover:text-accent transition-colors uppercase tracking-widest"
                                >
                                    {section.content?.title || section.type}
                                </a>
                            )
                        ))}
                    </div>

                    {/* Right Side Actions */}
                    <div className="flex items-center gap-4">
                        <ThemeToggle />

                        <a
                            href="#contact"
                            onClick={(e) => handleLinkClick(e, '#contact')}
                            className="hidden md:flex items-center gap-2 bg-accent text-white px-6 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider hover:opacity-90 transition-colors"
                        >
                            Hire Me
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-text-primary bg-panel-background border border-panel-border rounded-md hover:bg-panel-hover transition-all"
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-background border-b border-panel-border absolute top-full left-0 right-0 overflow-hidden shadow-2xl"
                    >
                        <div className="flex flex-col p-6 gap-4">
                            {enabledSections.map((section) => (
                                section.id !== 'hero' && section.id !== 'contact' && (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        onClick={(e) => handleLinkClick(e, `#${section.id}`)}
                                        className="text-sm font-bold text-text-primary py-3 px-4 hover:bg-panel-hover hover:text-accent rounded-xl transition-all uppercase tracking-widest flex items-center justify-between group"
                                    >
                                        {section.content?.title || section.type}
                                        <ArrowRight size={16} className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                                    </a>
                                )
                            ))}

                            <div className="h-px bg-panel-border my-2" />

                            <a
                                href="#contact"
                                onClick={(e) => handleLinkClick(e, '#contact')}
                                className="flex items-center justify-center gap-2 bg-accent text-white px-6 py-4 rounded-xl font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-colors w-full"
                            >
                                Hire Me
                                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

