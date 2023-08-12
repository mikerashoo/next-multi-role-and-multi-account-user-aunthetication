import { HTMLAttributes, ReactNode } from "react";

export interface CardProps
    extends React.DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    children?: JSX.Element;
    title?: string;
    error?: string;
}
