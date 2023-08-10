import { AccountType } from "~/utils/constants/userRoles";
import { RegisterUserForm } from "../../../../components/auth/RegisterUserForm";

export default async function Page() {
    return (
        <RegisterUserForm
            title="Seller Registration"
            type={AccountType.seller}
        />
    );
}
