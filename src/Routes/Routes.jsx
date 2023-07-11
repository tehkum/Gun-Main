import { Route, Routes } from "react-router";
import HomePage from "../Pages/public/HomePage";
import CartPage from "../Pages/public/Cart";
import ConfirmPage from "../Pages/public/ConfirmOrder";
import LoginPage from "../Pages/public/Login";
import CheckoutPage from "../Pages/public/Checkout";
import ProductPage from "../Pages/public/Product";
import AddressPage from "../Pages/public/Address";
import AllOrders from "../Pages/private/AllOrders";
import AllProducts from "../Pages/private/AllProducts";
import AllVideos from "../Pages/private/AllVideo";
import OrderManage from "../Pages/private/OrderManage";
import ProductManage from "../Pages/private/ProductManage";
import YoutubeManage from "../Pages/private/YoutubeManage";

export default function AllRoutes(){
    return <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/cart" element={<CartPage/>}/>
        <Route path="/confirm" element={<ConfirmPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/checkout" element={<CheckoutPage/>}/>
        <Route path="/product/:productId" element={<ProductPage/>}/>
        <Route path="/Address" element={<AddressPage/>}/>
        <Route path="/all-orders" element={<AllOrders/>} />
        <Route path="/all-products/:id" element={<AllProducts/>} />
        <Route path="/all-videos" element={<AllVideos/>} />
        <Route path="/order-management" element={<OrderManage/>} />
        <Route path="/product-management" element={<ProductManage/>} />
        <Route path="/video-management" element={<YoutubeManage/>} />
        
    </Routes>
}