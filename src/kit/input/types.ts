import { VariantProps } from "class-variance-authority";
import { InputHTMLAttributes } from "react";
import { inputVariants } from "./Input";

export type InputProps = InputHTMLAttributes<HTMLInputElement> &
    VariantProps<typeof inputVariants> & {};
