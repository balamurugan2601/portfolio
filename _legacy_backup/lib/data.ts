import dbConnect from './db';
import { ProfileModel, SectionModel, SkillModel, ProjectModel } from './models';

// Keep interfaces exported
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

// Initial default data for seeding
const defaultData: PortfolioData = {
  profile: {
    name: "John Doe",
    title: "Full Stack Developer",
    bio: "Passionate developer building amazing web experiences.",
    email: "john@example.com",
    social: {}
  },
  sections: [
    { id: "hero", type: "hero", enabled: true, order: 0, content: { title: "Hi, I'm John" } },
    { id: "about", type: "about", enabled: true, order: 1, content: { title: "About Me" } },
    { id: "skills", type: "skills", enabled: true, order: 2, content: { title: "My Skills" } },
    { id: "projects", type: "projects", enabled: true, order: 3, content: { title: "Featured Projects" } },
    { id: "contact", type: "contact", enabled: true, order: 4, content: { title: "Get In Touch" } }
  ],
  skills: [],
  projects: []
};


export async function getPortfolioData(): Promise<PortfolioData> {
  await dbConnect();

  try {
    let profile = await ProfileModel.findOne().lean();
    let sections = await SectionModel.find().sort({ order: 1 }).lean();
    let skills = await SkillModel.find().lean();
    let projects = await ProjectModel.find().lean();

    // Seeding logic if DB is empty
    if (!profile) {
      console.log("Seeding Database...");
      profile = await ProfileModel.create(defaultData.profile);
      sections = await SectionModel.create(defaultData.sections);
      // skills and projects start empty usually
    }

    // Fallback if sections missing (partial seed)
    if (sections.length === 0) {
      sections = await SectionModel.create(defaultData.sections);
    }

    const safeProfile = profile || defaultData.profile;
    // ensure social exists even if empty in DB
    if (!safeProfile.social) { safeProfile.social = {}; }

    return {
      profile: safeProfile as unknown as Profile,
      sections: sections as unknown as Section[],
      skills: skills as unknown as Skill[],
      projects: projects as unknown as Project[],
    };
  } catch (error) {
    console.error('Error fetching portfolio data:', error);
    // Return default data on error to prevent total crash, but log it
    return defaultData;
  }
}

// These update functions now need to be fully async and update specific collections
export async function updateSkills(skills: Skill[]): Promise<PortfolioData> {
  await dbConnect();
  // Strategy: Delete all and recreate is simplest for lists, though not most efficient. 
  // For a small portfolio, it is fine.
  await SkillModel.deleteMany({});
  await SkillModel.insertMany(skills);
  return getPortfolioData();
}

export async function updateSections(sections: Section[]): Promise<PortfolioData> {
  await dbConnect();
  // Bulk write or delete/insert. 
  await SectionModel.deleteMany({});
  await SectionModel.insertMany(sections);
  return getPortfolioData();
}

export async function updateProfile(profile: Profile): Promise<PortfolioData> {
  await dbConnect();
  // Upsert
  await ProfileModel.findOneAndUpdate({}, profile, { upsert: true });
  return getPortfolioData();
}

export async function updateProjects(projects: Project[]): Promise<PortfolioData> {
  await dbConnect();
  await ProjectModel.deleteMany({});
  await ProjectModel.insertMany(projects);
  return getPortfolioData();
}

// Helper to update a single project (optimization)
export async function addProject(project: Project): Promise<PortfolioData> {
  await dbConnect();
  await ProjectModel.create(project);
  return getPortfolioData();
}


