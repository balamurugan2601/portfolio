export interface Profile {
    name: string;
    image?: string; // URL to profile image
    titles: string[]; // Changed from single title to array for morphing effect
    bio: string;
    email: string;
    social: {
        github?: string;
        linkedin?: string;
        twitter?: string;
        dribbble?: string;
        instagram?: string;
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
    level: string; // e.g. "Advanced", "Intermediate"
    icon?: string; // lucide icon name or image url
}

export interface ProjectImage {
    url: string;
    caption?: string;
    description?: string;
    span?: string; // class for grid span e.g. "md:col-span-2 md:row-span-2"
}

export interface Project {
    id: string;
    title: string;
    description: string;
    images: string[];
    role: string;
    year?: string;
    tags?: string[];
    tagsLabel?: string; // e.g. "Tools", "Technologies"
    link?: string;
    github?: string;
    gallery?: ProjectImage[];
}

export interface PortfolioData {
    profile: Profile;
    sections: Section[];
    skills: Skill[];
    projects: Project[];
}

export const portfolioData: PortfolioData = {
    profile: {
        name: "Balamurugan",
        image: "https://ik.imagekit.io/shyambala/bala?updatedAt=1766568944112",
        titles: ["Graphic Designer", "Visual Storyteller", "Illustrator", "Vibe Coder"],
        bio: "Passionate in making the design to communicate",
        email: "shyamsusi2005@gmail.com",
        social: {
            github: "https://github.com/balamurugan2601",
            linkedin: "www.linkedin.com/in/balamurugan-sundarraj-31238025a",
            instagram: "https://www.instagram.com/____balaa___/",
        }
    },
    sections: [
        { id: "hero", type: "hero", enabled: true, order: 0, content: { title: "Hi, I'm John" } },
        { id: "about", type: "about", enabled: true, order: 1, content: { title: "About Me" } },
        { id: "skills", type: "skills", enabled: true, order: 2, content: { title: "My Skills" } },
        { id: "projects", type: "projects", enabled: true, order: 3, content: { title: "Featured Projects" } },
        { id: "contact", type: "contact", enabled: true, order: 4, content: { title: "Get In Touch" } }
    ],
    skills: [
        { id: "1", name: "React", category: "Frontend", level: "Intermediate", icon: "https://skillicons.dev/icons?i=react" },
        { id: "2", name: "TypeScript", category: "Frontend", level: "Intermediate", icon: "https://skillicons.dev/icons?i=ts" },
        { id: "3", name: "Tailwind CSS", category: "Frontend", level: "Intermediate", icon: "https://skillicons.dev/icons?i=tailwind" },
        { id: "4", name: "Figma", category: "Design", level: "Intermediate", icon: "https://skillicons.dev/icons?i=figma" },
        { id: "5", name: "Photoshop", category: "Design", level: "Intermediate", icon: "https://skillicons.dev/icons?i=ps" },
        { id: "6", name: "Illustrator", category: "Design", level: "Intermediate", icon: "https://skillicons.dev/icons?i=ai" },
    ],
    projects: [
        {
            id: "devfest-salem-2025",
            title: "DevFest Salem 2025",
            description: "Led the end-to-end visual execution for DevFest Salem 2025, translating the DevFest brand into a cohesive on-ground design system. Delivered consistent, production-ready assets across stage, environment, and event materials under real-world constraints.",
            images: ["https://ik.imagekit.io/shyambala/devfest/cover.png"],
            role: "Lead Developer",
            year: "2025",
            tags: ["Figma", "Affinity", "Photoshop", "Illustrator"],
            tagsLabel: "Tools",
            link: "https://www.figma.com/design/Df8MMOMnPwyR49ouDboprY/DevFest-Salem-2025?node-id=0-1&t=rgG4vMqnAe282Z2c-1",
            gallery: [
                { url: "https://ik.imagekit.io/shyambala/devfest/RVG02678.jpg", description: "PHOTO POINT" }, { url: "https://ik.imagekit.io/shyambala/devfest/swags.png", description: "SWAGS" },
                { url: "https://ik.imagekit.io/shyambala/devfest/certifcate.png", description: "CERTIFICATE" },
                { url: "https://ik.imagekit.io/shyambala/devfest/insta%20post.png", description: "INSTAGRAM POST" }, { url: "https://ik.imagekit.io/shyambala/devfest/IMG_20251226_154048.jpg", description: "STAGE BACKDROP" },
                { url: "https://ik.imagekit.io/shyambala/devfest/id%20card.png", description: "ID CARD" },
            ]
        }

    ]
};