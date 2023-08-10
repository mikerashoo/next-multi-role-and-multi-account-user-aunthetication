import "./global.css";

import Link from "next/link";
import { PropsWithChildren, use } from "react";
import { ClientProvider } from "~/client/trpcClient";
import { rsc } from "../server-rsc/trpc";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "~/shared/auth";
import Header from "~/components/Header";
import { NextAuthProvider } from "./provider";

export default async function RootLayout(props: PropsWithChildren) {
    return (
        <ClientProvider>
            <html lang="en">
                <head>
                    <title>Next.js hello</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                </head>
                <body>
                    <NextAuthProvider>
                        <Header />
                        <main>
                            <div className="relative isolate px-6 pt-14 lg:px-8">
                                <div
                                    className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
                                    aria-hidden="true"
                                >
                                    <div
                                        className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                                        style={{
                                            clipPath:
                                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                                        }}
                                    />
                                </div>
                                <div className="mx-auto flex justify-center items-center max-w-2xl py-32 sm:py-48 lg:py-56">
                                    {props.children}
                                </div>
                            </div>
                        </main>
                    </NextAuthProvider>
                </body>
            </html>
        </ClientProvider>
    );
}
