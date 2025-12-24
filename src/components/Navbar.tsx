import React, { useState, useEffect } from 'react';
import { Section } from '../data/portfolio';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
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
                <div className="flex justify-between items-center">
                    <a href="#hero" className="text-xl font-bold text-text-primary hover:text-text-secondary transition-colors">
                        Portfolio
                    </a>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-8">
                        {enabledSections.map((section) => (
                            section.id !== 'hero' && (
                                <a
                                    key={section.id}
                                    href={`#${section.id}`}
                                    className="text-sm font-bold text-text-primary hover:text-accent transition-colors capitalize"
                                >
                                    {section.type}
                                </a>
                            )
                        ))}

                    </div>

                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 md:hidden">
                        <ThemeToggle />
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="p-2 text-text-primary bg-panel-background border border-panel-border rounded-md hover:bg-panel-hover transition-all"
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
                        className="md:hidden bg-background border-b border-panel-border absolute top-full left-0 right-0 overflow-hidden"
                    >
                        <div className="flex flex-col p-4 gap-2">
                            {enabledSections.map((section) => (
                                section.id !== 'hero' && (
                                    <a
                                        key={section.id}
                                        href={`#${section.id}`}
                                        onClick={(e) => handleLinkClick(e, `#${section.id}`)}
                                        className="text-lg font-bold text-text-primary py-3 px-4 hover:bg-panel-hover hover:text-accent rounded-lg transition-colors capitalize"
                                    >
                                        {section.type}
                                    </a>
                                )
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}

