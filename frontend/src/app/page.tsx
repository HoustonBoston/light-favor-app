import { Input } from "@chakra-ui/input";
import React from "react";
import deleteButtonJpg from "./delete-button.jpg"
import plusSign from "./plus-sign.png"
import InputTemplate from "../components/InputTemplate"

function Page() {
  const parts: string[] = ["CPU", "HDD", "Topper", "BV"]

  return (
    <div id="page" className="flex justify-center">
      <div id="page-content">

        <h1 className="text-center mb-10 text-2xl font-bold">Cabin Readiness</h1>
        <div className="flex gap-10">
          <div id="dj-input">
            <label className="mr-2">DJ No</label>
            <InputTemplate />
          </div>
          <div className="" id="serial-input">
            <label className="mr-2">Serial No</label>
            <Input placeholder="Enter Text" className="text-center rounded-2xl border placeholder:text-center" />
          </div>
        </div>

        <div className="pt-15 flex flex-col gap-y-10" id="parts">
          {
            parts.map((part, idx) => {
              return (
                <div id="align-box-delete-button" className="flex items-center" key={idx}>

                  <div id="box" className="w-[550px] border-solid border-black border-2 h-[75px]">
                    <label className="pl-2">
                      {part}
                    </label>
                    <div id="flex-cont-part-serial-fields" className="flex justify-center">
                      <div className="" id="part-field">
                        <label className="">
                          Part No
                        </label>
                        <Input placeholder="Enter Text" className="text-center rounded-2xl border placeholder:text-center" />
                      </div>
                      <div className="ml-2" id="serial-field">
                        <label>
                          Serial No
                        </label>
                        <Input placeholder="Enter Text" className="text-center rounded-2xl border placeholder:text-center" />
                      </div>
                    </div>
                  </div>

                  <button className="ml-2 hover:cursor-pointer hover:text-red-600">
                    <img src={deleteButtonJpg.src} width={30} height={20} />
                  </button>

                  {
                    (idx == 0) ?
                      <div id="dropdown" className="relative pl-20 group">
                        <table>
                          <tr>
                            <td>
                              <select name="Parts" id="cars" className="outline">
                                <option value="CPU">CPU</option>
                                <option value="HDD">HDD</option>
                                <option value="Topper">Topper</option>
                                <option value="BV">BV</option>
                              </select>
                            </td>
                            <td>
                              <button className="pl-2">Add</button>
                            </td>
                            <td>
                              <img src={plusSign.src} width={20} height={10} className="pl-1" />
                            </td>
                          </tr>
                        </table>

                        {/* <div id="dropdown-content" className="absolute top-full">
                          {
                            parts.map((comp_part, i) => {
                              return (
                                <a key={i} className="hidden group-hover:block">{comp_part}</a>
                              )
                            })}
                        </div> */}
                      </div>
                      :
                      <></>
                  }
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
