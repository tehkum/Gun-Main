import { Link } from "react-router-dom";
import "./Productcard.css";

export default function Productcard(props) {
  
  // eslint-disable-next-line react/prop-types
  const { _id, name, image1, category, price } = props;

  const setCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    if(cart?.find(item => item._id===_id)){
      cart.find(item => item._id===_id).qty = (cart?.find(item => item._id===_id)?.qty ?? 1) + 1;
    } else {
    localStorage.setItem("cart", JSON.stringify([...cart, props]));}
  }

  return (
    <div className="q7Card">
      
        <img src={image1} alt="..." />

<Link to={`/product/${_id}`}><div className="q7Cont">
            <div><h3>{name}</h3>
            <p>{category}</p></div>
            <p>₹ {price}</p>
        </div></Link>
        <button onClick={setCart}>Add to cart</button>
    </div>
  );
}
