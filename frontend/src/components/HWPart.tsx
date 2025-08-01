import deleteButtonJpg from "../app/delete-button.jpg"
import Image from "next/image"
import InputTemplate from "./InputTemplate"
import React from "react"

import { Part } from "@/Objects/Part"
import { Dayjob } from "@/Objects/Dayjob"

export default function HWPart ({
    partObj, setParts, index, setDayjob
}: {
    partObj: Part,
    setParts: React.Dispatch<React.SetStateAction<Part[]>>,
    index: number,
    setDayjob: React.Dispatch<React.SetStateAction<Dayjob>>
})
{
    const handleDelete = () =>
    {
        setParts(prev => prev.filter((_, i) => i !== index))
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    {
        const { name, value } = e.target
        setParts(prev =>
        {
            const updatedParts = [...prev]
            updatedParts[index] = {
                ...updatedParts[index],
                [name]: value
            }

            setDayjob(prev => (
                { ...prev, parts: updatedParts }
            ))

            return updatedParts
        }
        )
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
                        <InputTemplate onChange={handleChange} name="part_num" />
                    </div>
                    <div className="ml-2" id="serial-field">
                        <label className="mr-2 font-bold">
                            Serial No
                        </label>
                        <InputTemplate onChange={handleChange} name="part_serial_num" />
                    </div>
                </div>
            </div>

            <button onClick={handleDelete} className="ml-2 hover:cursor-pointer hover:text-red-600">
                <Image src={deleteButtonJpg.src} alt="delete Logo" width={30} height={20} className="w-auto h-auto" />
            </button>
        </>
    )
}