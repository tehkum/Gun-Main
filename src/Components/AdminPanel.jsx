import { NavLink } from "react-router-dom";
import "./Adminpanel.css";

export default function AdminPanel() {
  return <div className="Admin-panel-box">{[
    { name: "Product Management", link: "/admin/product-management" },
    { name: "Order Management", link: "/admin/order-management" },
    { name: "Video Management", link: "/admin/video-management" },
  ].map(({ name, link }) => (
    <div key={name}>
      <NavLink to={link}>{name}</NavLink>
      <hr />
    </div>
  ))}</div>
}
