import type {Role} from "@/types/role";
import type {ClientProfile} from "@/types/client-profile";

export interface User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    age?: number;
    phone?: string;
    city?: string;
    country?: string;
    clientProfileId?: string;
    clientProfile?: ClientProfile;
    hash?: string;
    roleId?: string;
    num_jobs_to_scrape?: number;
    user: AddUserDTO;
    role?: Role;
    credits: number;
    createdAt: Date;
    updatedAt: Date;
}


export interface AddUserDTO {
    email: string;
}



