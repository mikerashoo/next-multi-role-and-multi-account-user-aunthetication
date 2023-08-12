import { getServerSession } from "next-auth";
import Image from "next/image";
import SignoutBtn from "~/components/auth/SignoutBtn";
import Divider from "~/components/commons/Dividers";
import LoadingSpinner from "~/components/commons/LoadingSpinner";
import { nextAuthOptions } from "~/shared/nextAuthOptions";

export default async function Page() {
    const session = await getServerSession(nextAuthOptions);

    if (!session) return <LoadingSpinner />;

    return (
        <div className="space-y-6 p-4">
            <h1>My Profile</h1>
            <div className="card bg-base-100  items-center">
                <div className="card-body flex items-center">
                    <div className="rounded-full">
                        <Image
                            src="/imgs/profile.png"
                            alt="Profile image"
                            width={150}
                            height={150}
                        />
                    </div>

                    <h1>{session?.user?.name}</h1>
                    <span>{session?.user?.email}</span>
                    <p className="text-left">Role : {session?.user?.role}</p>

                    <Divider />

                    <SignoutBtn />
                </div>
            </div>
        </div>
    );
}
