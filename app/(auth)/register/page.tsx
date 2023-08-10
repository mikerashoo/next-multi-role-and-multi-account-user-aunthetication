import { RegisterUserForm } from "~/components/auth/RegisterUserForm";
import { AccountType } from "~/utils/constants/userRoles";

export default async function Page() {
    return <RegisterUserForm type={AccountType.buyer} title="Admin Register" />;
}
