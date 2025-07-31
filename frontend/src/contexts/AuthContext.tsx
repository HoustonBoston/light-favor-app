import React, { createContext, useState } from "react"

const AuthContext = createContext<boolean | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) =>
{
    const [loggedIn, setLoggedIn] = useState(false)

    return (
        <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            {children}
        </AuthContext.Provider>
    )
}
