import type { ReactElement } from "react";

interface ButtonProps {
    onClick? : () => void,
    varient : "primary" | "secondary";
    text : string;
    startIcon : ReactElement
}
 const varientClasses = {
    "primary" : "bg-purple-600 text-white",
    "secondary" : "bg-purple-100 text-purple-600"
 }

 const defaultStyles = "px-4 py-2 rounded-lg font-light flex justify-center items-center cursor-pointer hover";

export function Button({varient , text , startIcon , onClick} : ButtonProps){
    return <button onClick={onClick} className={varientClasses[varient] + " "  + defaultStyles}>
            <div className="pr-2">
                {startIcon}
            </div>
                {text}
    </button>
}