import axios from "axios";
import { useEffect, useState } from "react";

export default function AddressPage(){
  const [checkoutDetails, setcheckoutDetails] = useState({
    productData: [],
    fullName: "",
    phoneNo: "",
    address1: "",
    address2: "",
    city: "",
    country: "",
    pincode: "",
  })

  const cartDetails = JSON.parse(localStorage.getItem("cart")) || [];

  useEffect(()=>{
    checkoutDetails.productData = cartDetails.reduce((acc, items) => [...acc, {productId: items._id, qty: (items.qty ?? 1)}], [])
    setcheckoutDetails({...checkoutDetails})
  },[])

  const orderHandler = async () => {
    try {
        const res = await axios.post("http://localhost:3000/api/order/checkout",{...checkoutDetails},{
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setcheckoutDetails((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(checkoutDetails);
  };


    return <>
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
            placeholder="Address Lane 1"
          />
        </label>

        <label>
          <input
            type="text"
            name="address2"
            value={checkoutDetails.address2}
            onChange={handleChange}
            placeholder="Address Lane 2"
          ></input>
        </label>


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

        <label>
          <input
            type="text"
            name="country"
            value={checkoutDetails.country}
            onChange={handleChange}
            placeholder="Country"
          />
        </label>


        <button onClick={orderHandler}>Submit</button>
      </div>
    </>
}