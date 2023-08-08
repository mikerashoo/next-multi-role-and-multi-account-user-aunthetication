"use client";

import { AuthForm, SubmitButton, useZodForm } from "~/components/auth/AuthForm";
import { DefaultCard } from "~/shared/elemtents/cards";
import { loginSchema } from "~/shared/validation/auth";
import { trpc } from "../../../../client/trpcClient";
import { signIn, SignInResponse } from "next-auth/react";
import { FieldError } from "react-hook-form";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import {
    CREDIENTIAL_ERROR,
    GENERAL_ERROR,
} from "~/utils/constants/apiErrorResponses";
import { useRouter } from "next/navigation";
import { DefaultInput } from "~/shared/elemtents/inputs";

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

    const form = useZodForm({
        schema: loginSchema,
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const router = useRouter();

    console.log(form.formState);

    return (
        <DefaultCard title="Login" error={error}>
            <>
                <AuthForm
                    form={form}
                    handleSubmit={async (values) => {
                        try {
                            setIsLoading(true);
                            setError(null);

                            const resp = (await signIn("credentials", {
                                redirect: Boolean(false),
                                email: values.email,
                                password: values.password,
                                callbackUrl: callbackUrl || "/",
                            })) as unknown as SignInResponse;
                            const { ok, error, url, status } = resp;
                            if (ok && url) {
                                router.push(url);
                            }
                            if (error) {
                                setIsLoading(false);

                                setError(
                                    error == CREDIENTIAL_ERROR
                                        ? error
                                        : GENERAL_ERROR
                                );
                                console.error(error);
                            } else {
                                setIsLoading(false);

                                console.log("Res-----------", resp);
                                // router.push(url!);
                            }
                        } catch (error) {
                            console.error("signIn error", error as Error);
                            setIsLoading(false);

                            // if (error instanceof Error) {
                            //     setError({ message: error.message });
                            // }
                        }
                    }}
                    className="space-y-2"
                >
                    <div>
                        <label>
                            Email
                            <br />
                            <DefaultInput
                                key="email"
                                type="email"
                                placeholder="Enter email"
                                register={{ ...form.register("email") }}
                            />
                        </label>
                        {form.formState.errors.email?.message && (
                            <p className="text-red-700">
                                {form.formState.errors.email?.message}
                            </p>
                        )}
                    </div>
                    <div>
                        <label>
                            Password
                            <br />
                            <DefaultInput
                                key="pass"
                                type="password"
                                placeholder="Enter password"
                                register={{ ...form.register("password") }}
                            />
                        </label>
                        {form.formState.errors.password?.message && (
                            <p className="text-red-700">
                                {form.formState.errors.password?.message}
                            </p>
                        )}
                    </div>
                </AuthForm>

                <SubmitButton
                    form={form} // If you place the submit button outside of the form, you need to specify the form to submit
                    className="border bg-primary-500 text-white p-2 font-bold"
                >
                    Login
                </SubmitButton>
            </>
        </DefaultCard>
    );
}
