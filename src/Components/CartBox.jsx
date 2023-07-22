import { useContext } from "react";
import "./Cartcard.css";
import { useCart } from "../Context/CartProvider";

// export default function CartCard() {
//   return (
//     <div className="productcard">
//       <div className="product-card-img">
//         <img src="https://picsum.photos/200/300" alt=".." />
//         <p>Product Price</p>
//       </div>
//       <div className="product-card-desc">
//       <h2>Product Name</h2>
//       <p className="product-cat">Product Category</p>
//       <p>Product size</p>
//       </div>
//       <p>QTY : 1</p>
//     </div>
//   );
// }

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
  numberOfPages,
  language,
}) {
  const { clicked } = useContext(useCart); 

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
          <h2>{name}</h2>
          <p>₹{price}</p>
        </div>
        <div className="cart-card-part2">
          <p>{description1}</p>
          <p>{description2}</p>
        </div>
        <div className="cart-card-part3">
          {/* <button
          onClick={() => incrementCartHandler({ type: "incrementCart", id: id }, cartDispatch)}
          >+</button> */}
          {/* <p>{qty ?? 1}</p> */}
          {/* <button
          disabled={quantityCheck}
          onClick={() => decrementCartHandler({ type: "decrementCart", id: id }, cartDispatch)}
          >-</button> */}
        </div>
      </div>
      <div className="cart-card-part4">
        <button
          onClick={() => {
            clicked();
            const cart = JSON.parse(localStorage.getItem("cart")) || [];
            if (cart.length > 1) {
              cart?.filter((item) => item._id === _id);
              localStorage.setItem("cart", JSON.stringify([...cart]));
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
