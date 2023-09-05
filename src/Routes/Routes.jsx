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
import YoutubeVids from "../Pages/public/Youtubevideos";
import CouponManage from "../Pages/private/CouponManage";
import { useContext } from "react";
import { useAuth } from "../Context/AuthProvider";
import AddBlog from "../Pages/private/AddBlock";
import BlogPage from "../Pages/public/Blog";
import BlogVIew from "../Pages/public/BlogView";
import EditBlog from "../Pages/private/EditBlog";

export default function AllRoutes() {
  const { adminLogin } = useContext(useAuth);

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/confirm" element={<ConfirmPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/product/:productId" element={<ProductPage />} />
        <Route path="/Address" element={<AddressPage />} />
        <Route path="/youtube-vids" element={<YoutubeVids />} />
        <Route path="/blogs/:blogId" element={<BlogPage />} />
        <Route path="/all-blogs" element={<BlogVIew />} />
        {/* ******************************************************** */}
        {adminLogin ? (
          <>
            <Route path="/admin/order/:orderId" element={<AllOrders />} />
            <Route path="/admin/all-products/:id" element={<AllProducts />} />
            <Route path="/admin/all-videos" element={<AllVideos />} />
            <Route path="/admin/order-management" element={<OrderManage />} />
            <Route path="/admin/blog" element={<AddBlog />} />
            <Route
              path="/admin/product-management"
              element={<ProductManage />}
            />
            <Route path="/admin/video-management" element={<YoutubeManage />} />
            <Route path="/admin/coupon-management" element={<CouponManage />} />
            <Route path="/admin/edit-blog/:blogId" element={<EditBlog />} />
          </>
        ) : (
          <Route path="*" element={<HomePage />} />
        )}
      </Routes>
    </>
  );
}
