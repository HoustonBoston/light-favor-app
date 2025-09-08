import deleteButtonJpg from "../app/delete-button.jpg"
import Image from "next/image"
import InputTemplate from "./InputTemplate"
import React from "react"

import { Part } from "@/Objects/Part"
import { Dayjob } from "@/Objects/Dayjob"

export default function HWPart ({
    partObj, setParts, index, onChange
}: {
    partObj: Part,
    setParts: React.Dispatch<React.SetStateAction<Part[]>>,
    index: number,
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
})
{
    const handleDelete = () =>
    {
        setParts(prev => prev.filter((_, i) => i !== index))
    }

    return (
        <>
            <div id="box" className="w-[550px] border-solid border-blue-300 border-2 h-[75px] rounded-2xl">
                <label className="pl-2 font-bold">
                    {partObj.part_type}
                </label>
                <div id="flex-cont-part-serial-fields" className="flex justify-center">
                    <div className="" id="part-field">
                        <label className="mr-2 font-bold">
                            Part No
                        </label>
                        <InputTemplate 
                        readOnly={false} 
                        onChange={onChange}
                        placeholder="Enter part number" 
                        name="part_number" />
                    </div>
                    <div className="ml-2" id="serial-field">
                        <label className="mr-2 font-bold">
                            Serial No
                        </label>
                        <InputTemplate
                        placeholder="Enter part serial number" 
                        readOnly={false} 
                        onChange={onChange} 
                        name="part_serial_number" />
                    </div>
                </div>
            </div>

            <button onClick={handleDelete} className="ml-2 hover:cursor-pointer hover:text-red-600">
                <Image src={deleteButtonJpg.src} alt="delete Logo" width={30} height={20} className="w-auto h-auto" />
            </button>
        </>
    )
}