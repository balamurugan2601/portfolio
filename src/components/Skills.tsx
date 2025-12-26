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
                    className="text-3xl md:text-5xl font-bold mb-8 md:mb-12 text-center text-text-primary"
                >
                    Skills
                </motion.h2>
                <div className="flex flex-col gap-6 max-w-4xl mx-auto">
                    {Object.entries(skillsByCategory).map(([category, skills], idx) => (
                        <motion.div
                            key={category}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-panel-border p-px rounded-3xl"
                        >
                            <div className="bg-panel-background rounded-[23px] p-6 md:p-8 flex flex-col md:flex-row items-center gap-6 md:gap-8">
                                <div className="min-w-[140px] text-center md:text-left">
                                    <h3 className="text-xl md:text-2xl font-bold text-text-primary whitespace-nowrap">
                                        {category}
                                    </h3>

                                </div>

                                <div className="hidden md:block w-px h-12 bg-panel-border"></div>

                                <div className="flex flex-wrap justify-center md:justify-start gap-4 flex-1">
                                    {skills.map((skill) => (
                                        <div
                                            key={skill.id}
                                            className="group relative flex items-center justify-center p-2 rounded-xl hover:bg-panel-hover transition-colors duration-300"
                                            title={skill.name}
                                        >
                                            {skill.icon ? (
                                                <img
                                                    src={skill.icon}
                                                    alt={skill.name}
                                                    className="w-12 h-12 md:w-14 md:h-14 object-contain transition-transform group-hover:scale-110"
                                                />
                                            ) : (
                                                <span className="text-lg font-bold text-text-primary group-hover:text-accent">{skill.name}</span>
                                            )}
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
