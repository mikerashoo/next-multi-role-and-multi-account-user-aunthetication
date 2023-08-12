import { LinkProps } from "next/link";

export interface BtnProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children?: JSX.Element | JSX.Element[];

    icon?: React.ReactElement;
    isLoading?: boolean;
}

export interface NavBtnProps extends LinkProps {
    href: string;
    children?: JSX.Element | JSX.Element[];

    icon?: React.ReactElement;
}
