import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'portfolio.json');

export interface Profile {
  name: string;
  title: string;
  bio: string;
  email: string;
  social: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    dribbble?: string;
  };
}

export interface Section {
  id: string;
  type: string;
  enabled: boolean;
  order: number;
  content?: {
    title?: string;
    description?: string;
    [key: string]: any;
  };
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: string;
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  images: string[];
  role: string;
  year?: string;
  tags?: string[];
}

export interface PortfolioData {
  profile: Profile;
  sections: Section[];
  skills: Skill[];
  projects: Project[];
}

export function getPortfolioData(): PortfolioData {
  try {
    const fileContents = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(fileContents);
  } catch (error) {
    console.error('Error reading portfolio data:', error);
    throw new Error('Failed to read portfolio data');
  }
}

export function savePortfolioData(data: PortfolioData): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    console.error('Error saving portfolio data:', error);
    throw new Error('Failed to save portfolio data');
  }
}

export function updateSkills(skills: Skill[]): PortfolioData {
  const data = getPortfolioData();
  data.skills = skills;
  savePortfolioData(data);
  return data;
}

export function updateSections(sections: Section[]): PortfolioData {
  const data = getPortfolioData();
  data.sections = sections;
  savePortfolioData(data);
  return data;
}

export function updateProfile(profile: Profile): PortfolioData {
  const data = getPortfolioData();
  data.profile = profile;
  savePortfolioData(data);
  return data;
}

export function updateProjects(projects: Project[]): PortfolioData {
  const data = getPortfolioData();
  data.projects = projects;
  savePortfolioData(data);
  return data;
}

