export type Flag = "insert" | "update" 

export interface Part
{
    part_type: string;
    part_num: number | null;
    part_serial_num: number | null;
    flag: Flag;
}
