'use client';

import { type Profile, type Section } from '@/lib/data';
import InlineEdit from '@/components/admin/InlineEdit';

interface ContactProps {
  isEditable: boolean;
  profile: Profile;
  section: Section;
}

export default function Contact({ isEditable, profile, section }: ContactProps) {
  if (!section.enabled) return null;

  const handleSave = async (field: keyof Profile, value: string) => {
    const updatedProfile = { ...profile, [field]: value };
    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile: updatedProfile }),
    });
  };

  return (
    <section id="contact" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            {section.content?.title || 'Get In Touch'}
          </h2>
          <p className="text-lg text-gray-400 text-center mb-8">
            {section.content?.description || "Let's work together on your next project"}
          </p>
          <div className="text-center space-y-4">
            <div className="inline-block px-8 py-3 glass-strong rounded-full text-white font-semibold hover:scale-105 transition-transform">
              <InlineEdit
                isEditable={isEditable}
                initialValue={profile.email}
                onSave={(val) => handleSave('email', val)}
              />
            </div>
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

