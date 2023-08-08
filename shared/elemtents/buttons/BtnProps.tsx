import { LinkProps } from "next/link";

export interface BtnProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
    icon?: React.ReactElement;
}

export interface NavBtnProps extends LinkProps {
    href: string;
    children: string;
    icon?: React.ReactElement;
}
