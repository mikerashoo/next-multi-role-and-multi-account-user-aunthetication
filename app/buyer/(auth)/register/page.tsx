import { AccountType } from "~/utils/constants/userRoles";
import { RegisterUserForm } from "../../../../components/auth/RegisterUserForm";

export default async function Page() {
    return (
        <div>
            <RegisterUserForm
                title="Buyer Registration"
                type={AccountType.buyer}
            />
        </div>
    );
}
