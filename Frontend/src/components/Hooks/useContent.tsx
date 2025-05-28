import { useEffect, useState } from "react";
import { BACKEND_URL } from "../../config";
import axios from "axios";

export function UseContent(){
    const [contents , setContents] = useState([]);

    

    useEffect(() => {
         axios.get(BACKEND_URL + "/api/v1/content" , {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        )
        .then((response) => {
            setContents(response.data.content)
        }).catch((error) =>{
            console.log("Error fetching Content" , error)
        })
       
    } , [])

    return {contents};
}



// import { useEffect, useState } from "react";
// import { BACKEND_URL } from "../../config";
// import axios from "axios";

// export function UseContent() {
//     const [contents, setContents] = useState([]);

//     function refresh() {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             console.warn("No token found in localStorage");
//             return;
//         }

//         axios.get(`${BACKEND_URL}/api/v1/content`, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         })
//         .then((response) => {
//             setContents(response.data.content);
//         })
//         .catch((error) => {
//             console.error("Error fetching content:", error.response?.data || error.message);
//         });
//     }

//     useEffect(() => {
//         refresh();

//         const interval = setInterval(() => {
//             refresh();
//         }, 10 * 1000);

//         return () => clearInterval(interval); // ✅ cleanup
//     }, []);

//     return { contents, refresh };
// }
