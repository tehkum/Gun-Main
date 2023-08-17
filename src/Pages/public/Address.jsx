import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function AddressPage() {
  const [checkoutDetails, setcheckoutDetails] = useState({
    productData: [],
    fullName: "",
    phoneNo: "",
    address1: "",
    address2: "",
    city: "",
    country: "India",
    pincode: "",
    totalPrice: localStorage.getItem("totalPrice"),
  });

  const cartDetails = JSON.parse(localStorage.getItem("cart")) || [];
  const navigate = useNavigate();

  useEffect(() => {
    checkoutDetails.productData = cartDetails.reduce(
      (acc, items) => [...acc, { productId: items._id, qty: items.qty ?? 1 }],
      []
    );
    setcheckoutDetails({ ...checkoutDetails });
  }, []);

  const orderHandler = async () => {
    try {
      const res = await axios.post(
        "https://teal-vast-blackbuck.cyclic.app/api/order/checkout",
        { ...checkoutDetails },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
      toast("Order Successful", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcheckoutDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(checkoutDetails);
  };

  return (
    <>
      <div className="login-sec-2">
        <h1>Personal Information</h1>
        <label>
          <input
            type="text"
            name="fullName"
            value={checkoutDetails.fullName}
            onChange={handleChange}
            placeholder="Full Name"
          />
        </label>

        <label>
          <input
            type="number"
            name="phoneNo"
            value={checkoutDetails.phoneNo}
            onChange={handleChange}
            placeholder="Mobile Number"
          />
        </label>

        <label>
          <input
            type="text"
            name="address1"
            value={checkoutDetails.address1}
            onChange={handleChange}
            placeholder="Address"
          />
        </label>

        {/* <label>
          <input
            type="text"
            name="address2"
            value={checkoutDetails.address2}
            onChange={handleChange}
            placeholder="Address Lane 2"
          ></input>
        </label> */}

        <label>
          <input
            type="text"
            name="city"
            value={checkoutDetails.city}
            onChange={handleChange}
            placeholder="City"
          />
        </label>

        <label>
          <input
            type="number"
            name="pincode"
            value={checkoutDetails.pincode}
            onChange={handleChange}
            placeholder="Pin Code"
          />
        </label>

        {/* <label>
          <input
            type="text"
            name="country"
            value={checkoutDetails.country}
            onChange={handleChange}
            placeholder="Country"
          />
        </label> */}

        <button onClick={orderHandler}>Order</button>
      </div>
    </>
  );
}
