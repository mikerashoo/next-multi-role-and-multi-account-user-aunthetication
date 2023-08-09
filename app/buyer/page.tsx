import UserCard from "~/components/auth/UserCard";

export default async function Page() {
    return (
        <div className="space-y-6 p-4">
            <h1>My Dashboard</h1>

            <UserCard />
        </div>
    );
}
