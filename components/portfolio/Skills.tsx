import { getPortfolioData } from '@/lib/data';

export default function Skills() {
  const data = getPortfolioData();
  const skillsSection = data.sections.find(s => s.type === 'skills');
  
  if (!skillsSection?.enabled) return null;

  const skillsByCategory = data.skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof data.skills>);

  return (
    <section id="skills" className="py-20 px-4">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(skillsByCategory).map(([category, skills]) => (
            <div key={category} className="glass-strong rounded-2xl p-6">
              <h3 className="text-2xl font-semibold mb-4 text-purple-400">{category}</h3>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {skill.icon && <span className="text-2xl">{skill.icon}</span>}
                      <span className="text-lg">{skill.name}</span>
                    </div>
                    <span className="text-sm text-gray-400 glass px-3 py-1 rounded-full">
                      {skill.level}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

