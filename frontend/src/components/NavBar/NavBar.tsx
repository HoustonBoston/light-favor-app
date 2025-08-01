import Link from "next/link"
import { Input } from "@chakra-ui/input"
import lnwImage from "../../app/LnW-Image.png"
import Image from "next/image"

function NavBar ()
{
    return (
        <header className="shadow shadow-neutral-500 fixed duration-100 w-full h-12 bg-blue-200 z-20">
            <div className="flex flex-row justify-between w-full h-full items-center">
                <div>
                    <Image alt="LNW Logo" src={lnwImage.src} width={110} height={30} className="pl-2"></Image>
                </div>
                <div className="absolute left-[50%] -translate-x-1/2"> {/* centers the search bar */}
                    <Input
                        className="focus:outline-none w-2x bg-amber-50 rounded-2xl placeholder:text-center placeholder:cursor-auto
                        text-center placeholder:text-black"
                        placeholder="Search DJ ID"
                        width={200}
                    />
                </div>
                <div className="space-x-6 text-black">
                    <Link href="/">Home</Link>
                    <Link href="/cabin_readiness">Cabin Readiness</Link>
                    <Link href="/login" className="pr-2">Test Area</Link>
                    <Link href="/login" className="pr-2">Hospital</Link>
                    <Link href="/login" className="pr-2">Reports</Link>
                </div>
            </div>
        </header>
    )
}

export default NavBar
