"use client";

import { DefaultCard } from "~/components/elemtents/cards";
import { ILogin, loginSchema } from "~/shared/validation/auth";
import { signIn, SignInResponse } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    CREDIENTIAL_ERROR,
    GENERAL_ERROR,
} from "~/utils/constants/apiErrorResponses";
import { useRouter } from "next/navigation";
import { SubmitButton } from "~/components/elemtents/buttons";
import LabelInputVertical from "~/components/commons/LabelInputs";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountType } from "~/utils/constants/userRoles";
import Link from "next/link";

export function LoginUserForm(props: { title: string; type: AccountType }) {
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
            callbackUrl: "/" + props.type,
        })) as unknown as SignInResponse;
        const { ok, error, url } = resp;
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
        <div className="w-50">
            <DefaultCard title={props.title} error={error}>
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

                    <p className="text-gray-500 dark:text-gray-400">
                        Not registered yet?{" "}
                        <Link
                            href={`/${props.type}/register`}
                            className="font-medium text-blue-600 underline dark:text-blue-500 hover:no-underline"
                        >
                            Register
                        </Link>
                    </p>
                </form>
            </DefaultCard>
        </div>
    );
}
