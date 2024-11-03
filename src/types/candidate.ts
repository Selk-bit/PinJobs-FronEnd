import type {ClientProfile} from '@/types/client-profile';
import type {Resume} from "@/types/resume";
import type {Template} from "@/types/model";

export interface Candidate {
    id?: string;
    reference?: string;
    resume?: string;
    resumeData: Resume;
    validated?: boolean;
    resumeData: Resume;
    templateId?: string | null;
    formattedResume?: string;
    template?: Template;
    clientProfileId?: string;
    template?: Template;
    clientProfile?: ClientProfile;
    createdAt?: Date;
    updatedAt?: Date;
}


export interface Summary {
    summary: string;

}