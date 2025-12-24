
import mongoose, { Schema } from 'mongoose';
import { Profile, Section, Skill, Project } from './data';

const ProfileSchema = new Schema<Profile>({
    name: String,
    title: String,
    bio: String,
    email: String,
    social: {
        github: String,
        linkedin: String,
        twitter: String,
        dribbble: String,
    },
});

const SectionSchema = new Schema<Section>({
    id: { type: String, required: true },
    type: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    content: { type: Schema.Types.Mixed, default: {} },
});

const SkillSchema = new Schema<Skill>({
    id: { type: String, required: true },
    name: String,
    category: String,
    level: String,
    icon: String,
});

const ProjectSchema = new Schema<Project>({
    id: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    images: [String],
    role: String,
    year: String,
    tags: [String],
});

// Use existing models if they exist (hot reload fix) or create new ones
export const ProfileModel = mongoose.models.Profile || mongoose.model('Profile', ProfileSchema);
export const SectionModel = mongoose.models.Section || mongoose.model('Section', SectionSchema);
export const SkillModel = mongoose.models.Skill || mongoose.model('Skill', SkillSchema);
export const ProjectModel = mongoose.models.Project || mongoose.model('Project', ProjectSchema);
