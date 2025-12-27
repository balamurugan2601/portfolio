import React, { useState, useEffect } from 'react';
import { Section } from '../data/portfolio';
import { motion } from 'framer-motion';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
    enabledSections: Section[];
}

export default function Navbar({ enabledSections }: NavbarProps) {
    const [activeSection, setActiveSection] = useState<string>('hero');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = enabledSections.map(s => s.id);
            if (!sections.includes('hero')) sections.unshift('hero');
            if (sections.includes('contact')) sections.push('contact');

            let current = 'hero';
            for (const section of sections) {
                const el = document.getElementById(section);
                if (!el) continue;

                const rect = el.getBoundingClientRect();
                if (
                    rect.top <= window.innerHeight / 2 &&
                    rect.bottom >= window.innerHeight / 2
                ) {
                    current = section;
                    break;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [enabledSections]);

    const handleLinkClick = (
        e: React.MouseEvent<HTMLAnchorElement>,
        id: string
    ) => {
        e.preventDefault();
        setActiveSection(id.replace('#', ''));

        const el = document.querySelector(id);
        if (!el) return;

        const offset = 80;
        const y = el.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({ top: y, behavior: 'smooth' });
    };

    const navItems = enabledSections.filter(
        s => s.id !== 'hero' && s.id !== 'contact'
    );

    return (
        <>
            {/* Top Header */}
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 pointer-events-none ${
                    scrolled
                        ? '-translate-y-full opacity-0'
                        : 'translate-y-0 opacity-100 py-6'
                }`}
            >
                <div className="container mx-auto px-6 flex justify-between items-center pointer-events-auto">
                    <a
                        href="#hero"
                        onClick={(e) => handleLinkClick(e, '#hero')}
                        className="hover:opacity-80 transition-opacity text-text-primary"
                    >
                        <div
                            className="w-8 h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 bg-text-primary"
                            style={{
                                maskImage: 'url(/icon/512.svg)',
                                WebkitMaskImage: 'url(/icon/512.svg)',
                                maskSize: 'contain',
                                WebkitMaskSize: 'contain',
                                maskRepeat: 'no-repeat',
                                WebkitMaskRepeat: 'no-repeat',
                                maskPosition: 'center',
                                WebkitMaskPosition: 'center',
                            }}
                        />
                    </a>

                    <a
                        href="#contact"
                        onClick={(e) => handleLinkClick(e, '#contact')}
                        className="flex items-center gap-2 bg-text-primary text-background px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider shadow-lg hover:opacity-90"
                    >
                        Hire Me
                        <svg width="12" height="12" viewBox="0 0 12 12">
                            <path
                                d="M1 11L11 1M11 1H3M11 1V9"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                    </a>
                </div>
            </nav>

            {/* Floating Bottom Dock */}
            <div className="fixed bottom-12 sm:bottom-10 md:bottom-12 left-1/2 -translate-x-1/2 z-50 w-full max-w-[calc(100vw-32px)] md:w-auto flex justify-center pointer-events-none pb-[env(safe-area-inset-bottom)]">
                <nav
                    className="
                    border-panel-border bg-panel-background shadow-card
                    flex items-center flex-nowrap
                    rounded-full border-[2px]
                    px-2 py-1
                    pointer-events-auto
                    w-full md:w-auto
                    max-w-full
                    justify-center
                    overflow-hidden
                    "
                >
                    <NavItem
                        label="Home"
                        href="#hero"
                        active={activeSection === 'hero'}
                        onClick={handleLinkClick}
                    />

                    {navItems.map(section => (
                        <NavItem
                            key={section.id}
                            label={section.content?.title || section.type}
                            href={`#${section.id}`}
                            active={activeSection === section.id}
                            onClick={handleLinkClick}
                        />
                    ))}

                    <NavItem
                        label="Contact"
                        href="#contact"
                        active={activeSection === 'contact'}
                        onClick={handleLinkClick}
                    />

                    <div className="w-px h-4 bg-panel-border opacity-40 mx-1 shrink-0" />

                    <div className="flex items-center justify-center shrink-0 px-1.5">
                        <ThemeToggle />
                    </div>
                </nav>
            </div>
        </>
    );
}

/* ---------------------------------- */
/* Nav Item (Micro-polished)           */
/* ---------------------------------- */

function NavItem({
    label,
    href,
    active,
    onClick,
}: {
    label: string;
    href: string;
    active: boolean;
    onClick: (e: React.MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
    return (
        <a
            href={href}
            onClick={(e) => onClick(e, href)}
            className="
            relative flex items-center justify-center
            px-3 py-1.5 md:px-4 md:py-2
            rounded-full
            text-xs md:text-sm
            font-medium
            whitespace-nowrap
            shrink min-w-0
            transition-colors
            text-text-primary
            "
        >
            {active && (
                <motion.div
                    layoutId="active-pill"
                    className="
                        absolute inset-0
                        bg-accent rounded-full
                        -translate-y-[0.5px]
                    "
                    transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 40,
                        mass: 1,
                    }}
                />
            )}

            <span className={`relative z-10 ${active ? 'text-background' : ''}`}>
                {label}
            </span>
        </a>
    );
}
