import type { Language as Lang } from '@/types/language';

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
