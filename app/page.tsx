import { getServerSession } from "next-auth";
import { nextAuthOptions } from "~/shared/auth";
import { PrimaryButton } from "~/shared/elemtents/buttons";

export default async function Page() {
    const session = await getServerSession(nextAuthOptions);
    console.log("=========", session);
    return (
        <div>
            <h1>HOme Page</h1>
        </div>
    );
}
