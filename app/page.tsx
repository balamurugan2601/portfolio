import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Contact from '@/components/portfolio/Contact';
import { getPortfolioData } from '@/lib/data';

export default function Home() {
  const data = getPortfolioData();
  const enabledSections = data.sections
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen">
      <nav className="fixed top-0 left-0 right-0 z-50 glass-strong">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <a href="#hero" className="text-xl font-bold">
              Portfolio
            </a>
            <div className="hidden md:flex gap-6">
              {enabledSections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="text-sm hover:text-purple-400 transition-colors"
                >
                  {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                </a>
              ))}
            </div>
            <div className="md:hidden">
              <select
                onChange={(e) => {
                  window.location.href = e.target.value;
                }}
                className="glass rounded px-2 py-1 text-sm"
                defaultValue=""
              >
                <option value="" disabled>Menu</option>
                {enabledSections.map((section) => (
                  <option key={section.id} value={`#${section.id}`}>
                    {section.type.charAt(0).toUpperCase() + section.type.slice(1)}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </nav>
      
      {enabledSections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <Hero key={section.id} />;
          case 'about':
            return <About key={section.id} />;
          case 'skills':
            return <Skills key={section.id} />;
          case 'projects':
            return <Projects key={section.id} />;
          case 'contact':
            return <Contact key={section.id} />;
          default:
            return null;
        }
      })}
    </main>
  );
}

