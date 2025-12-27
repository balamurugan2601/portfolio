import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { portfolioData, ProjectImage } from '../data/portfolio';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ProjectDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [project, setProject] = useState(portfolioData.projects.find(p => p.id === id));

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
        <div className="min-h-screen bg-background text-text-primary p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => navigate('/')}
                            className="flex items-center gap-2 group text-text-secondary hover:text-accent transition-colors"
                        >
                            <div className="p-2 bg-panel-border rounded-full group-hover:bg-panel-hover transition-colors">
                                <ArrowLeft size={20} />
                            </div>
                            <span className="font-medium">Back to Home</span>
                        </button>
                    </div>

                    <div className="text-right">
                        <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-2">{project.title}</h1>
                        <p className="text-xl text-accent font-bold uppercase tracking-widest">{project.role} • {project.year}</p>
                    </div>
                </header>

                {/* CSS Column Masonry Layout */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6 relative">
                    {(() => {
                        // Calculate insertion index for the info block (center of images)
                        const insertIndex = Math.ceil(gallery.length / 2);

                        // Create InfoBlock component/element
                        const InfoBlock = (
                            <div key="info-block" className="break-inside-avoid mb-6 bg-panel-border p-[2px] rounded-[10px] shadow-card relative">
                                <div className="bg-panel-background rounded-[9px] p-8 flex flex-col gap-8 relative z-1">
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
                                                    <span key={tag} className="px-3 py-1 bg-panel-hover rounded-lg text-sm font-bold text-text-primary border-[2px] border-panel-border">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Visit Link Section */}
                                    {project.link && (
                                        <a
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full bg-foreground text-background rounded-[10px] p-6 hover:opacity-90 transition-opacity shadow-lg group cursor-pointer relative overflow-hidden border-[2px] border-panel-border mt-2"
                                        >
                                            <div className="relative z-10 flex flex-col gap-4">
                                                <div className="flex justify-between items-center">
                                                    <h3 className="text-xl font-bold leading-tight text-background">Visit Figma File</h3>
                                                    <div className="bg-background text-foreground p-2 rounded-full transition-transform group-hover:rotate-45">
                                                        <ArrowLeft className="rotate-[135deg]" size={18} />
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    )}
                                </div>
                            </div>
                        );

                        // Combine images and info block
                        const items = [
                            ...gallery.slice(0, insertIndex).map((img, idx) => ({ type: 'image', data: img, index: idx })),
                            { type: 'info', data: null, index: -1 },
                            ...gallery.slice(insertIndex).map((img, idx) => ({ type: 'image', data: img, index: idx + insertIndex }))
                        ];

                        return items.map((item, i) => {
                            if (item.type === 'info') {
                                return InfoBlock;
                            }
                            const img = item.data as ProjectImage;
                            return (
                                <GalleryItem
                                    key={`gallery-${item.index}`}
                                    img={img}
                                    index={item.index}
                                />
                            );
                        });
                    })()}

                    {/* Fallback if no images */}
                    {gallery.length === 0 && !project.link && (
                        <div className="break-inside-avoid mb-6 bg-panel-hover rounded-lg p-12 flex items-center justify-center text-text-secondary flex-col gap-4">
                            <span className="text-4xl">📷</span>
                            <p className="font-medium">No gallery images.</p>
                        </div>
                    )}
                </div>
            </div>

        </div>
    );
}

function GalleryItem({ img, index }: { img: ProjectImage; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="break-inside-avoid mb-6 relative group"
        >
            <div className="bg-panel-border p-[2px] w-full rounded-[10px] shadow-card relative">
                <div className="bg-panel-background w-full rounded-[9px] overflow-hidden relative z-1">
                    <img
                        src={img.url}
                        alt={img.description || img.caption || `Gallery image ${index + 1}`}
                        className="w-full h-auto block transition-all duration-500 group-hover:scale-105 group-hover:blur-[2px]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300" />

                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <span className="text-white font-bold text-lg uppercase tracking-widest drop-shadow-lg px-2 text-center">
                            {img.description || img.caption || ''}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
