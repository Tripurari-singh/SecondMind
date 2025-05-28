import { useRef } from "react";
import { Button2 } from "./createContentModel";
import { Input } from "./Input";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Signup() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null); 
  const navigate = useNavigate();

  async function signup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
      });
      navigate("/Signin")
      alert("You have signed up!!");
    } catch (error) {
      console.error("Signup failed", error);
      alert("Signup failed. See console for details.");
    }
  }


  
    return ( 
         <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-slate-500/60">
                  <div className="flex flex-col justify-center">
                    <div className="bg-purple-100 p-30 rounded-2xl">
                      <div className="">
                        <Input reference = {usernameRef} placeholder="Username" />
                        <Input reference = {passwordRef} placeholder="Password" />
                           <div className="m-4 flex justify-center">
                             <Button2 onClick={signup} varient="primary" text="Signup" loading={false}/>
                           </div>
                      </div>
                    </div>
                </div>
         </div>
    )
}