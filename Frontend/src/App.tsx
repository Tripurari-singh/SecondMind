import { DashBoard } from "./components/pages/DashBoard";
import { Signin } from "./components/pages/signin";
import { BrowserRouter , Routes , Route } from "react-router-dom";
import { Signup } from "./components/pages/signup";


function App(){
  return <BrowserRouter>
            <Routes>
              <Route path="/Signin" element={<Signin/>} ></Route>
              <Route path="/Signup" element={<Signup/>} ></Route>
              <Route path="/DashBoard" element={<DashBoard/>} ></Route>
            </Routes>
         </BrowserRouter>
}
export default App;  


