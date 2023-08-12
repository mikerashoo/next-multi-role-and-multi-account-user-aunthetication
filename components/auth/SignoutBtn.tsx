"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { WarningButton } from "../elemtents/buttons";

function SignoutBtn() {
    return <WarningButton onClick={() => signOut()}>Logout</WarningButton>;
}

export default SignoutBtn;
