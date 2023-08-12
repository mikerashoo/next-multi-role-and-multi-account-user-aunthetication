import "./global.css";

import { PropsWithChildren } from "react";
import { ClientProvider } from "~/client/trpcClient";
import Header from "~/components/Header";
import { NextAuthProvider } from "./provider";
import Head from "next/head";

export default async function RootLayout(props: PropsWithChildren) {
    return (
        <ClientProvider>
            <html lang="en">
                <Head>
                    <title>Next.js hello</title>
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1.0"
                    />
                </Head>
                <body className="h-full w-full">
                    <NextAuthProvider>
                        <Header />
                        <main>
                            <div className="h-full w-full  hero not-prose min-h-screen">
                                {props.children}
                            </div>
                        </main>
                    </NextAuthProvider>
                </body>
            </html>
        </ClientProvider>
    );
}
