import { getServerSession } from "next-auth";
import { nextAuthOptions } from "~/shared/auth";
import UserCard from "./components/UserCard";

export default async function Page() {
    return (
        <div className="space-y-6 p-4">
            <h1>My Dashboard</h1>

            <UserCard />
        </div>
    );
}
