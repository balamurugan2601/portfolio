'use client';

import { useState, useEffect } from 'react';
import type { Section } from '@/lib/data';

export default function SectionsManager() {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<Section['content']>({});

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const response = await fetch('/api/sections');
      const data = await response.json();
      setSections(data.sections || []);
    } catch (error) {
      console.error('Error fetching sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = async (section: Section) => {
    const updatedSections = sections.map(s =>
      s.id === section.id ? { ...s, enabled: !s.enabled } : s
    );
    try {
      const response = await fetch('/api/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: updatedSections }),
      });
      if (response.ok) {
        setSections(updatedSections);
      }
    } catch (error) {
      console.error('Error updating section:', error);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const index = sections.findIndex(s => s.id === id);
    if (index === -1) return;
    
    const newIndex = direction === 'up' ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= sections.length) return;

    const updatedSections = [...sections];
    [updatedSections[index], updatedSections[newIndex]] = 
      [updatedSections[newIndex], updatedSections[index]];
    
    updatedSections[index].order = index;
    updatedSections[newIndex].order = newIndex;

    try {
      const response = await fetch('/api/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: updatedSections }),
      });
      if (response.ok) {
        setSections(updatedSections);
      }
    } catch (error) {
      console.error('Error reordering sections:', error);
    }
  };

  const handleEditContent = (section: Section) => {
    setEditing(section.id);
    setEditContent(section.content || {});
  };

  const handleSaveContent = async (id: string) => {
    const updatedSections = sections.map(s =>
      s.id === id ? { ...s, content: editContent } : s
    );
    try {
      const response = await fetch('/api/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sections: updatedSections }),
      });
      if (response.ok) {
        setSections(updatedSections);
        setEditing(null);
        setEditContent({});
      }
    } catch (error) {
      console.error('Error updating section content:', error);
    }
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Sections Management</h2>
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="glass-strong p-6 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-semibold capitalize">{section.type}</h3>
                <p className="text-sm text-gray-400">Order: {section.order}</p>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={section.enabled}
                    onChange={() => handleToggle(section)}
                    className="w-5 h-5"
                  />
                  <span>Enabled</span>
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleReorder(section.id, 'up')}
                    className="px-3 py-1 glass rounded hover:scale-105 transition-transform"
                    disabled={section.order === 0}
                  >
                    ↑
                  </button>
                  <button
                    onClick={() => handleReorder(section.id, 'down')}
                    className="px-3 py-1 glass rounded hover:scale-105 transition-transform"
                    disabled={section.order === sections.length - 1}
                  >
                    ↓
                  </button>
                </div>
              </div>
            </div>
            
            {editing === section.id ? (
              <div className="space-y-4 pt-4 border-t border-white/10">
                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <input
                    type="text"
                    value={editContent.title || ''}
                    onChange={(e) => setEditContent({ ...editContent, title: e.target.value })}
                    className="w-full px-4 py-2 glass rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    value={editContent.description || ''}
                    onChange={(e) => setEditContent({ ...editContent, description: e.target.value })}
                    className="w-full px-4 py-2 glass rounded-lg text-white"
                    rows={3}
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleSaveContent(section.id)}
                    className="px-4 py-2 glass-strong rounded-lg hover:scale-105 transition-transform"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setEditing(null);
                      setEditContent({});
                    }}
                    className="px-4 py-2 glass rounded-lg hover:scale-105 transition-transform"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => handleEditContent(section)}
                className="px-4 py-2 glass rounded-lg hover:scale-105 transition-transform"
              >
                Edit Content
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

