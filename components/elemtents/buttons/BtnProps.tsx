import { LinkProps } from "next/link";
import { PropsWithChildren, ReactNode } from "react";

export interface BtnProps extends PropsWithChildren {
    icon?: React.ReactElement;
    isLoading?: boolean;
}

export interface NavBtnProps extends PropsWithChildren {
    href: string;

    icon?: React.ReactElement;
}
