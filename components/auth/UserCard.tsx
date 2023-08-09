"use client";

import { useSession } from "next-auth/react";

function UserCard() {
    const { data: session, status } = useSession();

    return (
        <div>
            <p>Name: {session?.user.name}</p>
            <p>Email: {session?.user.email}</p>
            <p>Role: {session?.user.role}</p>
        </div>
    );
}

export default UserCard;
