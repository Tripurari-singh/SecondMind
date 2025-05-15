import type { ReactElement } from "react";

interface ButtonProps {
    varient : "primary" | "secondary";
    text : string;
    startIcon : ReactElement
}
 const varientClasses = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-100 text-purple-600"
 }

 const defaultStyles = "px-4 py-2 rounded-lg font-light flex";

export function Button({varient , text , startIcon} : ButtonProps){
    return <button className={varientClasses[varient] + " "  + defaultStyles}>
            {startIcon}
            {text}
    </button>
}