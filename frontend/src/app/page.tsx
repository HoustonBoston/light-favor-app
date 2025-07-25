"use client"

import React, { useState } from "react";
import InputTemplate from "../components/InputTemplate"
import PartsSelector from "@/components/PartsSelector";
import HWPart from "@/components/HWPart";

function Page ()
{
  const [parts, setParts] = useState<string[]>([])  // initial state is empty

  const handleAdd = () =>
  {
    const dropdown = document.getElementById('parts-dropdown') as HTMLSelectElement

    if (dropdown) {
      const selectedVal = dropdown.value
      setParts(prev => [...prev, selectedVal])
      console.log('parts updated')
    }
  }

  return (
    <div id="page" className="flex justify-center">
      <div id="page-content">

        <h1 className="text-center mb-10 text-2xl font-bold ">Cabin Readiness</h1>
        <div className="flex gap-10">
          <div id="dj-input">
            <label className="mr-2 font-bold">DJ No</label>
            <InputTemplate />
          </div>
          <div className="" id="serial-input">
            <label className="mr-2 font-bold">Serial No</label>
            <InputTemplate />
          </div>
        </div>

        <div className="flex justify-center mt-10" id="dropdown-flex-contaienr">
          <div id="dropdown" className=""> {/* Centered horizontally on the page */}
            <PartsSelector onAddClick={handleAdd} />
          </div>
        </div>

        <div className="mt-15 flex flex-col gap-y-10 relative" id="parts-list">

          {
            parts.map((part, idx) =>
            {
              return (
                <div id="align-box-delete-button" className="flex items-center" key={idx}>
                  <HWPart part={part} partsArr={parts} index={idx} setParts={setParts} />
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
