'use client';

import { type Project, type Section } from '@/lib/data';
import Link from 'next/link';

interface ProjectsProps {
  isEditable: boolean;
  projects: Project[];
  section: Section;
}

export default function Projects({ isEditable, projects, section }: ProjectsProps) {
  if (!section.enabled) return null;

  return (
    <section id="projects" className="py-20 px-4 relative group">
      {isEditable && (
        <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
          <Link
            href="/admin/dashboard"
            className="px-4 py-2 bg-purple-600 rounded-lg text-white font-semibold hover:bg-purple-700 transition-colors shadow-lg"
          >
            Manage Projects
          </Link>
        </div>
      )}
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {section.content?.title || 'Projects'}
          </h2>
          <p className="text-lg text-gray-400">
            {section.content?.description || 'Here are some of my recent works'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="glass-strong rounded-2xl overflow-hidden hover:scale-105 transition-transform">
              <div className="relative h-48 bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                {project.images && project.images.length > 0 ? (
                  <img
                    src={`/${project.images[0]}`}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-4xl">
                    🎨
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-purple-400 mb-3">{project.role}</p>
                <p className="text-gray-300 mb-4 line-clamp-3">{project.description}</p>
                {project.tags && project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, idx) => (
                      <span
                        key={idx}
                        className="text-xs glass px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

