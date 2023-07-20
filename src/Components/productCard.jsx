import { Link } from "react-router-dom";
import "./Productcard.css";

export default function Productcard(props) {
  // eslint-disable-next-line react/prop-types
  const { _id, name, image1, category, price } = props;

  const setCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const items = cart?.find((item) => item._id === _id)
    if (items) {
      // items.qty =
      //   (cart?.find((item) => item._id === _id)?.qty ?? 1) + 1;
      items.qty +=1
      localStorage.setItem("cart", JSON.stringify([...cart]));
    } else {
      localStorage.setItem("cart", JSON.stringify([...cart, {...props, qty:1}]));
    }
  };

  return (
    <div className="q7Card">
      <img src={image1} alt="..." />

      <Link
        to={`/product/${_id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <div className="q7Cont">
          <div>
            <h3>{name}</h3>
            <p>{category}</p>
          </div>
          <p>₹ {price}</p>
        </div>
      </Link>
      <button className="q7-view-btn">View Product</button>
      <button className="q7-btn" onClick={setCart}>
        Add to cart
      </button>
    </div>
  );
}
