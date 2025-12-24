'use client';

import { useState, useEffect } from 'react';
import type { Project } from '@/lib/data';

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<Project, 'id'>>({
    title: '',
    description: '',
    role: '',
    images: [],
    year: '',
    tags: [],
  });
  const [showForm, setShowForm] = useState(false);
  const [imageInput, setImageInput] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('/api/projects');
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        const updatedProjects = projects.map(p =>
          p.id === editing ? { ...formData, id: editing } : p
        );
        const response = await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ projects: updatedProjects }),
        });
        if (response.ok) {
          setProjects(updatedProjects);
          resetForm();
        }
      } else {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        if (response.ok) {
          const data = await response.json();
          setProjects([...projects, data.project]);
          resetForm();
        }
      }
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleEdit = (project: Project) => {
    setEditing(project.id);
    setFormData({
      title: project.title,
      description: project.description,
      role: project.role,
      images: project.images || [],
      year: project.year || '',
      tags: project.tags || [],
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;
    try {
      const response = await fetch(`/api/projects?id=${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setProjects(projects.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting project:', error);
    }
  };

  const addImage = () => {
    if (imageInput.trim()) {
      setFormData({
        ...formData,
        images: [...(formData.images || []), imageInput.trim()],
      });
      setImageInput('');
    }
  };

  const removeImage = (index: number) => {
    setFormData({
      ...formData,
      images: formData.images?.filter((_, i) => i !== index) || [],
    });
  };

  const addTag = () => {
    const tagInput = prompt('Enter tag:');
    if (tagInput?.trim()) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      });
    }
  };

  const removeTag = (index: number) => {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((_, i) => i !== index) || [],
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      role: '',
      images: [],
      year: '',
      tags: [],
    });
    setEditing(null);
    setShowForm(false);
    setImageInput('');
  };

  if (loading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Projects Management</h2>
        <button
          onClick={() => {
            resetForm();
            setShowForm(true);
          }}
          className="px-4 py-2 glass-strong rounded-lg hover:scale-105 transition-transform"
        >
          + Add Project
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="glass-strong p-6 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 glass rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 glass rounded-lg text-white"
              rows={4}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Role</label>
            <input
              type="text"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              className="w-full px-4 py-2 glass rounded-lg text-white"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Year</label>
            <input
              type="text"
              value={formData.year}
              onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              className="w-full px-4 py-2 glass rounded-lg text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Images (filename from public folder)</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={imageInput}
                onChange={(e) => setImageInput(e.target.value)}
                className="flex-1 px-4 py-2 glass rounded-lg text-white"
                placeholder="image.png"
              />
              <button
                type="button"
                onClick={addImage}
                className="px-4 py-2 glass rounded-lg hover:scale-105 transition-transform"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.images?.map((img, idx) => (
                <span
                  key={idx}
                  className="glass px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {img}
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Tags</label>
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 glass rounded-lg hover:scale-105 transition-transform mb-2"
            >
              + Add Tag
            </button>
            <div className="flex flex-wrap gap-2">
              {formData.tags?.map((tag, idx) => (
                <span
                  key={idx}
                  className="glass px-3 py-1 rounded-full text-sm flex items-center gap-2"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(idx)}
                    className="text-red-400 hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
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

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="glass-strong p-6 rounded-lg space-y-2"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold">{project.title}</h3>
                <p className="text-sm text-purple-400">{project.role}</p>
                <p className="text-gray-300 mt-2 line-clamp-2">{project.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1 glass rounded hover:scale-105 transition-transform"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="px-3 py-1 glass rounded hover:scale-105 transition-transform text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

