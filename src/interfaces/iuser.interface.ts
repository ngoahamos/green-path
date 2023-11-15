export default interface IUser {
    _id?: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    is_email_verified: boolean;
    login_type: number;
    status: number;
    email_verified_at: Date;
    created_at: Date;
    updated_at: Date;
}