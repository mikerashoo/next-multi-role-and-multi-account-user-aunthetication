import { TextInputProps } from "./props";

export function DefaultInput(props: TextInputProps) {
    // Render
    return (
        <input
            variant={props.variant}
            type={props.type ?? "text"}
            placeholder={props.placeholder ?? ""}
            disabled={props.disabled}
            required={props.required}
            error={props.error}
            icon={props.icon ? <>{props.icon}</> : ""}
            {...props.register}
            className="input input-bordered w-full max-w-xs"
        ></input>
    );
}
