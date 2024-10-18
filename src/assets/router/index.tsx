import {createBrowserRouter} from "react-router-dom";
import LayoutIndex from "../pages/layout/LayoutIndex.tsx";
import Home from "../pages/Home/Home.tsx";
import GroupList from "../pages/GroupBuy/GroupList";
import Preferred from "../pages/GroupBuy/Preferred";
import GroupManage from "../pages/GroupBuy/GroupManage";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <LayoutIndex/>,
        children: [
            {index: true, element: <Home/>},
            {

                path: '/home',
                element: <Home/>
            },
            {
                path: '/groupbuy',
                children: [
                    {
                        path: '/groupbuy/list',
                        element: <GroupList/>
                    },
                    {
                        path: '/groupbuy/preferred',
                        element: <Preferred/>
                    },
                    {
                        path: '/groupbuy/manage',
                        element: <GroupManage/>
                    }
                ]
            },
        ]
    },
]);
export default routes