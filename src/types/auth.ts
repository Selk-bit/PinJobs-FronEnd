export interface ClientProfile {
  name: string;
  logo: File | null;
}

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  password_confirmation: string;
  clientProfile: ClientProfile;
}