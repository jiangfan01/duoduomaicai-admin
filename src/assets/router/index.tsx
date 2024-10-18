import {createBrowserRouter} from "react-router-dom";
import LayoutIndex from "../pages/layout/LayoutIndex.tsx";
import Home from "../pages/Home/Home.tsx";
import GroupList from "../pages/GroupBuy/GroupList";
import Preferred from "../pages/GroupBuy/Preferred";
import GroupManage from "../pages/GroupBuy/GroupManage";
import ProductList from "../pages/Product/ProductList";
import ProductManage from "../pages/Product/ProductManage";
import GoodsManage from "../pages/Goods/GoodsManage";


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
                path: '/goods',
                children: [
                    {
                        path: '/goods/manage',
                        element: <GoodsManage/>
                    }
                ]
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
            {
                path: '/product',
                children: [
                    {
                        path: '/product/list',
                        element: <ProductList/>
                    },
                    {
                        path: '/product/manage',
                        element: <ProductManage/>
                    }
                ]
            },
        ]
    },
]);
export default routes