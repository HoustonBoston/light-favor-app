import { Part } from "./Part";

export interface Dayjob
{
    dayjob_num: number;
    dayjob_serial_num: number;
    parts: Part[];
    user_id: string;
    date: number;
    id?: number;
}
