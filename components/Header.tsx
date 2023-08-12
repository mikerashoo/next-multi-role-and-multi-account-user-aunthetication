"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import AppLogo from "./AppLogo";
export default function Header() {
    const { data: session } = useSession();

    return (
        <div className="navbar bg-base-100 px-8">
            <div className="navbar-start">
                <AppLogo />
            </div>
            <div className="nav-center">
                <ul className="mr-4">
                    <li>
                        <a href="/about">About</a>
                    </li>
                </ul>
            </div>
            <div className="navbar-end">
                {session && session.user && (
                    <div className="flex-none gap-2">
                        <div className="dropdown dropdown-end">
                            <label
                                tabIndex={0}
                                className="btn btn-ghost btn-circle avatar"
                            >
                                <div className="w-10 rounded-full">
                                    <Image
                                        src="/imgs/profile.png"
                                        alt="Profile image"
                                        fill
                                    />
                                </div>
                            </label>
                            <ul
                                tabIndex={0}
                                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                            >
                                <li>
                                    <Link href={"/profile"}>Profile</Link>
                                </li>
                                {...session.accounts.map((account) => (
                                    <li key={account.id}>
                                        <Link
                                            href={"/" + account.type}
                                            className="justify-between"
                                        >
                                            {account.name}

                                            <span className="badge">
                                                {account.type}
                                            </span>
                                        </Link>
                                    </li>
                                ))}

                                <div className="divider py-1 my-0"></div>
                                <li>
                                    <a
                                        role="button"
                                        className=""
                                        onClick={() => signOut()}
                                    >
                                        {" "}
                                        Logout
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
