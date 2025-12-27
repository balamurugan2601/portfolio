import React from 'react';
import { Profile, Section } from '../data/portfolio';
import { motion } from 'framer-motion';

interface AboutProps {
    profile: Profile;
    section: Section;
}

export default function About({ profile, section }: AboutProps) {
    if (!section.enabled) return null;

    return (
        <section id="about" className="py-12 md:py-20 px-4">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="bg-panel-border p-[2px] rounded-[10px] shadow-card relative"
                >
                    <div className="bg-panel-background rounded-[9px] p-8 md:p-12 h-full relative z-1">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6 text-center text-text-primary">
                            {section.content?.title || 'About Me'}
                        </h2>
                        <p className="text-base md:text-xl text-text-secondary leading-relaxed text-center">
                            {profile.bio}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section >
    );
}
