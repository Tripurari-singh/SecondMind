import { CrossIcon } from "../Icons/crossicon";
import { Input } from "./Input";

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


export function CreateContentModel({ open, onclose }: CreateContentModelProps) {
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
                <Input placeholder="Title" />
                <Input placeholder="Link" />
                <div className="m-4 flex justify-center">
                  <Button2 varient="primary" text="Submit" />
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



