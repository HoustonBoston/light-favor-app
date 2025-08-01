"use client"

import React, { createContext, useContext, useState } from "react"

type AuthContextType = {
    loggedIn: boolean;
    setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthContextProvider = ({ children }: { children: React.ReactNode }) =>
{
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () =>
{
    const context = useContext(AuthContext)

    if (context === undefined)
        throw new Error("useAuth must be used within an AuthProvider")

    return context
}
