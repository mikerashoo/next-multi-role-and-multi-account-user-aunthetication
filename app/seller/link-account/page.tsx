import { getServerSession } from "next-auth";
import { LinkAccount } from "~/components/auth/LinkAccount";
import { nextAuthOptions } from "~/shared/nextAuthOptions";
import { AccountType } from "~/utils/constants/userRoles";

export default async function Page() {
    const session = await getServerSession(nextAuthOptions);

    return (
        <LinkAccount
            session={session}
            title="Link Account To Seller"
            type={AccountType.seller}
        />
    );
}
