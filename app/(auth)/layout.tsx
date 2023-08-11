import { PropsWithChildren } from "react";
import { ClientProvider } from "~/client/trpcClient";
import Header from "~/components/Header";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "~/shared/nextAuthOptions";
import { redirect } from "next/navigation";

export default async function RootLayout(props: PropsWithChildren) {
    const session = await getServerSession(nextAuthOptions);

    if (session) redirect("/");
    return <>{props.children}</>;
}
