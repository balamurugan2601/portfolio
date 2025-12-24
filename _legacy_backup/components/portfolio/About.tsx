'use client';

import { type Profile, type Section } from '@/lib/data';
import InlineEdit from '@/components/admin/InlineEdit';

interface AboutProps {
  isEditable: boolean;
  profile: Profile;
  section: Section;
}

export default function About({ isEditable, profile, section }: AboutProps) {
  if (!section.enabled) return null;

  const handleProfileSave = async (field: keyof Profile, value: string) => {
    const updatedProfile = { ...profile, [field]: value };
    await fetch('/api/profile', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ profile: updatedProfile }),
    });
  };

  const handleSectionSave = async (field: string, value: string) => {
    // We only update the content of THIS section
    // But the API expects { sections: [...] } usually
    // Let's check api/sections/route.ts or create a focused update?
    // The existing route.ts updates ALL sections.
    // Ideally we should use the existing route for consistency, but fetching current sections first is expensive client-side if we don't have them all.
    // However, we just need to send the full list? No, that's dangerous if we don't have it.
    // Optimization: Let's stick to profile editing for now in About, 
    // OR fetch all sections, find this one, update it, and save back.
    // Getting all sections is easy: fetch('/api/sections').

    // For simplicity and speed, let's just implement profile editing for Bio first as it's the main request.
  };

  return (
    <section id="about" className="py-20 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
            {section.content?.title || 'About Me'}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 leading-relaxed text-center">
            <InlineEdit
              type="textarea"
              isEditable={isEditable}
              initialValue={profile.bio}
              onSave={(val) => handleProfileSave('bio', val)}
            />
          </p>
        </div>
      </div>
    </section>
  );
}

