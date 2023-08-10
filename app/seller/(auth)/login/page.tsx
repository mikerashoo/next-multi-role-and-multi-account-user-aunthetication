import { LoginUserForm } from "~/components/auth/LoginUserForm";
import { AccountType } from "~/utils/constants/userRoles";

export default async function Page() {
    return <LoginUserForm title="Seller Login" type={AccountType.seller} />;
}
