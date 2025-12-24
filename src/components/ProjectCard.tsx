import React, { useRef, useState, useEffect } from 'react';
import { Project } from '../data/portfolio';

interface ProjectCardProps {
    project: Project;
    onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
    const titleRef = useRef<HTMLDivElement>(null);
    const [titleHeight, setTitleHeight] = useState(0);

    useEffect(() => {
        if (titleRef.current) {
            setTitleHeight(titleRef.current.offsetHeight);
        }
    }, [project.title, project.role]); // Recalculate if content changes

    return (
        <button
            onClick={() => onClick(project)}
            className="relative flex w-full rounded-lg md:rounded-2xl group text-left"
            type="button"
        >
            <article
                className="bg-panel-border relative rounded-lg p-px md:rounded-2xl h-full w-full transition-all duration-300 transform"
                style={{ "--title-height": titleHeight } as React.CSSProperties}
            >
                <div className="card bg-panel-background text-text-primary relative z-1 rounded-[7px] p-1 md:rounded-[15px] h-full w-full overflow-hidden">
                    {/* Content Container */}
                    <div className="h-full w-full translate-y-0 overflow-hidden rounded transition-all duration-300 group-hover:-translate-y-[calc(var(--title-height)*1px)] md:rounded-lg">

                        {/* Image Container */}
                        <div className="relative w-full aspect-[4/3] overflow-hidden rounded transition-all duration-300 group-hover:translate-y-[calc(var(--title-height)*1px)] md:rounded-xl">
                            {project.images && project.images.length > 0 ? (
                                <img
                                    src={project.images[0]}
                                    alt={project.title}
                                    className="w-full h-full object-cover transition-all duration-500 scale-100"
                                />
                            ) : (
                                <div className="w-full h-full bg-panel-hover flex items-center justify-center text-4xl text-accent group-hover:opacity-50 transition-opacity">
                                    🎨
                                </div>
                            )}
                        </div>


                    </div>

                    {/* Title Slide Up */}
                    <div
                        ref={titleRef}
                        className="title absolute bottom-0 left-0 w-full translate-y-full rounded-tl-md rounded-tr-md p-3 px-3 text-text-primary transition-all duration-300 group-hover:translate-y-[-4px]"
                    >
                        <div className="font-bold text-base md:text-lg truncate">{project.title}</div>

                    </div>
                </div>
            </article>
        </button>
    );
}
