import { useEffect, useState } from "react";
import "./ProductManage.css";

export default function CouponManage() {
  const [videos, setVideos] = useState({
    discount: "",
    couponCode: "",
    amount: "",
  });
  const [vidAdded, setVidAdded] = useState(false);
  const [youtubeVids, setYoutubeVids] = useState([]);
  const [discountType, setDiscountType] = useState("discount");
  const [errors, setErrors] = useState({});

  const videoHandler = async () => {
    try {
      const res = await fetch(
        "https://teal-vast-blackbuck.cyclic.app/api/admin/",
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setYoutubeVids(data.coupon);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVideo = async (_id) => {
    try {
      const res = await fetch(
        `https://teal-vast-blackbuck.cyclic.app/api/admin//coupon/${_id}/delete`,
        { method: "DELETE" }
      );
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    videoHandler();
  }, [vidAdded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear the error message when the user starts typing in the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = {};
    if (!videos.discount) {
      validationErrors.discount = "Youtube link is required.";
    }
    if (!videos.couponCode) {
      validationErrors.couponCode = "Category is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await fetch(
          "https://teal-vast-blackbuck.cyclic.app/api/admin/coupon/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...videos }),
          }
        );
        console.log(await res.json());
      } catch (error) {
        console.log(error);
      } finally {
        setVidAdded(!vidAdded);
        // Clear form fields after successful submission
        setVideos({
          couponCode: "",
          discount: "",
          amount: "",
        });
      }
    }
  };

  return (
    <div>
      <div className="login-sec-2">
        <h1>Add Coupon</h1>
        <label>
          <input
            type="text"
            name="couponCode"
            value={videos.couponCode}
            onChange={handleChange}
            placeholder="Coupon Code"
          />
          {errors.couponCode && (
            <span className="error">{errors.couponCode}</span>
          )}
        </label>
        <select onChange={(e) => setDiscountType(e.target.value)}>
          <option selected>--</option>
          <option value="discount">Discount in percentage</option>
          <option value="amount">Discount in ruppees</option>
        </select>

        <label>
          <input
            type="text"
            name={discountType === "discount" ? "discount" : "amount"}
            value={
              discountType === "discount" ? videos.discount : videos.amount
            }
            onChange={handleChange}
            placeholder={
              discountType === "discount"
                ? "Discount in percent"
                : "Discount in ruppees"
            }
          />
          {errors.discount && <span className="error">{errors.discount}</span>}
        </label>

        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="product-display">
        {youtubeVids?.map((items) => {
          const { _id, couponCode, discount } = items;
          return (
            <div
              key={_id}
              style={{ border: "1px solid black", display: "inline" }}
            >
              <p>
                <b>Coupon Code: </b>
                {couponCode} -- <b>Discount: </b>
                {discount}
              </p>
              <button
                // style={{ position: "absolute", top: "10px", left: "10px" }}
                onClick={() => deleteVideo(_id)}
              >
                X
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
