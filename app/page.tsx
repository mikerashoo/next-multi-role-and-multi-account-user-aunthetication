import { getServerSession } from "next-auth";
import { nextAuthOptions } from "~/shared/nextAuthOptions";
import { AccountType } from "~/utils/constants/userRoles";
import HomePageAccountSection from "~/components/home-components/HomePageAccountSection";

export default async function Page() {
    const session = await getServerSession(nextAuthOptions);

    return (
        <div className=" flex justify-center space-x-8 w-full">
            {Object.values(AccountType).map((accountType) => (
                <HomePageAccountSection
                    key={accountType}
                    session={session}
                    accountType={accountType}
                />
            ))}
        </div>
    );
}
