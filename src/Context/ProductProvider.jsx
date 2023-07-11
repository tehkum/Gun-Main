import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = createContext();

export function ProductProvider({ children }) {
  const [ productData, setProductData ] = useState([])
  const [ isClicked, setClicked ] = useState(false);
  const [searchWord, setSearchWord ] = useState("");

  const fetchData = async () => {
    const res = await fetch("https://fair-jade-bream-suit.cyclic.app/api/admin/products",{method: 'GET'});
    const product = await res.json();
    setProductData(product.products);  
  };  
  
  const clicked = () => {
    setClicked(!isClicked);
  }
  

  useEffect(() => {   
    fetchData();
  }, [isClicked]);

  
  
  return (
    <useProducts.Provider
      value={{
        productData,
        setProductData,
        clicked,
        searchWord, setSearchWord
      }}
    >
      {children}
    </useProducts.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node,
};
