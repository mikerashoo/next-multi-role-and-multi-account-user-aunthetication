"use client";

import Link from "next/link";
import React, { useState } from "react";
import {
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import {
    ChevronDownIcon,
    PhoneIcon,
    PlayCircleIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";
import { NavButton, NavLink, PrimaryButton } from "~/shared/elemtents/buttons";
import { signOut, useSession } from "next-auth/react";
const navigation = [
    { name: "Product", href: "#" },
    { name: "Features", href: "#" },
    { name: "Marketplace", href: "#" },
    { name: "Company", href: "#" },
];

export default function Header() {
    const { data: session, status } = useSession();

    const logout = async () => {
        console.log("this");
    };

    return (
        <nav className="bg-white  fixed w-full z-20 top-0 left-0 border-b border-gray-200">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link href="/" className="flex items-center">
                    <Image
                        width={100}
                        height={100}
                        src="https://flowbite.com/docs/images/logo.svg"
                        className="h-8 mr-3"
                        alt="Flowbite Logo"
                    />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap ">
                        Flowbite
                    </span>
                </Link>
                <div className="flex md:order-2">
                    {session && session.user ? (
                        <div className="flex flex-col p-4 md:p-0 mt-4 font-medium borde md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            {session.user.name}
                            <PrimaryButton onClick={() => signOut()}>
                                Logout
                            </PrimaryButton>
                        </div>
                    ) : (
                        <div className="flex flex-col p-4 md:p-0 mt-4 font-medium borde md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <NavButton href="/login">Login</NavButton>
                            <NavButton href="/register">Register</NavButton>
                        </div>
                    )}

                    <button
                        data-collapse-toggle="navbar-sticky"
                        type="button"
                        className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                        aria-controls="navbar-sticky"
                        aria-expanded="false"
                    >
                        <span className="sr-only">Open main menu</span>
                        <svg
                            className="w-5 h-5"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 17 14"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M1 1h15M1 7h15M1 13h15"
                            />
                        </svg>
                    </button>
                </div>
                <div
                    className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
                    id="navbar-sticky"
                >
                    {session && session.user && (
                        <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium borde md:flex-row md:space-x-8 md:mt-0 md:border-0  ">
                            <li>
                                <NavLink href="/dashboard"> Dashboard </NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}
