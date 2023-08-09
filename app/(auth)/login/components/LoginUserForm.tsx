"use client";

import { AuthForm, useZodForm } from "~/components/auth/AuthForm";
import { DefaultCard } from "~/shared/elemtents/cards";
import { ILogin, loginSchema } from "~/shared/validation/auth";
import { trpc } from "../../../../client/trpcClient";
import { signIn, SignInResponse } from "next-auth/react";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import { FormEvent, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    CREDIENTIAL_ERROR,
    GENERAL_ERROR,
} from "~/utils/constants/apiErrorResponses";
import { useRouter } from "next/navigation";
import { DefaultInput } from "~/shared/elemtents/inputs";
import { SubmitButton } from "~/shared/elemtents/buttons";
import LabelInputVertical from "~/shared/components/LabelInputs";
import { zodResolver } from "@hookform/resolvers/zod";

const formatErrors = (errors: Record<string, FieldError>) =>
    Object.keys(errors).map((key) => ({
        key,
        message: errors[key].message,
    }));

export function LoginUserForm() {
    const [error, setError] = useState<any>();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const searchParams = useSearchParams();

    const callbackUrl = searchParams?.get("callbackUrl");

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILogin>({
        resolver: zodResolver(loginSchema),
    });

    const router = useRouter();

    const onSubmit: SubmitHandler<ILogin> = async (data) => {
        setIsLoading(true);
        setError(null);
        const { email, password } = data;
        const resp = (await signIn("credentials", {
            redirect: Boolean(false),
            email: email,
            password: password,
            callbackUrl: callbackUrl || "/",
        })) as unknown as SignInResponse;
        const { ok, error, url, status } = resp;
        if (ok && url) {
            router.push(url);
        }
        if (error) {
            setIsLoading(false);

            setError(error == CREDIENTIAL_ERROR ? error : GENERAL_ERROR);
            console.error(error);
        } else {
            setIsLoading(false);

            console.log("Res-----------", resp);
            // router.push(url!);
        }
    };
    return (
        <DefaultCard title="Login" error={error}>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
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

                <SubmitButton isLoading={isLoading}>Login</SubmitButton>
            </form>
        </DefaultCard>
    );
}
