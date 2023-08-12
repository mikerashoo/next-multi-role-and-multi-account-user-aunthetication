import React, { useId } from "react";
import { DefaultInput } from "~/components/elemtents/inputs";
import { LabelInputProps } from "./props";

function LabelInputVertical(props: LabelInputProps) {
    const { id, label, error, type, placeholder, register } = props;
    return (
        <div id={"input-" + label}>
            <label
                className="block mb-2 text-sm font-bold text-gray-700"
                htmlFor={id}
            >
                {label}
            </label>
            <input
                id={id}
                className={`w-96 px-3 py-2 text-sm leading-tight text-gray-700 border ${
                    error && "border-red-500"
                } rounded appearance-none focus:outline-none focus:shadow-outline`}
                type={type ?? "text"}
                placeholder={placeholder ?? ""}
                {...register}
            />

            {error && (
                <p className="text-xs italic text-red-500 mt-2">
                    {error?.message}
                </p>
            )}
        </div>
    );
}

export default LabelInputVertical;
