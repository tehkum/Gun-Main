import "./Header.css";
import { icon } from "../img/index";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useAuth, useCart, useProducts } from "..";
import AdminPanel from "./AdminPanel";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import YouTubeIcon from "@mui/icons-material/YouTube";
// import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import HomeIcon from "@mui/icons-material/Home";
import SourceIcon from "@mui/icons-material/Source";

export default function Header() {
  const { setSearchWord } = useContext(useProducts);
  const { adminLogin } = useContext(useAuth);
  const { clicked } = useContext(useCart);
  const [cartLen, setCartLen] = useState(
    JSON.parse(localStorage.getItem("cart"))?.length ?? 0
  );

  // const cartItems = JSON.parse(localStorage.getItem("cart"))?.length ?? 0;
  // console.log(JSON.parse(localStorage.getItem("cart"))?.length)

  useEffect(() => {
    setCartLen(JSON.parse(localStorage.getItem("cart"))?.length ?? 0);
  }, [clicked]);

  const searchHandler = (e) => setSearchWord(e.target.value);

  return (
    <div className="header">
      <NavLink
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          textDecoration: "none",
          color: "white",
          gap: "10px",
        }}
      >
        <img
          src={icon}
          height="40"
          width="40"
          alt="gungun-logo"
          style={{ borderRadius: "40px" }}
        />{" "}
        GUNGUN BOTIQUE
      </NavLink>
      <input type="search" placeholder="Search" onChange={searchHandler} />
      <div className="nav-links-main">
        <NavLink to="/" className="nav-links nav-links-home">
          <HomeIcon /> <span>Home</span>
        </NavLink>
        <NavLink to="/cart" className="nav-links">
          <ShoppingBagIcon /> <span>Cart ({cartLen})</span>
        </NavLink>
        <NavLink to="/all-blogs" className="nav-links">
          <SourceIcon /> <span>Blogs</span>
        </NavLink>
        <a
          href="https://www.youtube.com/@Gungunsewingclasses"
          className="nav-links"
          style={{ color: "red", fontSize: "20px", backgroundColor: "white" }}
        >
          <YouTubeIcon />
        </a>
        {adminLogin ? (
          <AdminPanel />
        ) : (
          // <NavLink to="/login" className="nav-links">
          //   <AdminPanelSettingsIcon /> <span>Admin Panel</span>
          // </NavLink>
          <></>
        )}
      </div>
    </div>
  );
}
