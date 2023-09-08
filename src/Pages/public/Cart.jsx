import { useContext } from "react";
import "./Cartpage.css";
import CartCard from "../../Components/CartBox";
import { useCart } from "../..";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useEffect } from "react";

export default function CartPage() {
  const { cart } = useContext(useCart);
  const [couponCode, setCoupon] = useState("");
  const navigate = useNavigate();
  const [couponCodes, setCoupons] = useState([]);
  const [discountPrice, setDiscPrice] = useState(0);

  let totalPrice = cart.reduce(
    (acc, { price, qty = 1 }) => (+acc + +price) * qty,
    0
  );

  const convertString = (str, num) => {
    return str
      .split("")
      .filter((char, index) => index <= num)
      .join("")
      .concat("...");
  };

  const coupons = async () => {
    try {
      const res = await fetch(
        "https://teal-vast-blackbuck.cyclic.app/api/admin/",
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setCoupons(data.coupon);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    coupons();
  }, []);

  const couponHandler = (e) => {
    setCoupon(e.target.value);
  };

  const couponValidate = () => {
    let isCoupon = couponCodes.find((coup) => coup.couponCode === couponCode);
    console.log(isCoupon);
    if (isCoupon) {
      if (isCoupon.amount) {
        setDiscPrice(totalPrice - +isCoupon.amount);
        console.log(totalPrice);
      } else if (isCoupon.discount) {
        setDiscPrice(totalPrice - totalPrice * (+isCoupon.discount / 100));
        console.log(totalPrice);
      }
    }
  };

  const wayToCheckout = () => {
    localStorage.setItem("totalPrice", `${totalPrice}`);
    navigate("/address");
  };

  return (
    <>
      <div className="cartpage">
        <div className="left-cart-area">
          <h1>Your Cart</h1>
          <p>
            TOTAL [{cart?.length ?? 0}]{" "}
            <b>{discountPrice ? discountPrice : totalPrice} Rupees</b>
          </p>
          {cart?.length
            ? cart?.map(
                ({
                  _id,
                  name,
                  category,
                  description1,
                  description2,
                  manufactureYear,
                  price,
                  edition,
                  numberOfPages,
                  language,
                  qty,
                  image1,
                }) => (
                  <CartCard
                    key={_id}
                    _id={_id}
                    name={name}
                    category={category}
                    description1={description1}
                    description2={description2}
                    price={price}
                    image1={image1}
                    edition={edition}
                    qty={qty ?? 1}
                    manufactureYear={manufactureYear}
                    numberOfPages={numberOfPages}
                    language={language}
                  />
                )
              )
            : "Your cart is Empty"}
        </div>
        <div className="Right-cart-area">
          <button
            style={{
              color: "black",
              border: "2px solid black",
              padding: "1rem 2rem",
              backgroundColor: "white",
              boxShadow: "2px 2px 2px rgba(0, 0, 0)",
              width: "100%",
              marginBottom: "10px",
            }}
            onClick={() =>
              window.open(
                `https://wa.me/918770840787?text=I'm%20interested%20in%20Purchasing%20product%20`,
                "_blank"
              )
            }
          >
            Contact Supplier
          </button>
          <button
            className="btn btn-primary"
            disabled={cart?.length ? false : true}
            onClick={wayToCheckout}
          >
            Buy | खरीदें
          </button>
          <h1>Your Cart</h1>
          <div>
            <label>
              Coupon Code:{" "}
              <input type="text" name="couponCode" onChange={couponHandler} />
            </label>
            <button onClick={couponValidate}>Submit</button>
          </div>
          <div className="sec2-cart-right">
            <p>Delivery</p>
            <p>FREE</p>
          </div>
          <hr />
          <div className="sec3-cart-right">
            <div>
              <p>
                <b>Total : </b>
              </p>
              <p>[Inclusive of all taxes]</p>
            </div>
            <p>{discountPrice ? discountPrice : totalPrice} Rupees</p>
          </div>
          <ul>
            {cart?.map(({ name, price, _id, qty = 1 }) => (
              <div key={_id} className="sec1-cart-right">
                <p>{convertString(name, 30)}</p>
                <p>{qty}</p>
                <p>{price} Rupees</p>
              </div>
            ))}
          </ul>
          <hr />
          <div className="payment-logos">
            <marquee direction="right">
              <img
                width="50"
                height="50"
                src="https://img.icons8.com/external-nawicon-glyph-nawicon/64/external-Free-Delivery-ecommerce-nawicon-glyph-nawicon.png"
                alt="external-Free-Delivery-ecommerce-nawicon-glyph-nawicon"
              />
            </marquee>
            {/* <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/100/visa.png"
              alt="visa"
            />
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/100/mastercard-logo.png"
              alt="mastercard-logo"
            />
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/100/rupay.png"
              alt="rupay"
            />
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/100/banknotes.png"
              alt="banknotes"
            />
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/100/bhim-upi.png"
              alt="bhim-upi"
            />
            <img
              width="50"
              height="50"
              src="https://img.icons8.com/ios-filled/100/bank-cards--v1.png"
              alt="bank-cards--v1"
            /> */}
          </div>
        </div>
      </div>
      {/* <AlertBox alertMessage={btnClicked?.message} clicked={btnClicked?.clicked}/> */}
    </>
  );
}
