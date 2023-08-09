"use client";

import { AuthForm, useZodForm } from "~/components/auth/AuthForm";
import { DefaultCard } from "~/shared/elemtents/cards";
import { ISignUp, signUpSchema } from "~/shared/validation/auth";
import { trpc } from "../../../../client/trpcClient";
import { signIn } from "next-auth/react";
import { DefaultInput } from "~/shared/elemtents/inputs";
import { FormEvent, useState } from "react";
import { SubmitButton } from "~/shared/elemtents/buttons";
import { Inputs } from "~/shared/utils";
import LabelInputVertical from "~/shared/components/LabelInputs";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function RegisterUserForm() {
    const [error, setError] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>();

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
            signIn(undefined, { callbackUrl: "/" });
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
        } catch (cause) {
            console.error({ cause }, "Failed to register");
        }
    };

    return (
        <DefaultCard title="Register" error={error}>
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
            </form>
        </DefaultCard>
    );
}
