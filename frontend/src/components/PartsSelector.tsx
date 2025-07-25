import Image from "next/image"
import plusSign from "../app/plus-sign.png"
import React from "react"

export default function PartsSelector ({
    onAddClick
}: {
    onAddClick: () => void
})
{
    return (
        <table id="part-selector">
            <tbody>
                <tr>
                    <td>
                        <select name="Parts" id="parts-dropdown" className="outline">
                            <option value="CPU">CPU</option>
                            <option value="HDD">HDD</option>
                            <option value="Topper">Topper</option>
                            <option value="BV">BV</option>
                        </select>
                    </td>
                    <button className="pl-2 font-bold cursor-pointer flex items-center" onClick={onAddClick}>
                        <label className="hover:text-blue-600 cursor-pointer">Add</label>
                        <Image src={plusSign.src} alt="plus sign" width={20} height={10} className="pl-1" />
                    </button>
                </tr>
            </tbody>
        </table>
    )
}