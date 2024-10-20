import {createBrowserRouter} from "react-router-dom";
import LayoutIndex from "../pages/layout/LayoutIndex.tsx";
import Home from "../pages/Home/Home.tsx";
import GroupList from "../pages/GroupBuy/GroupList";
import Preferred from "../pages/GroupBuy/Preferred";
import GroupManage from "../pages/GroupBuy/GroupManage";
import ProductList from "../pages/Product/ProductList";
import ProductManage from "../pages/Product/ProductManage";
import GoodsManage from "../pages/Goods/GoodsManage";
import ServeList from "../pages/Serve/ServeList";
import ServeManage from "../pages/Serve/ServeManage";
import SiteList from "../pages/Site/SiteList";
import GoodsAfterSale from "../pages/AfterSale/GoodsAfterSale";
import ProductAfterSale from "../pages/AfterSale/ProductAfterSale";
import PreferredAfterSale from "../pages/AfterSale/PreferredAfterSale";
import ServeAfterSale from "../pages/AfterSale/ServeAfterSale";


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
            {
                path: '/serve',
                children: [
                    {
                        path: '/serve/list',
                        element: <ServeList/>
                    },
                    {
                        path: '/serve/manage',
                        element: <ServeManage/>
                    }
                ]
            },
            {
                path: '/site',
                children: [
                    {
                        path: '/site/list',
                        element: <SiteList/>
                    }
                ]
            },
            {
                path: '/after-sale',
                children: [
                    {
                        path: '/after-sale/goods',
                        element: <GoodsAfterSale/>
                    },
                    {
                        path: '/after-sale/product',
                        element: <ProductAfterSale/>
                    },
                    {
                        path: '/after-sale/preferred',
                        element: <PreferredAfterSale/>
                    },
                    {
                        path: '/after-sale/serve',
                        element: <ServeAfterSale/>
                    }
                ]
            }
        ]
    },
]);
export default routes