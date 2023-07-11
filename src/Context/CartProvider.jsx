import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = createContext();

export function CartProvider({ children }) {
  const [ cart, setCart ] = useState([])
  const [ isClicked, setClicked ] = useState(false);


  useEffect(() => {   
    setCart(JSON.parse(localStorage.getItem("cart")) || [])
  }, []);

  const clicked = () => {
    setClicked(!isClicked);
  }
  
  return (
    <useCart.Provider
      value={{
        cart,
        clicked
      }}
    >
      {children}
    </useCart.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node,
};
