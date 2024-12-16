import type { Job } from '@/types/job';
import type { Resume } from '@/types/resume';
import type { Template } from '@/types/model';

export interface TailoredResume {
    id: number;
    name: string;
    original_file: string | null;
    generated_pdf: string | null;
    thumbnail: string | null;
    created_at: string;
    updated_at: string;
    job: Job;
    cv_data: Resume;
    template?: Template;
}


export interface TailoredResumesPaginated {
    count: number,
    next: string | null,
    previous: string | null,
    results: TailoredResume[]
}