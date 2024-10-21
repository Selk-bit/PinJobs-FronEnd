import type { Template } from './model';
import type { User } from './user';
import type {Candidate} from "@/types/candidate";

export interface ClientProfile {
    id: string;
    name: string;
    logo: string;
    credits:number;
    ownerId:string;
    candidates: Candidate[];
    users: User[];
    templates: Template[];
    createdAt: Date;
    updatedAt: Date;
}


export interface UpdateClientDTO {
    name:string;
    logo:File;
}