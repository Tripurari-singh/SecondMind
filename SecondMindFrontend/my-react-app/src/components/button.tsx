import type { ReactElement } from "react";

interface ButtonProps {
    variant: "primary" | "secondary";
    size: "sm" | "md" | "lg";
    text: string;
    StartIcon?: ReactElement;
    EndIcon?: ReactElement;
    onClick?: () => void;
}

const variantStyles = {
    primary: "bg-purple-400 text-white",
    secondary: "bg-purple-100 text-purple-600"
};

const sizeStyles = {
    sm: "py-1 px-2",
    md: "py-2 px-4",
    lg: "py-4 px-6"
};

const defaultStyles = "rounded-md";

export const Button = (props: ButtonProps) => {
    return (
        <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`} onClick={props.onClick}>
           {props.StartIcon} {props.text} {props.EndIcon} 
        </button>
    );
};
