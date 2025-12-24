import Hero from '@/components/portfolio/Hero';
import About from '@/components/portfolio/About';
import Skills from '@/components/portfolio/Skills';
import Projects from '@/components/portfolio/Projects';
import Contact from '@/components/portfolio/Contact';
import Navbar from '@/components/Navbar';
import { getPortfolioData } from '@/lib/data';

import { isAuthenticated } from '@/lib/auth';

export default async function Home() {
  const data = await getPortfolioData();
  const isEditable = await isAuthenticated();

  const enabledSections = data.sections
    .filter(s => s.enabled)
    .sort((a, b) => a.order - b.order);

  return (
    <main className="min-h-screen">
      <Navbar enabledSections={enabledSections} />

      {enabledSections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <Hero key={section.id} isEditable={isEditable} profile={data.profile} />;
          case 'about':
            return <About key={section.id} isEditable={isEditable} profile={data.profile} section={section} />;
          case 'skills':
            return <Skills key={section.id} isEditable={isEditable} skills={data.skills} section={section} />;
          case 'projects':
            return <Projects key={section.id} isEditable={isEditable} projects={data.projects} section={section} />;
          case 'contact':
            return <Contact key={section.id} isEditable={isEditable} profile={data.profile} section={section} />;
          default:
            return null;
        }
      })}
    </main>
  );
}

