import { getPortfolioData } from '@/lib/data';

export default function Contact() {
  const data = getPortfolioData();
  const contactSection = data.sections.find(s => s.type === 'contact');
  
  if (!contactSection?.enabled) return null;

  const { profile } = data;

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {contactSection.content?.title || 'Get In Touch'}
          </h2>
          <p className="text-lg text-gray-400 text-center mb-8">
            {contactSection.content?.description || "Let's work together on your next project"}
          </p>
          <div className="text-center space-y-4">
            <a
              href={`mailto:${profile.email}`}
              className="inline-block px-8 py-3 glass-strong rounded-full text-white font-semibold hover:scale-105 transition-transform"
            >
              {profile.email}
            </a>
            <div className="flex gap-4 justify-center mt-6">
              {profile.social.github && (
                <a
                  href={profile.social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-3 rounded-full hover:scale-110 transition-transform"
                >
                  GitHub
                </a>
              )}
              {profile.social.linkedin && (
                <a
                  href={profile.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-3 rounded-full hover:scale-110 transition-transform"
                >
                  LinkedIn
                </a>
              )}
              {profile.social.twitter && (
                <a
                  href={profile.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-3 rounded-full hover:scale-110 transition-transform"
                >
                  Twitter
                </a>
              )}
              {profile.social.dribbble && (
                <a
                  href={profile.social.dribbble}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass p-3 rounded-full hover:scale-110 transition-transform"
                >
                  Dribbble
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

