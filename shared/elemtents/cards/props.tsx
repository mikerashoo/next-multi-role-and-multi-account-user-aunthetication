import { HTMLAttributes } from "react";

export interface CardProps
    extends React.DetailedHTMLProps<
        HTMLAttributes<HTMLDivElement>,
        HTMLDivElement
    > {
    children: React.ReactElement;
    title?: string;
    error?: string;
}
