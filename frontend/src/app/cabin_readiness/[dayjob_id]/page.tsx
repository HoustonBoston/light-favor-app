"use client"

import React, { useEffect, useState } from "react";
import InputTemplate from "../../../components/InputTemplate"
import PartsSelector from "@/components/PartsSelector";
import HWPart from "@/components/HWPart";

import {debounce} from "lodash";

import { Part, Flag } from "@/Objects/Part";

import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";
import { useDayjob } from "@/context/DayjobContext";

import 'dotenv/config';

// shows a list of the dayjobs and allows user to click on it to see parts in the dayjob
function Page () {
    const params = useParams<{ dayjob_id: string }>()
    const dayjob_id = params.dayjob_id
    const [partObjArr, setPartObjArr] = useState<Part[]>([])
    const [dayjob] = useDayjob()

    const tailscale_url = process.env.TAILSCALE_URL || "roshan-dell.taile3e522.ts.net"

const handleAddPart = async () =>
{
    const dropdown = document.getElementById('parts-dropdown') as HTMLSelectElement;
    console.log('trying to adding part of type:', dropdown.value);

    if (dropdown) {
        console.log('trying to adding part of type:', dropdown.value);
        const selectedPart = dropdown.value;
        const response = await fetch(`http://${tailscale_url}:3000/api/insert_part_once`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ dayjob_id: parseInt(dayjob_id), part_type: selectedPart }),
        });

        const result = await response.json();

        if (!result.success) {
            console.error('Failed to add part');
            return;
        }

        const newPart: Part = { part_id: result.part_id, part_type: selectedPart, part_number: null, part_serial_number: null, flag: "insert" as Flag };
        setPartObjArr([...partObjArr, newPart])
        console.log('Added new part:', newPart);
    }
};

const getParts = async (dayjob_id: number) => {
    // Fetch parts for the given dayjob_id
    const response = await fetch(`http://${tailscale_url}:3000/api/get_parts`, {
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

const debouncedUpdate = debounce(async (part: Part) => {
    try {
        const response = await fetch(`http://${tailscale_url}:3000/api/update_part_info`, {
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
}, 1000);

const onPartInfoChange = async (e: React.ChangeEvent<HTMLInputElement>, index?: number) => {
    const { name, value } = e.target;
    if (index === undefined) return;

    setPartObjArr(prev => {
        const updatedParts = [...prev];
        updatedParts[index] = {
            ...updatedParts[index],
            [name]: value
        };
        
        debouncedUpdate(updatedParts[index]);
        return updatedParts;
    });
};

const handleDeletePart = async (part_id: number, index: number) => {
    setPartObjArr(prev => prev.filter((_, i) => i !== index));

    const result = await fetch(`http://${tailscale_url}:3000/api/delete_part`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ part_id })
    });

    const data = await result.json();
    if (!data.success) {
        console.error('Failed to delete part');
    }
}

useEffect(() => {
    if (dayjob_id) {
        getParts(parseInt(dayjob_id));
    }
}, [dayjob_id])

return (
    <div id="page" className="flex justify-center min-h-screen pt-12">
        <div id="page-content" className="w-full max-w-4xl">

            {/* Fixed Header Section */}
            <div className="sticky bg-white z-10 pb-4 border-b border-gray-200">
                <h1 className="text-center text-2xl font-bold py-4">Cabin Readiness</h1>

                <div className="flex gap-10 justify-center">
                    <div className="flex items-center">
                        <label className="font-bold mr-2">DJ No</label>
                        <InputTemplate readOnly={true} value={dayjob!.dayjob_number} />
                    </div>
                    <div className="flex items-center">
                        <label htmlFor="dayjob_serial_number" className="mr-2 font-bold">Serial No</label>
                        <InputTemplate readOnly={true} value={dayjob!.dayjob_serial_number} />
                    </div>
                </div>

                <div className="flex justify-center mt-6" id="dropdown-flex-container">
                    <div id="dropdown"> 
                        <PartsSelector onAddClick={handleAddPart} />
                    </div>
                </div>

                <div className="flex justify-center mt-3 h-[20px]">
                    <label className="hidden text-green-600 font-bold text-xl" id="save-message">
                        Saved!
                    </label>
                </div>
            </div>

            {/* Scrollable Parts Section */}
            <div className="pt-8 pb-8">
                <div className="flex flex-col gap-y-6" id="parts-list">

                {
                    partObjArr.map((Part, idx) =>
                    {
                    return (
                        <div className="flex items-center justify-center" key={Part.part_id || `temp-${idx}`}>
                            <HWPart
                                partObj={Part}
                                index={idx}
                                handleDelete={() => handleDeletePart(Part.part_id!, idx)}
                                onChange={(e) => onPartInfoChange(e, idx)}
                                part_number={Part.part_number}
                                part_serial_number={Part.part_serial_number}
                            />
                        </div>
                    )
                    }
                    )
                }

                </div>
            </div>

        </div>
    </div>
)

}

export default Page;
