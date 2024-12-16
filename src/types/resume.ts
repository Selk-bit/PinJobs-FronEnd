import type { Language as Lang } from '@/types/language';
import type { Template } from '@/types/model';
import type { Job } from '@/types/job';

export type ResumeType = 'base-from-scratch' | 'base-from-import-data' | 'tailored-resume'

export interface Cv {
    id: number;
    name: string;
    original_file: string;
    cv_type:string;
    generated_pdf: string | null;
    thumbnail: string | null;
    cv_data: Resume; // Replace `any` with the actual type if available
    job: Job | null; // Replace `any` with the actual type if available
    template: Template; // Replace `any` with the actual type if available
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}


export interface Resume {
    cv_id?: number;
    name: string;
    yoe: string;
    headline: string;
    alias: string;
    imageUrl: string;
    email: string;
    phone: string;
    age: string;
    city: string;
    language?: Lang;
    summary: string;
    template: Template | null;
    work: Work[];
    educations: Education[];
    projects: Project[];
    certifications: Certification[];
    references: Reference[];
    volunteering: Volunteering[];
    interests: Interest[];
    languages: Language[];
    skills: Skill[];
    social: Skill[];
}

export interface Project {
    project_name: string;
    description: string;
    start_date: string;
    end_date: string;
}

export interface Certification {
    certification: string;
    institution: string;
    date: string;
    link: string;
}

export interface Education {
    degree: string;
    institution: string;
    start_year: string;
    end_year: string;
}

export interface Work {
    job_title: string;
    city: string;
    company_name: string;
    responsibilities: string;
    start_date: string;
    environnement: string,
    end_date: string;
}

export interface Reference {
    name: string;
    phone: string;
    company: string;
    position: string;
    email: string;
}

export interface Volunteering {
    organization: string;
    position: string;
    description: string;
    start_date: string;
    end_date: string;
}

export interface Interest {
    interest: string;
}

export interface Language {
    language: string;
    level: string;
}


export interface Skill {
    skill: string;
    level: string;
    checked?: boolean;
    category?: string;

}
