import { getServerSession } from "next-auth";
import { LinkAccount } from "~/components/auth/LinkAccount";
import UserCard from "~/components/auth/UserCard";
import { nextAuthOptions } from "~/shared/nextAuthOptions";
import { AccountType } from "~/utils/constants/userRoles";

export default async function Page() {
    const session = await getServerSession(nextAuthOptions);

    return (
        <LinkAccount
            session={session}
            title="Link Account To Buyer"
            type={AccountType.buyer}
        />
    );
}
