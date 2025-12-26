import React, { useState, useEffect, useRef } from 'react';
import { Profile } from '../data/portfolio';
import { motion } from 'framer-motion';

interface HeroProps {
    profile: Profile;
}

export default function Hero({ profile }: HeroProps) {
    const text1Ref = useRef<HTMLSpanElement>(null);
    const text2Ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const elts = {
            text1: text1Ref.current!,
            text2: text2Ref.current!
        };

        const texts = profile.titles;

        // Morphing parameters
        const morphTime = 1.5; // Slightly slower for smoothness
        const cooldownTime = 1; // Time to read the text

        let textIndex = texts.length - 1;
        let time = new Date();
        let morph = 0;
        let cooldown = cooldownTime;

        elts.text1.textContent = texts[textIndex % texts.length];
        elts.text2.textContent = texts[(textIndex + 1) % texts.length];

        function doMorph() {
            morph -= cooldown;
            cooldown = 0;

            let fraction = morph / morphTime;

            if (fraction > 1) {
                cooldown = cooldownTime;
                fraction = 1;
            }

            setMorph(fraction);
        }

        function setMorph(fraction: number) {
            elts.text2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text2.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            fraction = 1 - fraction;
            elts.text1.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
            elts.text1.style.opacity = `${Math.pow(fraction, 0.4) * 100}%`;

            elts.text1.textContent = texts[textIndex % texts.length];
            elts.text2.textContent = texts[(textIndex + 1) % texts.length];
        }

        function doCooldown() {
            morph = 0;

            elts.text2.style.filter = "";
            elts.text2.style.opacity = "100%";

            elts.text1.style.filter = "";
            elts.text1.style.opacity = "0%";
        }

        let animationId: number;
        function animate() {
            animationId = requestAnimationFrame(animate);

            let newTime = new Date();
            let shouldIncrementIndex = cooldown > 0;
            let dt = (newTime.getTime() - time.getTime()) / 1000;
            time = newTime;

            cooldown -= dt;

            if (cooldown <= 0) {
                if (shouldIncrementIndex) {
                    textIndex++;
                }

                doMorph();
            } else {
                doCooldown();
            }
        }

        animate();

        return () => cancelAnimationFrame(animationId);
    }, [profile.titles]);

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-32 pb-12 md:py-20 bg-background transition-colors duration-300">
            {/* SVG Filter for Gooey Effect */}
            <svg className="absolute w-0 h-0">
                <defs>
                    <filter id="threshold">
                        <feColorMatrix in="SourceGraphic"
                            type="matrix"
                            values="1 0 0 0 0
                                    0 1 0 0 0
                                    0 0 1 0 0
                                    0 0 0 255 -140" />
                    </filter>
                </defs>
            </svg>

            <div className="container mx-auto px-4 z-10">
                <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">

                    {/* Left Column: Text Content */}
                    <div className="w-full md:w-1/2 text-left space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-5xl sm:text-6xl md:text-8xl font-black mb-4 text-text-primary"
                        >
                            {profile.name}
                        </motion.h1>

                        {/* Gooey Morph Container - Left Aligned */}
                        <div
                            className="relative h-24 md:h-32 w-full flex items-center justify-start"
                            style={{ filter: "url(#threshold) blur(0.6px)" }}
                        >
                            <span
                                ref={text1Ref}
                                className="absolute text-4xl sm:text-5xl md:text-7xl font-bold text-text-primary"
                            />
                            <span
                                ref={text2Ref}
                                className="absolute text-4xl sm:text-5xl md:text-7xl font-bold text-text-primary"
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg md:text-2xl text-text-secondary max-w-xl"
                        >
                            {profile.bio}
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                            className="flex flex-col sm:flex-row gap-4 justify-start mt-8"
                        >
                            <a
                                href="https://ik.imagekit.io/shyambala/balamurugan.pdf"
                                onClick={async (e) => {
                                    e.preventDefault();
                                    const url = "https://ik.imagekit.io/shyambala/balamurugan.pdf";
                                    try {
                                        const response = await fetch(url);
                                        const blob = await response.blob();
                                        const blobUrl = window.URL.createObjectURL(blob);
                                        const link = document.createElement('a');
                                        link.href = blobUrl;
                                        link.download = 'Balamurugan_Resume.pdf'; // Desired file name
                                        document.body.appendChild(link);
                                        link.click();
                                        document.body.removeChild(link);
                                        window.URL.revokeObjectURL(blobUrl);
                                    } catch (err) {
                                        console.error('Download failed', err);
                                        window.open(url, '_blank');
                                    }
                                }}
                                className="px-8 py-3 bg-accent rounded-xl text-white font-bold hover:scale-105 transition-transform text-center shadow-lg cursor-pointer"
                            >
                                Download Resume
                            </a>

                        </motion.div>
                    </div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                        className="w-full md:w-1/2 flex justify-center md:justify-end mb-8 md:mb-0"
                    >
                        {/* Panel Style Image Wrapper */}
                        <div className="relative w-60 h-60 sm:w-100 sm:h-200 md:w-[400px] md:h-[400px] rounded-full md:rounded-3xl bg-panel-border p-1">
                            <div className="w-full h-full rounded-full md:rounded-[22px] overflow-hidden bg-panel-background">
                                {profile.image ? (
                                    <img
                                        src={profile.image}
                                        alt={profile.name}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-panel-hover flex items-center justify-center text-accent">
                                        <span className="text-6xl">👤</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}

