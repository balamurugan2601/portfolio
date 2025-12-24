import React from 'react';
import { Skill, Section } from '../data/portfolio';
import { motion } from 'framer-motion';

interface SkillsProps {
    skills: Skill[];
    section: Section;
}

export default function Skills({ skills, section }: SkillsProps) {
    if (!section.enabled) return null;

    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, typeof skills>);

    return (
        <section id="skills" className="py-12 md:py-20 px-4">
            <div className="container mx-auto max-w-6xl">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center text-[#1e1e1e]"
                >
                    Skills
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {Object.entries(skillsByCategory).map(([category, skills], idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-panel-border p-px rounded-lg hover:translate-x-1 hover:-translate-y-1 transition-transform"
                        >
                            <div className="bg-panel-background rounded-[7px] p-5 md:p-6 h-full">
                                <h3 className="text-2xl font-bold mb-4 text-text-primary border-b-[2px] border-panel-border pb-2 inline-block">{category}</h3>
                                <div className="space-y-3">
                                    {skills.map((skill) => (
                                        <div key={skill.id} className="flex items-center group">
                                            <div className="flex items-center gap-3">
                                                {skill.icon && <span className="text-2xl group-hover:scale-125 transition-transform text-accent">{skill.icon}</span>}
                                                <span className="text-lg font-bold text-text-secondary">{skill.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
