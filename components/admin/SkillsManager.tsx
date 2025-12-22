'use client';

import { useState, useEffect } from 'react';
import type { Skill } from '@/lib/data';

export default function SkillsManager() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Skill, 'id'>>({
    name: '',
    category: '',
    level: '',
    icon: '',
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const response = await fetch('/api/skills');
      const data = await response.json();
      setSkills(data.skills || []);
    } catch (error) {
      console.error('Error fetching skills:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        const updatedSkills = skills.map(s =>
          s.id === editing ? { ...formData, id: editing } : s
        );
        const response = await fetch('/api/skills', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ skills: updatedSkills }),
        });
        if (response.ok) {
          setSkills(updatedSkills);
          resetForm();
        }
      } else {
        const response = await fetch('/api/skills', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          setSkills([...skills, data.skill]);
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditing(skill.id);
    setFormData({
      name: skill.name,
      category: skill.category,
      level: skill.level,
      icon: skill.icon || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this skill?')) return;
    try {
      const response = await fetch(`/api/skills?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setSkills(skills.filter(s => s.id !== id));
      }
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const resetForm = () => {
    setFormData({ name: '', category: '', level: '', icon: '' });
    setEditing(null);
    setShowForm(false);
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Skills Management</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-4 py-2 glass-strong rounded-lg hover:scale-105 transition-transform"
        >
          + Add Skill
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-strong p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 glass rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              className="w-full px-4 py-2 glass rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Level</label>
            <input
              type="text"
              value={formData.level}
              onChange={(e) => setFormData({ ...formData, level: e.target.value })}
              className="w-full px-4 py-2 glass rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Icon (emoji)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
              className="w-full px-4 py-2 glass rounded-lg text-white"
              placeholder="🎨"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 glass-strong rounded-lg hover:scale-105 transition-transform"
            >
              {editing ? 'Update' : 'Create'}
            </button>
            <button
              type="button"
              onClick={resetForm}
              className="px-4 py-2 glass rounded-lg hover:scale-105 transition-transform"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-2">
        {skills.map((skill) => (
          <div
            key={skill.id}
            className="glass-strong p-4 rounded-lg flex justify-between items-center"
          >
            <div className="flex items-center gap-3">
              {skill.icon && <span className="text-2xl">{skill.icon}</span>}
              <div>
                <div className="font-semibold">{skill.name}</div>
                <div className="text-sm text-gray-400">
                  {skill.category} • {skill.level}
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(skill)}
                className="px-3 py-1 glass rounded hover:scale-105 transition-transform"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(skill.id)}
                className="px-3 py-1 glass rounded hover:scale-105 transition-transform text-red-400"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

