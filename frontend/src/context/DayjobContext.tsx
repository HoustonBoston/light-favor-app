"use client"

import { Dayjob } from "@/Objects/Dayjob"
import React from "react"

const DayjobContext = React.createContext<[Dayjob | null, React.Dispatch<React.SetStateAction<Dayjob | null>>] | null>(null)

export default function DayjobProvider ({ children }: { children: React.ReactNode })
{
    const [dayjob, setDayjob] = React.useState<Dayjob | null>(null)

    return (
        <DayjobContext.Provider value={[dayjob, setDayjob]}>
            {children}
        </DayjobContext.Provider>
    )
}

export const useDayjob = () => {
    const context = React.useContext(DayjobContext)
    if (!context) {
        throw new Error("useDayjob must be used within a DayjobProvider")
    }
    return context
}
