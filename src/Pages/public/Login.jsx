import { useContext } from "react";
import { signin } from "../../img"
import "./Login.css";
import { useAuth } from "../..";

export default function LoginPage(){
    const { loginHandler, setForm, loginForm } = useContext(useAuth);

    const eventHandler = (value, type) => {
        loginForm[type] = value;
        setForm(loginForm);
        console.log(loginForm);
    }

    return <div className="login-form">
        <div className="login-sec-1">
            <img src={signin} alt="signin" />
        </div>
        <div className="login-sec-2">
        <h1>Admin Login Form</h1>
            <label htmlFor="login-number">
                <input type="number" name="login-number" id="login-number" placeholder="Admin phone number" onChange={(e)=> eventHandler(e.target.value,"adminNumber")}/>
            </label>
            <label htmlFor="login-password">
                <input type="password" name="login-password" id="login-password" placeholder="password" onChange={(e)=> eventHandler(e.target.value,"adminPassword")}/>
            </label>
            <button onClick={loginHandler}>Login</button>
        </div>
        <div className="login-sec-3"></div>
    </div>
}