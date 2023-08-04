import { useContext } from "react";
import "./Cartcard.css";
import { useCart } from "../Context/CartProvider";

export default function CartCard({
  _id,
  name,
  category,
  image1,
  description1,
  description2,
  manufactureYear,
  price,
  edition,
  qty,
  numberOfPages,
  language,
}) {
  const { clicked, decreaseQty } = useContext(useCart);

  const setCart = () => {
    const props = {
      _id,
      name,
      category,
      image1,
      description1,
      description2,
      manufactureYear,
      price,
      edition,
      numberOfPages,
      language,
    };
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const items = cart?.find((item) => item._id === _id);
    if (items) {
      items.qty += 1;
      localStorage.setItem("cart", JSON.stringify([...cart]));
    } else {
      localStorage.setItem(
        "cart",
        JSON.stringify([...cart, { ...props, qty: 1 }])
      );
    }
  };

  const convertString = (str, num) => {
    return str
      .split("")
      .filter((char, index) => index <= num)
      .join("")
      .concat("...");
  };

  return (
    <div className="cart-card" key={_id}>
      <img
        src={image1}
        alt="..."
        width="200px"
        height="223.83"
        className="cart-main-img"
      />
      <div className="cart-card1">
        <div className="cart-card-part1">
          <h2>{convertString(name, 36)}</h2>
          <p>₹{price}</p>
        </div>
        <div className="cart-card-part2">
          <p style={{ color: "#666" }}>{category}</p>
        </div>
        <div className="cart-card-part3">
          <button
            onClick={() => {
              setCart();
              clicked();
            }}
          >
            +
          </button>
          <p>{qty ?? 1}</p>
          <button
            // disabled={quantityCheck}
            // onClick={() => decrementCartHandler({ type: "decrementCart", id: id }, cartDispatch)}
            onClick={() => {
              decreaseQty(_id);
              clicked();
            }}
          >
            -
          </button>
        </div>
      </div>
      <div className="cart-card-part4">
        <button
          onClick={() => {
            clicked();
            let cart = JSON.parse(localStorage.getItem("cart")) ?? [];
            cart = cart.filter((item) => item._id !== _id);
            if (cart.length > 0) {
              localStorage.setItem("cart", JSON.stringify(cart));
            } else {
              localStorage.removeItem("cart");
            }
          }}
        >
          <img
            width="20"
            height="20"
            src="https://img.icons8.com/ios-filled/100/delete-sign--v1.png"
            alt="delete-sign--v1"
          />
        </button>
        {/* <button>
          {wishButton}
        </button> */}
      </div>
    </div>
  );
}
