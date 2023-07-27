import "./Header.css"
import {icon} from "../img/index";
import { NavLink } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { useAuth, useCart, useProducts } from "..";
import AdminPanel from "./AdminPanel";



export default function Header(){
    const { setSearchWord } = useContext(useProducts)
    const { adminLogin } = useContext(useAuth)
    const { clicked } = useContext(useCart);
    const [ cartLen, setCartLen ] = useState(JSON.parse(localStorage.getItem("cart"))?.length ?? 0) 

    // const cartItems = JSON.parse(localStorage.getItem("cart"))?.length ?? 0;
    // console.log(JSON.parse(localStorage.getItem("cart"))?.length)

    useEffect(()=>{
        setCartLen(JSON.parse(localStorage.getItem("cart"))?.length ?? 0)
    },[clicked])
 
    const searchHandler = e => setSearchWord(e.target.value)

    return <div className="header">
        <NavLink to="/"><img src={icon} height="40" width="40" alt="gungun-logo"/></NavLink>
        <input type="search" placeholder="Search" onChange={searchHandler}/>
        <div className="nav-links-main">
        <NavLink to="/cart" className="nav-links">Cart ({cartLen})</NavLink>
        {adminLogin ? <AdminPanel/> :<NavLink to="/login" className="nav-links">Admin Panel</NavLink>}
        </div>
    </div>
}