// src/types/Job.ts

export interface Job {
    id: number;
    title: string;
    description: string;
    requirements?: string[] | null;
    company_name?: string | null;
    company_size?: number | null;
    location?: string | null;
    linkedin_profiles?: string[] | null;
    employment_type?: 'remote' | 'hybrid' | 'on-site' | null;
    original_url: string;
    salary_range?: string | null;
    benefits?: string[] | null;
    skills_required?: string[] | null;
    job_search:JobSearch;
    posted_date?: string | null;
    industry?: string | null;
    job_type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'CDD' | 'CDI' | 'other';
    created_at: string;
    updated_at: string;
    similarity_score: number;
    search_date: string;
    status: 'matched' | 'applied';
  }
  interface JobSearch {
    similarity_score: number; // A similarity score represented as a number
    search_date: string;      // ISO 8601 date string
    status: string;          // Status as a string, e.g., 'matched'
}