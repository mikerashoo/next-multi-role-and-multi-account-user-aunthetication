import { AccountType } from "~/utils/constants/userRoles";
import { RegisterUserForm } from "../../../../components/auth/RegisterUserForm";

export default async function Page() {
    return (
        <RegisterUserForm title="Buyer Registration" type={AccountType.buyer} />
    );
}
