import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const useCart = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [isClicked, setClicked] = useState(false);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem("cart")) || []);
  }, [isClicked]);

  const clicked = () => {
    setClicked(!isClicked);
  };

  // const decreaseQty = (prodId) => {
  //   const cartList = JSON.parse(localStorage.getItem("cart")) || [];
  //   if(cartList.find(item=> item._id === prodId)?.qty > 1) {
  //     cartList.find(item=> item._id === prodId).qty -= 1;
  //     localStorage.setItem("cart", JSON.stringify(cartList));
  //   } else {
  //     cartList.filter(item=> item._id !== prodId)
  //     localStorage.setItem("cart", JSON.stringify(cartList));
  //   }
  // }

  const decreaseQty = (prodId) => {
    const cartList = JSON.parse(localStorage.getItem("cart")) ?? [];
    const product = cartList.find((item) => item._id === prodId);
    if (product?.qty > 1) {
      product.qty -= 1;
    } else {
      const index = cartList.indexOf(product);
      cartList.splice(index, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cartList));
  };

  return (
    <useCart.Provider
      value={{
        cart,
        clicked,
        decreaseQty,
      }}
    >
      {children}
    </useCart.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node,
};
