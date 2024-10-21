export interface ChangePasswordDto {
    old_password: string;
    password: string;
    password_confirmation: string;
}