"use client"

import { UserState } from "@/Objects/User"
import React, { useContext, useState, createContext, ReactNode, SetStateAction } from "react"

type UserContextType = [UserState, React.Dispatch<SetStateAction<UserState>>];
const userContext = createContext<UserContextType | null>(null)

export default function UserProvider ({ children }: { children: ReactNode })
{
    const [user, setUser] = useState<UserState>(null)

    return (
        <userContext.Provider value={[user, setUser]}>
            {children}
        </userContext.Provider>
    )
}

export const useUser = () =>
{
    const ctx = useContext(userContext)
    if (!ctx) throw new Error("useUser must be used inside a UserProvider")
    return ctx
} 
