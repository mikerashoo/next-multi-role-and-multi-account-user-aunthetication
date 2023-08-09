import { getServerSession } from "next-auth";
import { nextAuthOptions } from "~/shared/auth";
import { PrimaryButton } from "~/shared/elemtents/buttons";
import { DefaultCard } from "~/shared/elemtents/cards";

export default async function Page() {
    const session = await getServerSession(nextAuthOptions);
    console.log("=========", session);
    return (
        <div>
            <DefaultCard>
                <h1>Admin Page</h1>
            </DefaultCard>
        </div>
    );
}
