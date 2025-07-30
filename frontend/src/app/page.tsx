"use client"

import React, { useEffect, useState } from "react";
import InputTemplate from "../components/InputTemplate"
import PartsSelector from "@/components/PartsSelector";
import HWPart from "@/components/HWPart";

import { Part, Flag } from "@/Objects/Part";
import { Dayjob } from "@/Objects/Dayjob";


function Page ()
{
  const [dayjob, setDayjob] = useState<Dayjob>({
    dayjob_num: 123,
    dayjob_serial_num: 123,
    parts: [],
    user_id: "user",
    date: 10,
    dayjob_id: null
  })  // initial state, will be changed when save button is pressed

  const [partObjArr, setPartObjArr] = useState<Part[]>([])
  const [dayjobIdFetchResult, setDayjobIdFetchResult] = useState<number>()

  useEffect(
    () =>
    {
      if (typeof dayjobIdFetchResult == "number") {
        console.log('dayjobIdFetchResult: ', dayjobIdFetchResult)
        setDayjob(prev => (
          { ...prev, dayjob_id: dayjobIdFetchResult, parts: partObjArr }
        ))
      }
    },
    [dayjobIdFetchResult, partObjArr] // when the fetchResult or part array changes it will be updated in the dayjob object
  )

  const handleAddPart = async () =>
  {
    const dropdown = document.getElementById('parts-dropdown') as HTMLSelectElement;

    if (dropdown) {
      const selectedPart = dropdown.value;
      const newPart: Part = { part_type: selectedPart, part_num: null, part_serial_num: null, flag: "insert" as Flag };
      setPartObjArr([...partObjArr, newPart])
    }
  };

  const handleSave = async () =>
  {
    try {
      const response = await fetch('http://localhost:3000/api', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(dayjob)
      });

      const json = await response.json()
      setDayjobIdFetchResult(json.result);  // result returned from api which is returned from save_dayjob_info function

      setPartObjArr(prev =>
        prev.map(part => (
          { ...part, flag: "update" }
        ))
      )  // sets each of the item's flag to update.

      if (response.ok) {
        console.log('Dayjob saved successfully:');
      } else {
        console.error('Failed to save dayjob:');
      }
    } catch (error) {
      console.error('Network or unexpected error:', error);
    }
  };

  const onDayjobInfoChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  {
    const { name, value } = e.target
    setDayjob(prev => (
      { ...prev, [name]: value }
    ))
  }

  return (
    <div id="page" className="flex justify-center">
      <div id="page-content">

        <h1 className="text-center mb-10 text-2xl font-bold ">Cabin Readiness</h1>
        <div className="flex gap-10">
          <div id="dj-input">
            <label className="mr-2 font-bold">DJ No</label>
            <InputTemplate name="dayjob_num" id="dj-num" onChange={onDayjobInfoChange} />
          </div>
          <div className="" id="serial-input">
            <label className="mr-2 font-bold">Serial No</label>
            <InputTemplate name="dayjob_serial_num" id="dj-serial-num" onChange={onDayjobInfoChange} />
          </div>
        </div>

        <div className="flex justify-center mt-10" id="dropdown-flex-contaienr">
          <div id="dropdown" className=""> {/* Centered horizontally on the page */}
            <PartsSelector onAddClick={handleAddPart} />
          </div>
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
                    setDayjob={setDayjob}
                  />
                </div>
              )
            }
            )
          }


        </div>

        <div id="button-div" className="mt-5 flex justify-end">
          <button onClick={handleSave} type="submit" className="cursor-pointer">Save</button>
        </div>

      </div>
    </div>
  )

}

export default Page;
