"use client";

import { DefaultCard } from "~/components/elemtents/cards";
import { IAccountLink, linkAccountSchema } from "~/shared/validation/auth";
import { useSession } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { SubmitButton } from "~/components/elemtents/buttons";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountType } from "~/utils/constants/userRoles";
import { trpc } from "~/client/trpcClient";
import { Session } from "next-auth";
import LoadingSpinner from "../commons/LoadingSpinner";
import LabelInputVertical from "../commons/LabelInputs";

export function LinkAccount(props: {
    session: Session | null;
    title: string;
    type: AccountType;
}) {
    const { session, title, type } = props;
    if (!session) <LoadingSpinner />;

    const [error, setError] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { update: sessionUpdate } = useSession();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IAccountLink>({
        resolver: zodResolver(linkAccountSchema),
    });

    const router = useRouter();
    const linkAccountMutation = trpc.user.linkToAccount.useMutation({
        onSuccess: async (data) => {
            setIsLoading(false);
            const newAccounts = session?.accounts;
            newAccounts?.push(data);
            await sessionUpdate({
                accounts: newAccounts,
            });
            router.replace("/" + type);
        },
        onError: (error, variables, context) => {
            setIsLoading(false);

            console.error("error", error);
            setError(error.message);
        },
    });

    const onSubmit: SubmitHandler<IAccountLink> = async (data) => {
        console.log(data);
        setError(null);
        setIsLoading(true);
        await linkAccountMutation.mutateAsync(data);
    };

    return (
        <div className="w-50">
            <DefaultCard title={title} error={error}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <input
                        value={session?.user.userId}
                        type="hidden"
                        {...register("userId")}
                    />

                    <input
                        value={type}
                        type="hidden"
                        {...register("accountType")}
                    />
                    <LabelInputVertical
                        id="name"
                        label="Name"
                        type="text"
                        placeholder="Enter name"
                        error={errors.name}
                        register={register("name")}
                    />
                    <SubmitButton isLoading={isLoading}>Link </SubmitButton>
                </form>
            </DefaultCard>
        </div>
    );
}
