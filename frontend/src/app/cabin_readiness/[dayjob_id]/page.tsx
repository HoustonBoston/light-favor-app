"use client"

import React, { useEffect, useState } from "react";
import InputTemplate from "../../../components/InputTemplate"
import PartsSelector from "@/components/PartsSelector";
import HWPart from "@/components/HWPart";

import {debounce} from "lodash";

import { Part, Flag } from "@/Objects/Part";

import { useUser } from "@/context/UserContext";

// shows a list of the dayjobs and allows user to click on it to see parts in the dayjob
function Page ({
    params,
}: { params: Promise<{ dayjob_id: string }> }) {
    const { dayjob_id } = React.use(params)
    const [user, setUser] = useUser()
    const [partObjArr, setPartObjArr] = useState<Part[]>([])
    const [dayjobFields, setDayjobFields] = useState<{ dayjob_num: number | null, dayjob_serial_num: number | null, dayjob_id: number | null }>({
        dayjob_num: null,
        dayjob_serial_num: null,
        dayjob_id: dayjob_id ? parseInt(dayjob_id) : null
})

const handleAddPart = async () =>
{
    const dropdown = document.getElementById('parts-dropdown') as HTMLSelectElement;

    if (dropdown) {
        const selectedPart = dropdown.value;
        const newPart: Part = { part_type: selectedPart, part_number: null, part_serial_number: null, flag: "insert" as Flag };
        setPartObjArr([...partObjArr, newPart])
    }
};

const getParts = async (dayjob_id: number) => {
    // Fetch parts for the given dayjob_id
    const response = await fetch('http://localhost:3000/api/get_parts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ dayjob_id }),
    })

    const result = await response.json();

    if (result.success) {
        setPartObjArr(result.parts_arr);
    }
}

const debouncedSave = debounce(async (part: Part) => {
    try {
        const response = await fetch('http://localhost:3000/api/update_part', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ part }),
        });

        const result = await response.json();

        if (result.success) {
            console.log('Parts updated successfully');
        } else {
            console.error('Failed to update parts');
        }
    } catch (error) {
        console.error('Error updating parts:', error);
    }
}, 2000);

const onPartInfoChange = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (index === undefined) return;

    setPartObjArr(prev => {
        const updatedParts = [...prev];
        updatedParts[index] = {
            ...updatedParts[index],
            [name]: value
        };

        debouncedSave(updatedParts[index]);

        return updatedParts;
    });
};

useEffect(() => {
    if (dayjob_id) {
        getParts(parseInt(dayjob_id));
    }
}, [dayjob_id])

return (
    <div id="page" className="flex justify-center">
        <div id="page-content">

            <h1 className="text-center text-2xl font-bold">Cabin Readiness</h1>

            <div className="flex gap-10 pt-10">
                <div>
                    <label className="font-bold mr-2">DJ No</label>
                    <InputTemplate readOnly={true} />
                </div>
                <div>
                    <label htmlFor="dayjob_serial_num" className="mr-2 font-bold">Serial No</label>
                    <InputTemplate readOnly={true} />
                </div>
            </div>

            <div className="flex justify-center mt-10" id="dropdown-flex-container">
                <div id="dropdown" className=""> 
                    <PartsSelector onAddClick={handleAddPart} />
                </div>
            </div>

            <div className=" flex justify-center mt-5 h-[20px]">
                <label className="hidden text-green-600 font-bold text-xl" id="save-message">
                    Saved!
                </label>
            </div>

            <div className="mt-15 flex flex-col gap-y-10" id="parts-list">

            {
                partObjArr.map((Part, idx) =>
                {
                return (
                    <div className="flex items-center" key={idx}>
                        <HWPart
                            partObj={Part}
                            index={idx}
                            setParts={setPartObjArr}
                            onChange={(e) => onPartInfoChange(e, idx)}
                        />
                    </div>
                )
                }
                )
            }

            </div>

        </div>
    </div>
)

}

export default Page;
