import { Session } from "next-auth";
import Image from "next/image";
import React from "react";
import { AccountType } from "~/utils/constants/userRoles";
import { NavLink, NavLinkSecondary } from "../elemtents/buttons";

export function UnauthenticatedAccountSection(props: {
    accountType: AccountType;
}) {
    const { accountType } = props;

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex flex-col items-center p-10">
                <Image
                    src={`/imgs/${
                        accountType == "buyer" ? "shopping" : "seller"
                    }.svg`}
                    alt="Buyer Image"
                    width={200}
                    height={200}
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 ">
                    I AM A {props.accountType.toUpperCase()}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    I want to {accountType == "buyer" ? "buy" : "sell"} products
                </span>

                <div className="flex mt-4 space-x-3 md:mt-6">
                    <NavLink href={`/${accountType}/register`}>
                        {" "}
                        Register{" "}
                    </NavLink>

                    <NavLinkSecondary href={`/${accountType}/login`}>
                        {" "}
                        Login{" "}
                    </NavLinkSecondary>
                </div>
            </div>
        </div>
    );
}

export function NotLinkedSection(props: {
    accountType: AccountType;
    session: Session | null;
}) {
    const { accountType } = props;

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex flex-col items-center p-10">
                <Image
                    src={`/imgs/${
                        accountType == "buyer" ? "shopping" : "seller"
                    }.svg`}
                    alt="Buyer Image"
                    width={200}
                    height={200}
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                />
                <h5 className="mb-1 text-xl text-center font-medium text-gray-900 ">
                    I Want to be a {accountType}
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    I want to {accountType == "buyer" ? "buy" : "sell"} products
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <NavLink href={`/${accountType}/link-account`}>
                        Link My Account
                    </NavLink>
                </div>
            </div>
        </div>
    );
}

export function LinkedSection(props: {
    accountType: AccountType;
    session: Session | null;
}) {
    const { accountType } = props;

    return (
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow">
            <div className="flex flex-col items-center p-10">
                <Image
                    src={`/imgs/${
                        accountType == "buyer" ? "shopping" : "seller"
                    }.svg`}
                    alt="Buyer Image"
                    width={200}
                    height={200}
                    className="w-24 h-24 mb-3 rounded-full shadow-lg"
                />
                <h5 className="w-full mb-1 text-xl text-center font-medium text-gray-900 ">
                    My {accountType} account
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    Go to {accountType} dashboard
                </span>
                <div className="flex mt-4 space-x-3 md:mt-6">
                    <NavLink href={`/${accountType}`}>Dashboard</NavLink>
                </div>
            </div>
        </div>
    );
}

function HomePageAccountSection(props: {
    accountType: AccountType;
    session: Session | null;
}) {
    const { accountType, session } = props;
    if (!session || !session.user)
        return <UnauthenticatedAccountSection accountType={accountType} />;

    if (session.accounts.find((account) => account.type == accountType))
        return <LinkedSection accountType={accountType} session={session} />;

    return <NotLinkedSection accountType={accountType} session={session} />;
}

export default HomePageAccountSection;
