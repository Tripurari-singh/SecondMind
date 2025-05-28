import { useRef, useState } from "react";
import { CrossIcon } from "../Icons/crossicon";
import { Input } from "./Input";
import { BACKEND_URL } from "../../config";
import axios from "axios";
import { Button } from "./Button";

interface Button2Props {
  text: string;
  onClick?: () => void;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  varient?: 'primary' | 'secondary';
  loading? : Boolean;
}

interface CreateContentModelProps {
  open: boolean;
  onclose: () => void;
}

// const ContentType = {
//   Youtube: "youtube",
//   Linkdin: "linkdin"
// } as const;

// type ContentType = typeof ContentType[keyof typeof ContentType];


export function CreateContentModel({ open, onclose }: CreateContentModelProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type , setType] = useState("youtube") 

  //  async function addcontent(){
  //   const title = titleRef.current?.value;
  //   const link = linkRef.current?.value;

  //   if (!title || !link) {
  //      alert("Both fields are required.");
  //      return;
  //   }


  //    await axios.post(BACKEND_URL + "/api/v1/content" , {
  //     link : link,
  //     title : title,
  //     type : type
  //    } , {
  //     headers : {
  //       Authorization : `Bearer ${localStorage.getItem("token")}`
  //     }
  //    })
  //    alert("content added")

  // }

  async function addcontent() {
  const title = titleRef.current?.value;
  const link = linkRef.current?.value;

  if (!title || !link) {
    alert("Both Title and Link are required.");
    return;
  }

  // Validate the link as a proper URL
  try {
    new URL(link); // Will throw if invalid
  } catch (e) {
    alert("Please enter a valid URL.");
    return;
  }
  console.log(localStorage.getItem("token"));

  console.log({ title, link, type });


  try {
    await axios.post(BACKEND_URL + "/api/v1/content", {
      title : title,
      link : link,
      type : type
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });

    alert("Content added successfully!");
    onclose(); // optionally close modal on success
  } catch (err) {
    console.error("Error submitting content:", err);
    alert("Failed to submit content.");
  }
}

  return (
    <div>
      {open && (
        <div className="h-screen w-screen fixed top-0 left-0 flex justify-center items-center bg-slate-500/60">
          <div className="flex flex-col justify-center">
            <div className="bg-purple-100 p-30 rounded-2xl">
              <div onClick={onclose} className="flex justify-end cursor-pointer mb-5">
                <CrossIcon />
              </div>
              <div className="">
                      <div>
                         <Input reference={titleRef} placeholder="Title" />
                         <Input reference={linkRef} placeholder="Link" />
                      </div>
                      <div className="m-4 pb-2">
                        <h1> Type </h1>
                      </div>
                <div className="flex gap-4 p-4"> 
                  <Button text="Youtube" varient={type === "youtube" ? "primary" :"secondary"} onClick={() => {
                    setType("youtube")
                  }} ></Button> 
                  <Button  text="Linkdin" varient={type === "linkdin" ? "primary" :"secondary"} onClick={() => {
                    setType("linkdin")
                  }} ></Button>
                </div>
                <div className="m-4 flex justify-center">
                  <Button2 onClick={addcontent} varient="primary" text="Submit" />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


export function Button2({ text, onClick, className = '', type = 'button' , loading }: Button2Props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`w-full py-3 bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white font-semibold rounded-2xl 
       hover:scale-105 transition-transform ${ loading ? "opacity-45" : ""} duration-300 shadow-md ${className}`}
    >
      {text}
    </button>
  );
}



