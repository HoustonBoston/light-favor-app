import InputTemplate from "./InputTemplate"
import { useRouter } from "next/navigation"
import { Dayjob } from "@/Objects/Dayjob";
import React from "react";

export default function DayjobField ({ Dj, onDayjobInfoChange }: { Dj: Dayjob, 
    onDayjobInfoChange: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => void 
}) {
    const router = useRouter();

    return (
        <div>
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    // navigate to the dayjob detail page
                    router.push(`/cabin_readiness/${Dj.dayjob_id}`)
                }}
            >
                <div className="flex gap-x-2">
                    <label>DJ No:</label>
                    <InputTemplate placeholder="Enter DJ No" name="dayjob_number" value={Dj.dayjob_number || ""} onChange={onDayjobInfoChange} />
                    <label>Serial No:</label>
                    <InputTemplate placeholder="Enter DJ Serial No" name="dayjob_serial_number" value={Dj.dayjob_serial_number || ""} onChange={onDayjobInfoChange} />
                </div>
            </button>
        </div>
    )
}
