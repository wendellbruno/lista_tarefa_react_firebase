import { Routes , Route} from "react-router-dom";
import Home from "../pages/Home/Index";
import Register from '../pages/Register/Index';
import Admin from "../pages/Admin/Index";
import Private from "./Private";

export default function RoutesApp(){
    return(
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Private> <Admin /> </Private>} />
        </Routes>
    )
}
