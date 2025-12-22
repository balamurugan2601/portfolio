import { getPortfolioData } from '@/lib/data';

export default function Projects() {
  const data = getPortfolioData();
  const projectsSection = data.sections.find(s => s.type === 'projects');
  
  if (!projectsSection?.enabled) return null;

  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {projectsSection.content?.title || 'Projects'}
          </h2>
          <p className="text-lg text-gray-400">
            {projectsSection.content?.description || 'Here are some of my recent works'}
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.projects.map((project) => (
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

