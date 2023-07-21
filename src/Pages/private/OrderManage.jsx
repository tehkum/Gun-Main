import { useContext } from "react";
import "./OrderManage.css";
import { useProducts } from "../../Context/ProductProvider";
import { useNavigate } from "react-router";

export default function OrderManage() {
  const { orderNo } = useContext(useProducts);
  const navigate = useNavigate();

  return (
    <>
      <div className="order-sec">
        {orderNo?.map((row) => (
          <div
            key={row._id}
            className="order-per-box"
            onClick={() => navigate(`/admin/order/${row._id}`)}
          >
            <p>
              <b>Person Name: </b>
              {row.fullName}
            </p>
            <p>
              <b>Phone Number: </b>
              {row.phoneNo}
            </p>
            <p>
              <b>Address: </b>
              {row.address1}--{row.address2}--{row.pincode}--{row.city}--
              {row.country}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
