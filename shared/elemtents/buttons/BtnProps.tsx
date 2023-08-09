import { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface BtnProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    icon?: React.ReactElement;
    isLoading?: boolean;
}

export interface NavBtnProps extends LinkProps {
    href: string;
    children?: ReactNode | undefined;

    icon?: React.ReactElement;
}
