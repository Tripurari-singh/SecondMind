import { Button2 } from "./createContentModel";
import { Input } from "./Input";

export function Signup(){
    return ( 
         <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-slate-500/60">
                  <div className="flex flex-col justify-center">
                    <div className="bg-purple-100 p-30 rounded-2xl">
                      <div className="">
                        <Input placeholder="Username" />
                        <Input placeholder="Password" />
                           <div className="m-4 flex justify-center">
                             <Button2 varient="primary" text="Signup" loading={false}/>
                           </div>
                      </div>
                    </div>
                </div>
         </div>
    )
}