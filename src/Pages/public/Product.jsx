import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./Product.css";
import { useCart, useProducts } from "../..";
import axios from "axios";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function ProductPage() {
  const { productId } = useParams();
  const [specificProduct, setProduct] = useState({});
  const { clicked } = useContext(useCart);
  const { productData } = useContext(useProducts);
  const [reviewData, setReviewData] = useState([]);
  const [imgSelect, setImgSelect] = useState("");

  const [review, setReview] = useState({
    name: "",
    comment: "",
    productId: productId,
  });
  const navigate = useNavigate();

  const reviewHandler = (e) => {
    const { name, value } = e.target;
    setReview((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(review);
  };

  useEffect(() => {
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  }, []);

  const getReviews = async () => {
    const res = await axios.get("https://teal-vast-blackbuck.cyclic.app/api/");
    setReviewData(
      res?.data?.review.filter((item) => item.productId === productId)
    );
  };

  useEffect(() => {
    setProduct(productData.find(({ _id }) => _id == productId));
    setReview({ ...review, productId: productId });
    getReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const {
    _id,
    name,
    category,
    image1,
    image2,
    image3,
    image4,
    description1,
    description2,
    manufactureYear,
    price,
    edition,
    numberOfPages,
    language,
  } = specificProduct;

  const setCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const items = cart?.find((item) => item._id === _id);
    if (items) {
      // items.qty =
      //   (cart?.find((item) => item._id === _id)?.qty ?? 1) + 1;
      items.qty += 1;
      localStorage.setItem("cart", JSON.stringify([...cart]));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...specificProduct, qty: 1 }])
      );
    }
  };

  const addReviewHandler = async () => {
    const res = await fetch(
      `https://teal-vast-blackbuck.cyclic.app/api/products/review`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...review }),
      }
    );
    console.log(await res.json());

    // await axios.post(`https://localhost:3000/api/products/${_id}/review`,review,{
    //   "Content-Type": "application/json",
    // }).then((response) => console.log(response)).catch(e=>console.log(e))
  };

  // const sendMessageHandler = () => {
  //   window.open(
  //     "https://wa.me/8770840787?text=I'm%20interested%20in%20your%20car%20for%20sale",
  //     "_blank"
  //   );
  // };

  return (
    <>
      <div className="container-product">
        {/* <div className="card-right">
          <img src={image1} alt="..." />
          {image2 && <img src={image2} alt="..." />}
          {image3 && <img src={image3} alt="..." />}
          {image4 && <img src={image4} alt="..." />}
        </div> */}
        <div className="card-right">
          {imgSelect ? (
            <img src={imgSelect} alt="..." className="img-main" />
          ) : (
            <img src={image1} className="img-main" alt="..." />
          )}
          <div className="image-selector">
            <img src={image1} alt="..." onClick={() => setImgSelect(image1)} />
            {image2 && (
              <img
                src={image2}
                alt="..."
                onClick={() => setImgSelect(image2)}
              />
            )}
            {image3 && (
              <img
                src={image3}
                alt="..."
                onClick={() => setImgSelect(image3)}
              />
            )}
            {image4 && (
              <img
                src={image4}
                alt="..."
                onClick={() => setImgSelect(image4)}
              />
            )}
          </div>
        </div>
        <div className="card-left">
          <p className="product-type">{category}</p>
          <h1 className="product-title">{name}</h1>
          <p className="product-price-desc">
            <b>MRP in Indian currency:</b>
          </p>
          <h2 className="product-price">{price}₹</h2>
          <p className="product-tax">[Inclusive of all taxes]</p>
          <p className="product-desc">{description1}</p>
          <p className="product-desc">{description2}</p>
          <p className="product-desc">
            <b>Manufacture Year: </b>
            {manufactureYear}
          </p>
          <p className="product-desc">
            <b>Edition: </b>
            {edition}
          </p>
          <p className="product-desc">
            <b>Number of pages: </b>
            {numberOfPages}
          </p>
          <p className="product-desc">
            <b>Language: </b>
            {language}
          </p>
          <div className="btn-grp">
            <button
              className="wapp-btn"
              onClick={() =>
                window.open(
                  `https://wa.me/918770840787?text=I'm%20interested%20in%20this%20product%20/product/${_id}`,
                  "_blank"
                )
              }
            >
              <WhatsAppIcon />
            </button>
            <button
              className="cart-btn"
              onClick={() => {
                setCart();
                clicked();
              }}
            >
              Add to cart
            </button>
            <button
              className="wishlist-btn"
              onClick={() => {
                setCart();
                clicked();
                navigate("/cart");
              }}
            >
              Order now
            </button>
          </div>
        </div>
      </div>
      <h2>Reviews</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Write a review"
          onChange={reviewHandler}
          name="comment"
          className="review-input"
        />
        <input
          type="text"
          placeholder="Your name"
          onChange={reviewHandler}
          name="name"
          className="review-input"
        />
        <button onClick={addReviewHandler} className="review-btn">
          Add Review
        </button>
      </div>
      <div>
        {reviewData?.map((item) => (
          <div key={item._id} className="review-box">
            <p style={{ margin: "0" }}>
              <strong>Name:</strong> {item.name}
            </p>
            <p style={{ margin: "0" }}>
              <strong>Remark:</strong> {item.comment}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
