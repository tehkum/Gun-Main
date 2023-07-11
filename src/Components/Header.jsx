import "./Header.css"
import {icon} from "../img/index";
import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { useProducts } from "../main";



export default function Header(){
    const { setSearchWord } = useContext(useProducts)

    const searchHandler = e => setSearchWord(e.target.value)

    return <div className="header">
        <NavLink to="/"><img src={icon} height="40" width="40" alt="gungun-logo"/></NavLink>
        <input type="search" placeholder="Search" onChange={searchHandler}/>
        <div className="nav-links-main">
        <NavLink to="/cart" className="nav-links">Cart</NavLink>
        <NavLink to="/login" className="nav-links">Admin Panel</NavLink>
        </div>
    </div>
}