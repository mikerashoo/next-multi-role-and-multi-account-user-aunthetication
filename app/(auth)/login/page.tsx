import { LoginUserForm } from "~/components/auth/LoginUserForm";
import { AccountType } from "~/utils/constants/userRoles";

export default async function Page() {
    return <LoginUserForm type={AccountType.buyer} title="Admin Login" />;
}
