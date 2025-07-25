import deleteButtonJpg from "../app/delete-button.jpg"
import Image from "next/image"
import InputTemplate from "./InputTemplate"
import React from "react"

export default function HWPart ({
    part, setParts, index, partsArr
}: {
    part: string,
    setParts: React.Dispatch<React.SetStateAction<string[]>>,
    index: number,
    partsArr: string[]
})
{
    const handleDelete = () =>
    {
        setParts(partsArr.filter((_, i) => i !== index))
    }

    return (
        <>
            <div id="box" className="w-[550px] border-solid border-blue-300 border-2 h-[75px] rounded-2xl">
                <label className="pl-2 font-bold">
                    {part}
                </label>
                <div id="flex-cont-part-serial-fields" className="flex justify-center">
                    <div className="" id="part-field">
                        <label className="mr-2 font-bold">
                            Part No
                        </label>
                        <InputTemplate />
                    </div>
                    <div className="ml-2" id="serial-field">
                        <label className="mr-2 font-bold">
                            Serial No
                        </label>
                        <InputTemplate />
                    </div>
                </div>
            </div>

            <button onClick={handleDelete} className="ml-2 hover:cursor-pointer hover:text-red-600">
                <Image src={deleteButtonJpg.src} alt="delete Logo" width={30} height={20} />
            </button>
        </>
    )
}