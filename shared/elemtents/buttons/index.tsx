import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { BtnProps, NavBtnProps } from "./BtnProps";

export function PrimaryButton(props: BtnProps) {
    const { children, icon, ...rest } = props;
    // Render
    return (
        <button {...rest} className="btn btn-sm btn-outline btn-primary">
            <span>{icon}</span>
            <span>{children}</span>
        </button>
    );
}

export function SubmitButton(props: BtnProps) {
    const { children, icon, isLoading, ...rest } = props;
    // Render
    return (
        <button
            {...rest}
            className="btn btn-sm  w-full btn-outline btn-primary"
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <span className="loading loading-spinner"></span>{" "}
                    {props.children}
                </>
            ) : (
                <>
                    <span>{icon}</span>
                    <span>{children}</span>
                </>
            )}
        </button>
    );
}

export function NavLink(props: NavBtnProps) {
    const { children, icon, href, ...rest } = props;
    // Render
    return (
        <Link
            href={href}
            {...rest}
            className="btn btn-sm btn-link"
            role="button"
        >
            <span>{icon}</span>
            <span>{children}</span>
        </Link>
    );
}

export function NavButton(props: NavBtnProps) {
    const { children, icon, href, ...rest } = props;
    // Render
    return (
        <Link
            href={href}
            {...rest}
            className="btn btn-sm btn-outline btn-primary"
            role="button"
        >
            <span>{icon}</span>
            <span>{children}</span>
        </Link>
    );
}
