import { LinkProps } from "next/link";
import { ReactNode } from "react";

export interface BtnProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    icon?: React.ReactElement;
    isLoading?: boolean;
}

export interface NavBtnProps extends LinkProps {
    href: string;
    children?: ReactNode;

    icon?: React.ReactElement;
}
