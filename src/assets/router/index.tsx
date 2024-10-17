import {createBrowserRouter} from "react-router-dom";
import LayoutIndex from "../pages/layout/LayoutIndex.tsx";
import Home from "../pages/home/Home.tsx";



const routes = createBrowserRouter([
    {
        path: '/',
        element: <LayoutIndex/>,
        children: [
            {
                path: '/',
                element: <Home/>
            }
        ]
    },
]);
export default routes