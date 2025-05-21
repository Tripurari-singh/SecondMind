import { DeleteIcon } from "../Icons/deleteicon";
import { LinkdinIcon } from "../Icons/LinkdinIcon";
import { ShareIcon } from "../Icons/shareicon";
import { YouTubeIcon } from "../Icons/youtubeicon";



interface CardProps {
  title: string;
  link: string;
  type: "youtube" | "Linkdin";
}

export function Card({ title, link, type }: CardProps) {
  let embedLink = link;

  // Only modify YouTube links
  if (type === "youtube") {
    if (link.includes("youtu.be")) {
      embedLink = link.replace("youtu.be/", "www.youtube.com/embed/");
    } else if (link.includes("watch?v=")) {
      embedLink = link.replace("watch?v=", "embed/");
    }
  }

  return (
    <div>
      <div className="p-8 max-w-96 bg-white rounded-lg shadow-lg outline outline-slate-200 m-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center justify-center">
            <div className="pr-2">
              {type === "youtube" && <YouTubeIcon/>}
              {type === "Linkdin" && <LinkdinIcon/>}
            </div>
            {title}
          </div>
          <div className="flex">
            <div className="pr-2">
              <a href={link} target="_blank" rel="noopener noreferrer">
                <ShareIcon />
              </a>
            </div>
            <div className="pr-2">
              <DeleteIcon />
            </div>
          </div>
        </div>

        {/* Embedded Media */}
        <div className="w-full pt-10">
          {type === "youtube" && (
            <iframe
              className="w-full rounded-2xl border-1 shadow-2xl"
              src={embedLink}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          )}
          {type === "Linkdin" && (
            <iframe
              className="w-full rounded-2xl shadow-2xl"
              src={link}
              title="LinkedIn post"
              width="100%"
              
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}
