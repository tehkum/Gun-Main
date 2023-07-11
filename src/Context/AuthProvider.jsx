import { createContext, useState } from "react";
import PropTypes from "prop-types";

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = createContext();

export function AuthProvider({ children }) {
  const [adminLogin, setAdmin] = useState(false);
  const [ loginForm, setForm ] = useState({
    adminNumber: "", adminPassword: ""
  });


  const loginHandler = () => {
    if(loginForm.adminNumber === "9893074902" && loginForm.adminPassword === "dhirendra") {
        setAdmin(true)
    }
    console.log(adminLogin)
  }

  return (
    <useAuth.Provider
      value={{
        setForm,
        loginForm,
        loginHandler,
        adminLogin
      }}
    >
      {children}
    </useAuth.Provider>
  );
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};
