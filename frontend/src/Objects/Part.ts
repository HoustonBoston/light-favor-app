export type Flag = "insert" | "update" | "none"

export interface Part
{
    dayjob_id?: number;
    part_number: number | null;
    part_serial_number: number | null;
    flag: Flag;
}
