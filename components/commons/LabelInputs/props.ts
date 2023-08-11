import { FieldError } from "react-hook-form";

export type LabelInputProps = { 
    id: string;
    label: string;
    error?: FieldError;
    type?: string;
    placeholder?: string;
    register?: any;
};
