import type { ReactElement } from "react"

export function SideBarItems( {text , icon} : {
    text : string,
    icon : ReactElement
}){
    return (
        <div className="flex pl-5 pt-5 cursor-pointer hover:bg-gray-300 rounded-2xl" >
            <div className="pr-5 pb-7 ">
              {icon} 
            </div>
            <div className="pr-5 pb-7">
              {text} 
            </div> 
        </div>
    )
}