import "./Header.css"
import {icon} from "../img/index";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useAuth, useProducts } from "..";
import AdminPanel from "./AdminPanel";



export default function Header(){
    const { setSearchWord } = useContext(useProducts)
    const { adminLogin } = useContext(useAuth)
 
    const searchHandler = e => setSearchWord(e.target.value)

    return <div className="header">
        <NavLink to="/"><img src={icon} height="40" width="40" alt="gungun-logo"/></NavLink>
        <input type="search" placeholder="Search" onChange={searchHandler}/>
        <div className="nav-links-main">
        <NavLink to="/cart" className="nav-links">Cart</NavLink>
        {adminLogin ? <AdminPanel/> :<NavLink to="/login" className="nav-links">Admin Panel</NavLink>}
        </div>
    </div>
}