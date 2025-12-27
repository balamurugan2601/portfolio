import React, { useState, useEffect } from 'react';
import { Project, Section } from '../data/portfolio';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ProjectCard from './ProjectCard';

interface ProjectsProps {
    projects: Project[];
    section: Section;
}

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function Projects({ projects, section }: ProjectsProps) {
    const navigate = useNavigate();

    if (!section.enabled) return null;

    return (
        <section id="projects" className="py-12 md:py-20 px-4 md:px-6 lg:px-8 relative">
            <div className="container mx-auto max-w-6xl">
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-bold mb-4 text-text-primary"
                    >
                        {section.content?.title || 'Projects'}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-base md:text-lg text-text-secondary"
                    >
                        {section.content?.description || 'Here are some of my recent works'}
                    </motion.p>
                </div>

                <motion.div
                    variants={container}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true }}
                    className="flex flex-wrap justify-center -mx-2 md:-mx-3"
                >
                    {projects.map((project) => (
                        <motion.div
                            key={project.id}
                            variants={item}
                            className="w-full md:w-1/2 lg:w-1/3 px-2 md:px-3 mb-4 md:mb-6"
                        >
                            <ProjectCard
                                project={project}
                                onClick={(p) => navigate(`/project/${p.id}`)}
                            />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
