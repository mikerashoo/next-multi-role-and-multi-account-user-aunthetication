import { HTMLAttributes, ReactNode } from "react";

export interface CardProps
    extends React.DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    children?: React.ReactNode;
    title?: string;
    error?: string;
}
