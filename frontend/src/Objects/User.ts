import { Dayjob } from "./Dayjob";

export interface User
{
    dayjob_user_id: number;
    dayjob_user_email: string;
    dayjobArr?: Dayjob[]
}

export type UserState = User | null
