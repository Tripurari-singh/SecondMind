import { LinkdinIcon } from "../Icons/LinkdinIcon";
import { LogoIcon } from "../Icons/LogoIcon";
import { YouTubeIcon } from "../Icons/youtubeicon";
import { SideBarItems } from "./sidebarItems";

export function SideBar(){
    return <div className="h-screen bg-white  shadow-2xl rounded-2xl w-76 fixed left-0 top-0">
        <div className="flex p-3 ">
            <div className="pr-4">
                <LogoIcon/>
            </div>
            <div className="text-purple-600 text-xl">
                SecondMind
            </div>
        </div>
         <div className="pt-4 pl-3">
            <SideBarItems text="Linkdin" icon={<LinkdinIcon />}  />
            <SideBarItems text="YouTube" icon={<YouTubeIcon/>}  />        
         </div>
    </div>
}