import { HTMLAttributes } from "react";

export interface CardProps extends React.PropsWithChildren {
    title?: string;
    error?: string;
}
