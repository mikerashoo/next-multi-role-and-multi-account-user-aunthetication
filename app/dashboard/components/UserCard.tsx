"use client";

import { useSession } from "next-auth/react";

function UserCard() {
    const { data: session, status } = useSession();

    return <div>{session?.user.name}</div>;
}

export default UserCard;
