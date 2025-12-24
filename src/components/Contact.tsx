import React from 'react';
import { Profile, Section } from '../data/portfolio';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Dribbble, Mail, Instagram } from 'lucide-react';

interface ContactProps {
    profile: Profile;
    section: Section;
}

export default function Contact({ profile, section }: ContactProps) {
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
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-panel-border p-px rounded-xl"
                >
                    <div className="bg-panel-background rounded-[11px] p-6 md:p-12 text-center h-full">
                        <h2 className="text-3xl md:text-5xl font-bold mb-4 text-text-primary">
                            {section.content?.title || 'Get In Touch'}
                        </h2>
                        <p className="text-base md:text-lg text-text-secondary mb-8 max-w-xl mx-auto font-medium">
                            {section.content?.description || "Let's work together on your next project"}
                        </p>

                        <div className="space-y-8">
                            <motion.a
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                href={`mailto:${profile.email}`}
                                className="inline-flex items-center gap-2 px-6 py-3 md:px-8 md:py-4 bg-accent text-white rounded-xl font-bold text-base md:text-lg hover:brightness-110 transition-all shadow-lg"
                            >
                                <Mail />
                                {profile.email}
                            </motion.a>

                            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
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
                                            className="p-3 bg-panel-hover rounded-xl text-text-primary hover:text-accent hover:bg-panel-border transition-all"
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
        </section>
    );
}
