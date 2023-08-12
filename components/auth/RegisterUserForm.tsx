"use client";

import { DefaultCard } from "~/components/elemtents/cards";
import { ISignUp, signUpSchema } from "~/shared/validation/auth";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { SubmitButton } from "~/components/elemtents/buttons";
import LabelInputVertical from "~/components/commons/LabelInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from "~/client/trpcClient";
import { AccountType } from "~/utils/constants/userRoles";
import Link from "next/link";

export function RegisterUserForm(props: { title: string; type: AccountType }) {
    const [error, setError] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>();
    const { title, type } = props;
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignUp>({
        resolver: zodResolver(signUpSchema),
    });

    const registerMutation = trpc.user.register.useMutation({
        onSuccess: async (data) => {
            setIsLoading(false);

            console.log("Registered data", data);

            // signIn(undefined, { callbackUrl: "/" });
        },
        onError: (error, variables, context) => {
            setIsLoading(false);

            console.error("error", error);
            setError(error.message);
        },
    });
    const onSubmit: SubmitHandler<ISignUp> = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            await registerMutation.mutateAsync(data);
            signIn("credentials", {
                redirect: Boolean(true),
                email: data.email,
                password: data.password,
                callbackUrl: "/" + type,
            });
        } catch (cause) {
            console.error({ cause }, "Failed to register");
        }
    };

    return (
        <div className="w-50">
            <DefaultCard title={title} error={error}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
                    <LabelInputVertical
                        id="name"
                        label="Name"
                        type="text"
                        placeholder="Enter name"
                        error={errors.name}
                        register={register("name")}
                    />

                    <LabelInputVertical
                        id="email"
                        label="Email"
                        type="email"
                        error={errors.email}
                        placeholder="Enter email here"
                        register={register("email")}
                    />

                    <LabelInputVertical
                        id="password"
                        label="Password"
                        type="password"
                        error={errors.password}
                        placeholder="Enter password here"
                        register={register("password")}
                    />

                    <SubmitButton isLoading={isLoading}>Register</SubmitButton>

                    <p className="text-gray-500 dark:text-gray-400">
                        Have account{" "}
                        <Link
                            href={`/${type}/login`}
                            className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </DefaultCard>
        </div>
    );
}
