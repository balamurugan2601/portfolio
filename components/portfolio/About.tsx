import { getPortfolioData } from '@/lib/data';

export default function About() {
  const data = getPortfolioData();
  const aboutSection = data.sections.find(s => s.type === 'about');
  
  if (!aboutSection?.enabled) return null;

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {aboutSection.content?.title || 'About Me'}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center">
            {aboutSection.content?.description || data.profile.bio}
          </p>
        </div>
      </div>
    </section>
  );
}

