import { Dayjob } from "./Dayjob";

export interface User
{
    user_id: number;
    user_email: string;
    dayjobArr?: Dayjob[]
}

export type UserState = User | null
