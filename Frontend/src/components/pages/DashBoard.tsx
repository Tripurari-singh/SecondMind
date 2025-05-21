import { useState } from "react";
import { Button } from "./Button";
import { CreateContentModel } from "./createContentModel";
import { SideBar } from "./sidebar";
import { PlusIcon } from "../Icons/Plusicon";
import { ShareIcon } from "../Icons/shareicon";
import { Card } from "./card";


 export function DashBoard() {
  const [modelOpen, setModelOpen] = useState(false);

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

        {/* Cards */}
        <div className="flex gap-4">
          <Card
            type="youtube"
            link="https://youtu.be/dW9ljF7q6wo"
            title="YouTube"
          />
          <Card
            type="Linkdin"
            link="https://www.linkedin.com/embed/feed/update/urn:li:ugcPost:123456789"
            title="LinkedIn Post"
          />
        </div>
      </div>
    </div>
  );
}


