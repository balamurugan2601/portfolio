'use client';

import React from 'react';
import { Section } from '@/lib/data';

interface NavbarProps {
  enabledSections: Section[];
}

export default function Navbar({ enabledSections }: NavbarProps) {
  return (
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
  );
}
