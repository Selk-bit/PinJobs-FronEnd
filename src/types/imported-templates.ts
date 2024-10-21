import type {ClientProfile} from "@/types/client-profile";

export interface ImportedTemplate {
    id: string;
    name: string;
    file: string;
    active: boolean;
    clientProfileId?: string;
    clientProfile?: ClientProfile;

    createdAt: Date;
    updatedAt: Date;
}


export interface ImportedTemplateDTO {
    name: string;
    file: File ;
}