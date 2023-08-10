"use client";

import Link from "next/link";
import React from "react";
import {
    ArrowDownCircleIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import { NavButton, NavLink, PrimaryButton } from "~/shared/elemtents/buttons";
import { signOut, useSession } from "next-auth/react";
import AppLogo from "./AppLogo";
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
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
                <AppLogo />
                <div className="flex md:order-2">
                    {session && session.user && (
                        <div className="flex flex-col p-4 md:p-0 mt-4 font-medium borde md:flex-row md:space-x-8 md:mt-0 md:border-0">
                            <div className="flex flex-row justify-center items-center">
                                <div>
                                    <p>
                                        <UserCircleIcon
                                            width={20}
                                            className="inline"
                                        />
                                        {session.user.name}
                                    </p>
                                </div>

                                <details className="dropdown">
                                    <summary className="m-1 btn">
                                        <ArrowDownCircleIcon
                                            width={20}
                                            className="inline"
                                        />
                                    </summary>
                                    <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
                                        {...session.user.accounts.map(
                                            (account) => (
                                                <li key={account.id}>
                                                    <Link
                                                        href={
                                                            "/" + account.type
                                                        }
                                                    >
                                                        My {account.type}{" "}
                                                        account
                                                    </Link>
                                                </li>
                                            )
                                        )}
                                        <li className="mt-4">
                                            <PrimaryButton
                                                onClick={() => signOut()}
                                            >
                                                Logout
                                            </PrimaryButton>
                                        </li>
                                    </ul>
                                </details>
                            </div>
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
                                <NavLink
                                    href={
                                        session.user.isAdmin
                                            ? "/admin/dashboard"
                                            : "/dashboard"
                                    }
                                >
                                    Dashboard
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </nav>
    );
}
