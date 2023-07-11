import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import "./Product.css";
import { useProducts } from "../../main";
import axios from "axios";

export default function ProductPage() {
  const { productId } = useParams();
  const [specificProduct, setProduct] = useState({});
  const { productData } = useContext(useProducts);
  const [reviewData, setReviewData] = useState([]);
  const [review, setReview] = useState({
    name: "",
    comment: "",
    productId: productId,
  });

  const reviewHandler = e => {
    const { name, value } = e.target;
    setReview((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(review);
  }

 

  useEffect(()=>{
    window.scrollTo({
      top: 100,
      left: 100,
      behavior: "smooth",
    });
  },[])

  const getReviews = async () => {
    const res = await axios.get("https://teal-vast-blackbuck.cyclic.app//api/")
    setReviewData(res?.data?.review.filter(item=>item.productId === productId))
  }

  useEffect(()=>{
    setProduct( productData.find(({_id})=> _id == productId));
    setReview({...review, productId: productId});
    getReviews();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[productId])


const { _id, name, category, image1, image2, image3, image4, description1, description2, manufactureYear, price, edition, numberOfPages, language } = specificProduct;

const addReviewHandler = async () => {
  
  const res = await fetch(`https://teal-vast-blackbuck.cyclic.app//api/products/review`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ...review })
  })
  console.log(await res.json())

  // await axios.post(`https://localhost:3000/api/products/${_id}/review`,review,{
  //   "Content-Type": "application/json",
  // }).then((response) => console.log(response)).catch(e=>console.log(e))
}

  return <>
    <div className="container-product">
      <div className="card-right">
        <img src={image1} alt="..."/>
        {image1 && <img src={image2} alt="..."/>}
        <img src={image3} alt="..."/>
        <img src={image4} alt="..."/>
      </div>
      <div className="card-left">
        <p className="product-type">{category}</p>
        <h1 className="product-title">{name}</h1>
        <p className="product-price-desc"><b>MRP in Indian currency:</b></p>
        <p className="product-price">{price} per pair</p>
        <p className="product-tax">[Inclusive of all taxes]</p>
        <p className="product-desc">{description1}</p>
        <p className="product-desc">{description2}</p>
        <p className="product-desc"><b>Manufacture Year: </b>{manufactureYear}</p>
        <p className="product-desc"><b>Edition: </b>{edition}</p>
        <p className="product-desc"><b>Number of pages: </b>{numberOfPages}</p>
        <p className="product-desc"><b>Language: </b>{language}</p>

        <button className="cart-btn" >Add to cart</button>
        <button className="wishlist-btn">Order now</button>      
      </div>
    </div>
    <h2>Reviews</h2>
    <form style={{display: 'flex', flexWrap: "wrap", justifyContent: "center", gap: "10px"}}>
    <input type="text" placeholder="Write a review" onChange={reviewHandler} name="comment" className="review-input"/>
    <input type="text" placeholder="Your name" onChange={reviewHandler} name="name" className="review-input"/>
    <button onClick={addReviewHandler} className="review-btn">Add Review</button></form>
    <div>{reviewData?.map(item=><div key={item._id} className="review-box">
      <p style={{margin: "0"}}><strong>Name:</strong> {item.name}</p>
      <p style={{margin: "0"}}><strong>Remark:</strong> {item.comment}</p>
    </div>)}</div>

  </>;
}
