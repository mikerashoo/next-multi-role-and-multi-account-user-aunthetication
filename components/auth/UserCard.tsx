"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Account, Session, User } from "next-auth";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { trpc } from "~/client/trpcClient";
import { useRouter } from "next/navigation";
import {
    deleteAccountSchema,
    IDeleteAccountLink,
} from "~/shared/validation/auth";
import {
    DefaultButton,
    PrimaryButton,
    WarningButton,
} from "../elemtents/buttons";
import { DefaultCard } from "../elemtents/cards";
function UserCard(props: { user: User | undefined; account: Account }) {
    const { user, account } = props;
    console.log(account);

    const [error, setError] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data: session, update: sessionUpdate } = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IDeleteAccountLink>({
        resolver: zodResolver(deleteAccountSchema),
    });
    const router = useRouter();

    const deleteAccountMutation = trpc.user.deleteAccount.useMutation({
        onSuccess: async (data) => {
            console.log(data);
            setIsLoading(false);
            const accounts = session?.accounts;
            const filterAccounts = accounts?.filter(
                (_account) => _account.id != account.id
            );
            await sessionUpdate({
                accounts: filterAccounts,
            });
            router.push("/");
        },
        onError: (error, variables, context) => {
            setIsLoading(false);

            console.error("error", error);
            setError(error.message);
        },
    });

    const onSubmit: SubmitHandler<IDeleteAccountLink> = async (data) => {
        setError(null);
        setIsLoading(false);
        setIsModalOpen(false);

        const resp = await deleteAccountMutation.mutateAsync(data);
    };
    return (
        <DefaultCard error={error}>
            <p>Name: {user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Role: {user?.role}</p>
            <div className="divider"></div>

            <div>
                {/* The button to open modal */}
                <WarningButton onClick={() => setIsModalOpen(true)}>
                    Delete my {account.type} account
                </WarningButton>

                {/* Put this part before </body> tag */}
                <input
                    type="checkbox"
                    id="delete_account_modal"
                    className="modal-toggle"
                />
                <div className={`modal ${isModalOpen ? "modal-open" : ""}`}>
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">Delete Account!</h3>
                        <p className="py-4">
                            Are you sure you want to delete {account.type}{" "}
                            account
                        </p>

                        <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="space-y-2"
                        >
                            <input
                                value={user?.userId}
                                type="hidden"
                                {...register("userId")}
                            />

                            <input
                                value={account.id?.toString() ?? ""}
                                type="hidden"
                                {...register("accountId")}
                            />
                            <div className="flex items-end justify-end align-center">
                                <DefaultButton
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    No Cancel!
                                </DefaultButton>
                                <WarningButton
                                    isLoading={isLoading}
                                    type="submit"
                                >
                                    Yes Delete!
                                </WarningButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </DefaultCard>
    );
}

export default UserCard;
