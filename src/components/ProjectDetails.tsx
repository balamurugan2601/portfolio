import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioData, ProjectImage } from '../data/portfolio';
import { ArrowLeft, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(portfolioData.projects.find(p => p.id === id));
    const [selectedImage, setSelectedImage] = useState<ProjectImage | null>(null);

    // Update project if data changes or id changes
    useEffect(() => {
        setProject(portfolioData.projects.find(p => p.id === id));
        window.scrollTo(0, 0); // Scroll to top on navigation
    }, [id]);

    if (!project) {
        return <div className="min-h-screen flex items-center justify-center text-text-primary">Project not found</div>;
    }

    // Default gallery if none exists
    const gallery = project.gallery || [];

    return (
        <div className="min-h-screen bg-background text-text-primary font-sans p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 group text-text-secondary hover:text-accent transition-colors"
                    >
                        <div className="p-2 bg-panel-border rounded-full group-hover:bg-panel-hover transition-colors">
                            <ArrowLeft size={20} />
                        </div>
                        <span className="font-medium">Back to Home</span>
                    </button>

                    <div className="text-right">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2">{project.title}</h1>
                        <p className="text-xl text-accent font-bold uppercase tracking-widest">{project.role} • {project.year}</p>
                    </div>
                </header>

                {/* CSS Column Masonry Layout */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 relative">

                    {/* Unified Info Block (About + Tools + Link) */}
                    <div className="break-inside-avoid mb-6 bg-panel-border p-px rounded-lg">
                        <div className="bg-panel-background rounded-[7px] p-8 flex flex-col gap-8">

                            {/* About Section */}
                            <div>
                                <h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-text-secondary">About Project</h3>
                                <p className="text-text-primary leading-relaxed text-lg font-medium">{project.description}</p>
                            </div>

                            {/* Tools Section */}
                            {project.tags && (
                                <div>
                                    <h3 className="text-lg font-bold uppercase tracking-wider mb-4 text-text-secondary">{project.tagsLabel || 'Technologies'}</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tags.map(tag => (
                                            <span key={tag} className="px-3 py-1 bg-panel-hover rounded-lg text-sm font-bold text-text-primary border border-panel-border">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Visit Link Section */}
                            {project.link && (
                                <a
                                    href={project.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="block w-full bg-[#111] text-white rounded-lg p-6 hover:bg-[#1a1a1a] transition-colors shadow-lg group cursor-pointer relative overflow-hidden border border-[#333] mt-2"
                                >
                                    <div className="relative z-10 flex flex-col gap-4">
                                        <div className="flex justify-between items-center">
                                            <h3 className="text-xl font-bold leading-tight text-white">Visit Figma File</h3>
                                            <div className="bg-white text-black p-2 rounded-full transition-transform group-hover:rotate-45">
                                                <ArrowLeft className="rotate-[135deg]" size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Gallery Items */}
                    {gallery.map((img, idx) => (
                        <GalleryItem
                            key={idx}
                            img={img}
                            index={idx}
                            onClick={() => setSelectedImage(img)}
                        />
                    ))}

                    {/* Fallback if no images */}
                    {gallery.length === 0 && !project.link && (
                        <div className="break-inside-avoid mb-6 bg-panel-hover rounded-lg p-12 flex items-center justify-center text-text-secondary flex-col gap-4">
                            <span className="text-4xl">📷</span>
                            <p className="font-medium">No gallery images.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Image Detail Overlay */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                        onClick={() => setSelectedImage(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative max-w-5xl w-full bg-panel-background rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full z-10 transition-colors backdrop-blur-sm"
                            >
                                <X size={24} />
                            </button>

                            <div className="flex-1 bg-black flex items-center justify-center relative min-h-[400px]">
                                <img
                                    src={selectedImage.url}
                                    alt={selectedImage.caption}
                                    className="max-h-full max-w-full object-contain"
                                />
                            </div>

                            <div className="w-full md:w-80 lg:w-96 bg-panel-background border-l border-panel-border p-8 flex flex-col overflow-y-auto">
                                <h3 className="text-2xl font-bold mb-4 text-text-primary">Image Details</h3>
                                {selectedImage.description ? (
                                    <p className="text-text-secondary leading-relaxed mb-6">{selectedImage.description}</p>
                                ) : (
                                    <p className="text-text-secondary italic mb-6">No description available.</p>
                                )}

                                {selectedImage.caption && (
                                    <div className="mt-auto pt-6 border-t border-panel-border">
                                        <h4 className="text-xs font-bold uppercase tracking-wider text-accent mb-2">Caption</h4>
                                        <p className="font-medium text-text-primary">{selectedImage.caption}</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function GalleryItem({ img, index, onClick }: { img: ProjectImage; index: number; onClick: () => void }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="break-inside-avoid mb-6 relative cursor-zoom-in group"
            onClick={onClick}
        >
            <div className="bg-panel-border p-px w-full rounded-lg">
                <div className="bg-panel-background w-full rounded-[0px] overflow-hidden relative">
                    <img
                        src={img.url}
                        alt={img.caption || `Gallery image ${index + 1}`}
                        className="w-full h-auto block transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <span className="text-white font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">View Details</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
