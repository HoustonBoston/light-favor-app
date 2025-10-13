"use client"

import { GoogleLogin } from "@react-oauth/google"
import { useRouter } from "next/navigation"

import { jwtDecode } from "jwt-decode"

import { useUser } from "@/context/UserContext"

import "dotenv/config";

export default function LoginPage ()
{
    const router = useRouter()
    const [_, setUser] = useUser()

    const tailscale_url = process.env.TAILSCALE_URL || "roshan-dell.taile3e522.ts.net"

    return (
        <div className="h-screen flex justify-center items-center" id="login-info">
            <GoogleLogin onSuccess={
                credentialResponse =>
                {
                    const decoded = jwtDecode(credentialResponse.credential!)
                    console.log('decoded', decoded)
                    document.cookie = `jwtLogin=${String(decoded.email)}`  // ignore underline because email does exist. Will be used for middleware.js

                    fetch(`http://${tailscale_url}:3000/api/get_user_id`,  // TODO: define an api route
                        {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ user_email: decoded.email })
                        }
                    ).then((response) =>
                    {
                        // set the user object state.
                        response.json()
                            .then((result) => setUser(prev =>
                            {
                                return {
                                    ...prev,
                                    user_email: decoded.email,
                                    user_id: result.user_id,
                                }
                            }
                            ))
                            .then(() =>
                            {
                                router.push('/cabin_readiness')
                            })
                    }
                    )
                }
            }
                onError={() =>
                {
                    console.error('Login failed')
                }}
                shape="pill"
            />
        </div>
    )
}
