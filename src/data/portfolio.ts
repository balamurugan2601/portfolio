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
        { id: "1", name: "React", category: "Frontend", level: "Intermediate" },
        { id: "1", name: "Figma", category: "Design", level: "Intermediate" },
        { id: "1", name: "Photoshop", category: "Design", level: "Intermediate" },
        { id: "1", name: "Illustrator", category: "Design", level: "Intermediate" },
        { id: "2", name: "TypeScript", category: "Frontend", level: "Intermediate" },
        { id: "4", name: "Tailwind CSS", category: "Frontend", level: "Intermediate" },
    ],
    projects: [
        {
            id: "1",
            title: "DevFest Salem 2025",
            description: "Led the end-to-end visual execution for DevFest Salem 2025, translating the DevFest brand into a cohesive on-ground design system. Delivered consistent, production-ready assets across stage, environment, and event materials under real-world constraints.",
            images: ["https://ik.imagekit.io/shyambala/devfest/cover.png"],
            role: "Lead Developer",
            year: "2025",
            tags: ["Figma", "Affinity", "Photoshop", "Illustrator"],
            tagsLabel: "Tools",
            link: "https://www.figma.com/design/mm6Ei7NdDbTBrJ3yi24apP/Balamurugan-Sundarraj-s-team-library?node-id=1812-38427&t=wKHmVUMMO139v9HK-1",
            gallery: [
                { url: "https://ik.imagekit.io/shyambala/devfest/Main%20Banner%20-%20entry%2012x4.png", description: "Main Dashboard view ensuring high level metrics are visible immediately." },
                { url: "https://ik.imagekit.io/shyambala/devfest/id.png?updatedAt=1766569862034", description: "Shopping cart interaction flow." },
                { url: "https://ik.imagekit.io/shyambala/devfest/Photo%20Backdrop%208x8.png?updatedAt=1766569867000", description: "Product detail page optimizations for mobile view." },
                { url: "https://ik.imagekit.io/shyambala/devfest/Photo%20Backdrop%208x8.png?updatedAt=1766569867000", description: "Checkout process streamlined for conversion." },
            ]
        }
    
    ]
};