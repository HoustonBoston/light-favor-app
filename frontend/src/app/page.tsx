"use client"

import { GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation"

import { useAuth } from "@/contexts/AuthContext"

export default function LoginPage ()
{


    const router = useRouter()
    const { loggedIn, setLoggedIn } = useAuth()

    return (
        <div className="h-screen flex justify-center items-center" id="login-info">
            <GoogleLogin onSuccess={credentialResponse =>
            {
                console.log(credentialResponse)
                setLoggedIn(true)
                router.push('/cabin_readiness')
            }}
                onError={() =>
                {
                    console.error('Login failed')
                }}
                shape="pill"
            />
        </div>
    )
}