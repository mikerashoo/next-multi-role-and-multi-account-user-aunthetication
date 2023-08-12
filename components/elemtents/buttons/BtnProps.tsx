import { LinkProps } from "next/link";

export interface BtnProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    icon?: React.ReactElement;
    isLoading?: boolean;
}

export interface NavBtnProps extends LinkProps {
    href: string;
    children?: React.ReactNode;

    icon?: React.ReactElement;
}
