import Link from "next/link";
import { useFormContext } from "react-hook-form";
import { BtnProps, NavBtnProps } from "./BtnProps";

export function DefaultButton(props: BtnProps) {
    const { children, icon, isLoading, ...rest } = props;
    // Render
    return (
        <button
            disabled={isLoading}
            {...rest}
            className="btn focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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

export function PrimaryButton(props: BtnProps) {
    const { children, icon, isLoading, ...rest } = props;
    // Render
    return (
        <button
            disabled={isLoading}
            {...rest}
            className="btn text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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

export function WarningButton(props: BtnProps) {
    const { children, icon, isLoading, ...rest } = props;
    // Render
    return (
        <button
            disabled={isLoading}
            {...rest}
            className="btn text-white bg-gradient-to-br from-red-500 to-pink-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-200 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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

export function SubmitButton(props: BtnProps) {
    const { children, icon, isLoading, ...rest } = props;
    // Render
    return (
        <button
            {...rest}
            className="btn w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-4 mt-8"
            type="submit"
            disabled={isLoading}
        >
            {isLoading ? (
                <>
                    <span className="loading loading-spinner"></span> {children}
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
            className="w-full text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
        >
            <span>{icon}</span>
            <span>{children}</span>
        </Link>
    );
}

export function NavLinkSecondary(props: NavBtnProps) {
    const { children, icon, href, ...rest } = props;
    // Render
    return (
        <Link
            href={href}
            {...rest}
            className="w-full text-white bg-gradient-to-br from-green-400 to-blue-600 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-green-200 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
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
            className="btn btn-xs btn-outline btn-primary"
            role="button"
        >
            <span>{icon}</span>
            <span>{children}</span>
        </Link>
    );
}
