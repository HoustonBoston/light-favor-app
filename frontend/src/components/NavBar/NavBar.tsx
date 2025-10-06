import Link from "next/link"
import { Input } from "@chakra-ui/input"
import lnwImage from "../../app/LnW-Image.png"
import Image from "next/image"


// TODO: add search functionality   
function NavBar ()
{
    return (
        <header className="shadow shadow-neutral-500 fixed duration-100 w-full h-12 bg-blue-200 z-20" id="top-navbar">
            <div className="flex flex-row justify-between w-full h-full items-center outline px-4 relative">
                <Image alt="LNW Logo" src={lnwImage.src} width={110} height={48} className="h-12 w-auto" />
                <input
                    className="focus:outline-none w-64 bg-amber-50 rounded-2xl placeholder:text-center placeholder:cursor-auto
                        text-center placeholder:text-black absolute left-1/2 transform -translate-x-1/2"
                    placeholder="Search DJ ID"
                    required
                />
                <div className="flex gap-4 text-black">
                    <Link href="/">Home</Link>
                    <Link href="/cabin_readiness">Cabin Readiness</Link>
                    <Link href="/login">Test Area</Link>
                    <Link href="/login">Hospital</Link>
                    <Link href="/login">Reports</Link>
                </div>
            </div>
        </header>
    )
}

export default NavBar
