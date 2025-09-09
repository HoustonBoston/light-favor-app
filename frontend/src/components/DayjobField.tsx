import InputTemplate from "./InputTemplate"
import { useRouter } from "next/navigation"
import { Dayjob } from "@/Objects/Dayjob";
import React from "react";

import { useDayjob } from "@/context/DayjobContext";

import deleteButtonJpg from "../../src/app/delete-button.jpg"
import Image from "next/image"

export default function DayjobField ({ Dj, onDayjobInfoChange, onDelete }: { Dj: Dayjob, 
    onDayjobInfoChange: (e: React.ChangeEvent<HTMLInputElement>, index?: number) => void,
    onDelete: () => void
}) {
    const router = useRouter();
    const [dayjob, setDayjob] = useDayjob();

    return (
        <div className="flex justify-center">
            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                onClick={() => {
                    // navigate to the dayjob detail page
                    setDayjob(Dj)
                    router.push(`/cabin_readiness/${Dj.dayjob_id}`)
                }}
            >
                <div className="flex gap-x-2">
                    <label>DJ No:</label>
                    <InputTemplate placeholder="Enter DJ No" name="dayjob_number" value={Dj.dayjob_number} onChange={onDayjobInfoChange} />
                    <label>Serial No:</label>
                    <InputTemplate placeholder="Enter DJ Serial No" name="dayjob_serial_number" value={Dj.dayjob_serial_number} onChange={onDayjobInfoChange} />
                </div>
            </button>
            <button onClick={onDelete} className="ml-2 hover:cursor-pointer hover:text-red-600">
                <Image src={deleteButtonJpg.src} alt="delete Logo" width={30} height={20} className="w-auto h-auto" />
            </button>
        </div>
    )
}
