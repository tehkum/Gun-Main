import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
// import axios from "axios";

// eslint-disable-next-line react-refresh/only-export-components
export const useProducts = createContext();

export function ProductProvider({ children }) {
  const [productData, setProductData] = useState([]);
  const [isClicked, setClicked] = useState(false);
  const [searchWord, setSearchWord] = useState("");
  const [youtubeVideos, setVideos] = useState([]);
  const [orderNo, setOrderNo] = useState([]);

  const fetchData = async () => {
    const res = await fetch(
      "https://teal-vast-blackbuck.cyclic.app/api/admin/products",
      { method: "GET" }
    );
    const product = await res.json();
    console.log(product);
    setProductData(product.products);
  };

  const fetchVids = async () => {
    const res = await fetch(
      "https://teal-vast-blackbuck.cyclic.app/api/admin/",
      { method: "GET" }
    );
    const vids = await res.json();
    setVideos(vids.youtube);
    setOrderNo(vids.orders);
  };

  const clickedP = () => {
    setClicked(!isClicked);
  };

  useEffect(() => {
    fetchData();
    fetchVids();
  }, [isClicked]);

  return (
    <useProducts.Provider
      value={{
        productData,
        setProductData,
        clickedP,
        orderNo,
        youtubeVideos,
        searchWord,
        setSearchWord,
      }}
    >
      {children}
    </useProducts.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.node,
};
