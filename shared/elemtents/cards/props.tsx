import { HTMLAttributes, ReactNode } from "react";

export interface CardProps
    extends React.DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    children?: ReactNode | undefined;
    title?: string;
    error?: string;
}
