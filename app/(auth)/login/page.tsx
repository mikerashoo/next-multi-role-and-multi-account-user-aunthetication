import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LoginUserForm } from "~/components/auth/LoginUserForm";
import { nextAuthOptions } from "~/shared/auth";
import { DefaultCard } from "~/shared/elemtents/cards";
import { AccountType } from "~/utils/constants/userRoles";

export default async function Page() {
    return <LoginUserForm type={AccountType.buyer} title="Admin Login" />;
}
