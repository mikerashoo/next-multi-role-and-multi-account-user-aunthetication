import { PropsWithChildren } from "react";

export interface CardProps extends PropsWithChildren {
    title?: string;
    error?: string;
}
