"use client"

import { GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation"

import { jwtDecode } from "jwt-decode"


export default function LoginPage ()
{


    const router = useRouter()

    return (
        <div className="h-screen flex justify-center items-center" id="login-info">
            <GoogleLogin onSuccess={credentialResponse =>
            {
                const decoded = jwtDecode(credentialResponse.credential!)
                document.cookie = `jwtLogin=${decoded}`
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
