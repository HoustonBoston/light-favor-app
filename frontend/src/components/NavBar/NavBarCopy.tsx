import Link from "next/link"
import { Input } from "@chakra-ui/input"
import lnwImage from "../../app/LnW-Image.png"

function NavBar() {
    return (
        <header className="shadow shadow-neutral-500 fixed duration-100 w-full h-12 bg-blue-200 z-20">

            <div className="flex justify-between flex-row w-full h-full items-center">
                <div className="ml-[50%] -translate-x-1/2">

                    <Input
                        className="focus:outline-none w-2x bg-amber-50 rounded-2xl placeholder:text-center placeholder:cursor-auto
                        text-center placeholder:text-black"
                        placeholder="Search DJ ID"
                    />
                </div>
                <div className="space-x-6 text-blue-500">
                    <Link href="/">Home</Link>
                    <Link href="/movies">Cabin Readiness</Link>
                    <Link href="/login" className="pr-2">Test Area</Link>
                    <Link href="/login" className="pr-2">Hospital</Link>
                    <Link href="/login" className="pr-2">Reports</Link>
                </div>
            </div>
        </header>
    )
}

export default NavBar
