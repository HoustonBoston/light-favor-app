export interface User
{
    user_id?: number;
    user_email: string;
}

export type UserState = User | null
