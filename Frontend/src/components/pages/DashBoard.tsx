import { useState } from "react";
import { Button } from "./Button";
import { CreateContentModel } from "./createContentModel";
import { SideBar } from "./sidebar";
import { PlusIcon } from "../Icons/Plusicon";
import { ShareIcon } from "../Icons/shareicon";
import { Card } from "./card";
import { UseContent } from "../Hooks/useContent";


 export function DashBoard() {
  const [modelOpen, setModelOpen] = useState(false);

  const { contents} = UseContent();

  return (
    <div>
      <SideBar />
      <div className="p-4 bg-gray-100 ml-72 min-h-screen">
        <CreateContentModel
          open={modelOpen} 
          onclose={() => setModelOpen(false)}
        />
        
        {/* Buttons */}
        <div className="flex justify-end gap-4 mb-4">
          <Button 
            onClick={() => setModelOpen(true)} 
            varient="primary" 
            text="Add Content" 
            startIcon={<PlusIcon />} 
          />
          <Button 
            varient="secondary" 
            text="Share Brain" 
            startIcon={<ShareIcon />} 
          />
        </div>
        <div>
          <Card
        type="youtube"
        title="Motivation Video"
        link="https://youtu.be/2ONZxnKkPPE?si=QES0wq0DDGX4-9kp"
        />
        </div>
        



      </div>
    </div>
  );
}


