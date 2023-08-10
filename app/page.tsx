import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { nextAuthOptions } from "~/shared/auth";
import { NavLink, NavLinkSecondary } from "~/shared/elemtents/buttons";
import { AccountType } from "~/utils/constants/userRoles";

export default async function Page() {
    const session = await getServerSession(nextAuthOptions);
    console.log("=========", session);
    return (
        <div className="flex space-x-4">
            {Object.values(AccountType).map((accountType) => (
                <AccountDetail key={accountType} accountType={accountType} />
            ))}
        </div>
    );
}

function AccountDetail(props: { accountType: AccountType }) {
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
