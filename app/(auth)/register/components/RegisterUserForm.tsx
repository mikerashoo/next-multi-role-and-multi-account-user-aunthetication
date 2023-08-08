"use client";

import { AuthForm, SubmitButton, useZodForm } from "~/components/auth/AuthForm";
import { DefaultCard } from "~/shared/elemtents/cards";
import { signUpSchema } from "~/shared/validation/auth";
import { trpc } from "../../../../client/trpcClient";
import { signIn } from "next-auth/react";
import { DefaultInput } from "~/shared/elemtents/inputs";
import { useState } from "react";

export function RegisterUserForm() {
    const [error, setError] = useState<any>();

    const form = useZodForm({
        schema: signUpSchema,
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });
    const mutation = trpc.user.register.useMutation({
        onSuccess: async (data) => {
            signIn(undefined, { callbackUrl: "/" });
        },
        onError: (error, variables, context) => {
            setError(error.message);
        },
    });
    console.log(form.formState);

    return (
        <DefaultCard title="Register" error={error}>
            <div>
                <AuthForm
                    form={form}
                    handleSubmit={async (values) => {
                        console.log("Values");
                        const resp = await mutation.mutateAsync(values);
                        console.log("Reap", resp);
                        form.reset();
                    }}
                    className="space-y-2"
                >
                    <div>
                        <label>
                            Name
                            <br />
                            <DefaultInput
                                key="name"
                                type="name"
                                placeholder="Enter name"
                                register={{ ...form.register("name") }}
                            />
                        </label>

                        {form.formState.errors.name?.message && (
                            <p className="text-red-700">
                                {form.formState.errors.name?.message}
                            </p>
                        )}
                    </div>
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
                                key="password"
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
                    Register
                </SubmitButton>
            </div>
        </DefaultCard>
    );
}
