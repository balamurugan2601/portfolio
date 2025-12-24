'use client';

import { type Profile } from '@/lib/data';
import InlineEdit from '@/components/admin/InlineEdit';

interface HeroProps {
  isEditable: boolean;
  profile: Profile;
}

export default function Hero({ isEditable, profile }: HeroProps) {
  const handleSave = async (field: keyof Profile, value: string) => {
    try {
      // Create new profile object with update
      const updatedProfile = { ...profile, [field]: value };

      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ profile: updatedProfile }),
      });

      if (!response.ok) throw new Error('Failed to update');
    } catch (error) {
      console.error('Save failed:', error);
      throw error;
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-pink-900/20"></div>
      <div className="container mx-auto px-4 z-10">
        <div className="text-center space-y-6">
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
            <InlineEdit
              isEditable={isEditable}
              initialValue={profile.name}
              onSave={(val) => handleSave('name', val)}
            />
          </h1>
          <p className="text-2xl md:text-4xl text-gray-300 mb-8">
            <InlineEdit
              isEditable={isEditable}
              initialValue={profile.title}
              onSave={(val) => handleSave('title', val)}
            />
          </p>
          <div className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto">
            <InlineEdit
              type="textarea"
              isEditable={isEditable}
              initialValue={profile.bio}
              onSave={(val) => handleSave('bio', val)}
            />
          </div>
          <div className="flex gap-4 justify-center mt-8">
            <a
              href="#projects"
              className="px-8 py-3 glass-strong rounded-full text-white font-semibold hover:scale-105 transition-transform"
            >
              View My Work
            </a>
            <a
              href="#contact"
              className="px-8 py-3 border border-white/20 rounded-full text-white font-semibold hover:bg-white/10 transition-colors"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

