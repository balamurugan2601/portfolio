import React from 'react';
import { Profile, Section } from '../data/portfolio';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Dribbble, Mail, Instagram, RotateCcw } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface ContactProps {
    profile: Profile;
    section: Section;
}

export default function Contact({ profile, section }: ContactProps) {
    const { theme, accentColor, setAccentColor, resetAccentColor } = useTheme();
    const defaultColor = theme === 'dark' ? '#ffffff' : '#111827';
    const displayColor = accentColor || defaultColor;

    const getColorName = (color: string) => {
        const normalized = color.toLowerCase();
        if (normalized === '#b90000') return 'RED COBRA';
        if (normalized === '#558255') return "BUDDHA'S CALM";
        if (normalized === '#3b82f6') return 'TECHNO RAGE';
        if (normalized === '#ffffff' || normalized === '#111827') return 'MONOCHROME';
        return color;
    };

    const colorName = getColorName(displayColor);

    if (!section.enabled) return null;

    const socialLinks = [
        { name: 'github', url: profile.social.github, icon: Github },
        { name: 'linkedin', url: profile.social.linkedin, icon: Linkedin },
        { name: 'twitter', url: profile.social.twitter, icon: Twitter },
        { name: 'dribbble', url: profile.social.dribbble, icon: Dribbble },
        { name: 'instagram', url: profile.social.instagram, icon: Instagram },
    ].filter(link => link.url);

    return (
        <section id="contact" className="py-12 md:py-20 px-4">
            <div className="container mx-auto max-w-5xl">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                    {/* Left Column: Decorative Widgets */}
                    <div className="flex flex-col gap-4 lg:col-span-1">

                        {/* Pantone Card - Display Only */}
                        <div className="relative bg-panel-border p-[2px] rounded-[10px] shadow-card flex-1 min-h-[220px]">
                            <div className="bg-panel-background relative z-1 flex h-full flex-col rounded-[9px] p-3">
                                <div className="flex flex-col gap-3 h-full">
                                    <div
                                        className="flex-1 rounded-md transition-all duration-250 min-h-[120px]"
                                        style={{ backgroundColor: displayColor }}
                                    ></div>
                                    <div className="flex justify-between items-end mt-auto">
                                        <div className="flex-1 overflow-hidden">
                                            <div className="text-text-primary">
                                                <h2 className="font-semibold text-text-primary font-mono text-xs uppercase tracking-[0.2em] inline block mb-2">PANTONE</h2>
                                                <div className="text-lg font-bold uppercase tracking-wider leading-tight">{colorName}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div
                                className="absolute top-0 left-0 h-full w-full rounded-[10px] opacity-10 pointer-events-none mix-blend-overlay"
                                style={{ backgroundColor: displayColor }}
                            ></div>
                        </div>

                        {/* Grayscale Card - Color Picker */}
                        <div className="relative bg-panel-border p-[2px] rounded-[10px] shadow-card flex-1 min-h-[220px]">
                            <div className="bg-panel-background relative z-1 flex h-full flex-col rounded-[9px] p-3">
                                <div className="flex h-full flex-col gap-3">
                                    <div className="relative flex-1 overflow-hidden rounded-md border-[2px] border-panel-border text-text-secondary min-h-[120px] bg-zinc-50 dark:bg-zinc-900/50">
                                        <div className="absolute inset-0 opacity-20">
                                            <svg viewBox="0 0 200 200" fill="none" className="h-full w-full" preserveAspectRatio="none">
                                                <path d="M0 20 H200 M0 40 H200 M0 60 H200 M0 80 H200 M0 100 H200 M0 120 H200 M0 140 H200 M0 160 H200 M0 180 H200" stroke="currentColor" strokeWidth="0.5" />
                                                <path d="M20 0 V200 M40 0 V200 M60 0 V200 M80 0 V200 M100 0 V200 M120 0 V200 M140 0 V200 M160 0 V200 M180 0 V200" stroke="currentColor" strokeWidth="0.5" />
                                            </svg>
                                        </div>
                                        <div className="absolute top-0 left-0 flex h-full w-full items-center justify-center">
                                            <div className="bg-zinc-100 dark:bg-zinc-800 rounded-full p-2 shadow-sm border-[2px] border-panel-border flex gap-3 pointer-events-auto z-10">
                                                {/* Red Preset */}
                                                <button
                                                    onClick={() => setAccentColor('#B90000')}
                                                    className="w-8 h-8 rounded-full bg-[#B90000] border-2 border-transparent hover:scale-110 transition-transform shadow-sm ring-1 ring-black/5"
                                                    title="Set Red"
                                                ></button>

                                                {/* Green Preset */}
                                                <button
                                                    onClick={() => setAccentColor('#558255')}
                                                    className="w-8 h-8 rounded-full bg-[#558255] border-2 border-transparent hover:scale-110 transition-transform shadow-sm ring-1 ring-black/5"
                                                    title="Set Green"
                                                ></button>

                                                {/* Blue Preset */}
                                                <button
                                                    onClick={() => setAccentColor('#3b82f6')}
                                                    className="w-8 h-8 rounded-full bg-[#3b82f6] border-2 border-transparent hover:scale-110 transition-transform shadow-sm ring-1 ring-black/5"
                                                    title="Set Blue"
                                                ></button>


                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center h-8">
                                        <h2 className="font-semibold text-text-primary font-mono text-xs uppercase tracking-[0.2em] whitespace-nowrap">Pick Color</h2>
                                        <button
                                            onClick={resetAccentColor}
                                            className="rounded-full bg-panel-hover p-2 hover:bg-panel-border transition-colors group"
                                            title="Reset to Monochrome"
                                        >
                                            <RotateCcw size={16} className="text-text-primary group-hover:-rotate-180 transition-transform duration-500" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Right Column: Existing Contact Card */}
                    <div className="lg:col-span-2 h-full">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="bg-panel-border p-[2px] rounded-[10px] shadow-card relative h-full flex flex-col"
                        >
                            <div className="bg-panel-background rounded-[9px] relative z-1 p-8 md:p-12 text-center h-full flex flex-col justify-center items-center">
                                <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary">
                                    {section.content?.title || 'Get In Touch'}
                                </h2>
                                <p className="text-base md:text-lg text-text-secondary mb-10 max-w-xl mx-auto font-medium leading-relaxed">
                                    {section.content?.description || "Let's work together on your next project"}
                                </p>

                                <div className="space-y-8 w-full max-w-md">
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={`mailto:${profile.email}`}
                                        className="flex w-full items-center justify-center gap-3 px-6 py-4 bg-accent text-background rounded-xl font-bold text-lg hover:brightness-110 transition-all shadow-lg mx-auto"
                                    >
                                        <Mail size={22} />
                                        <span>{profile.email}</span>
                                    </motion.a>

                                    <div className="flex flex-wrap items-center justify-center gap-4">
                                        {socialLinks.map((link, idx) => {
                                            const Icon = link.icon;
                                            return (
                                                <motion.a
                                                    key={link.name}
                                                    initial={{ opacity: 0, y: 10 }}
                                                    whileInView={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: idx * 0.1 }}
                                                    whileHover={{ y: -5 }}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-3 bg-panel-hover rounded-xl text-text-primary hover:text-accent hover:bg-panel-border transition-all border border-transparent hover:border-panel-border"
                                                >
                                                    <Icon size={24} />
                                                </motion.a>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}
