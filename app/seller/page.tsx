import { getServerSession } from "next-auth";
import UserCard from "~/components/auth/UserCard";
import { nextAuthOptions } from "~/shared/nextAuthOptions";

export default async function Page() {
    const session = await getServerSession(nextAuthOptions);
    const account = session?.accounts.find(
        (_account) => _account.type == "seller"
    );
    return (
        <div className="space-y-6 p-4">
            <h1>My Seller Dashboard</h1>

            <UserCard user={session?.user} account={account} />
        </div>
    );
}
