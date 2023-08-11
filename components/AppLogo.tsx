import Image from "next/image";
import Link from "next/link";
import React from "react";
import { NavLink } from "~/components/elemtents/buttons";

function AppLogo() {
    return (
        <Link href="/" className="">
            <div className="flex justify-center items-center">
                <div className="text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded text-sm p-2 text-center mr-1 ">
                    <Image
                        width={20}
                        height={20}
                        src={"/favicon.ico"}
                        alt="App Logo"
                    />
                </div>

                <span className="ml-4 text-lg text-red">Next Auth Test</span>
            </div>
        </Link>
    );
    return (
        <span className="">
            <NavLink href="/"></NavLink>
        </span>
    );
}

export default AppLogo;
