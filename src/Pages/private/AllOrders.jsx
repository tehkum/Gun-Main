import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useProducts } from "../../Context/ProductProvider";
import { Container } from "@mui/material";

export default function AllOrders() {
  const { orderId } = useParams();
  const { orderNo, productData } = useContext(useProducts);
  const [thisOrder, setThis] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    setThis(orderNo.find((order) => order._id === orderId));
  }, [orderId]);

  return (
    <Container
      maxWidth="lg"
      style={{
        border: "1px solid black",
        display: "flex",
        flexDirection: "column",
        padding: "1rem",
        // alignItems: "center",
      }}
    >
      <h1>Order Details</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1em",
          justifyContent: "center",
        }}
      >
        {thisOrder?.productData?.map((item, index) => {
          const thisProduct = productData?.find(
            (product) => product?._id === item?.productId
          );
          return (
            <div
              key={item.productId}
              onClick={() => navigate(`/product/${item?.productId}`)}
              style={{
                border: "1px solid black",
                width: "300px",
              }}
            >
              <h2>product {index}</h2>
              <img
                src={thisProduct?.image1}
                alt=".."
                style={{ width: "100%" }}
              />
              <h2>{thisProduct?.name}</h2>
              <p>
                <b>{thisProduct?.price}</b>
              </p>
              <p>
                <b>Quantity: </b>
                {item?.qty}
              </p>
              <p>
                <b>total price: </b> {+item?.qty * +thisProduct?.price}
              </p>
            </div>
          );
        })}
      </div>
      <h2>Name of person: {thisOrder?.fullName}</h2>
      <h2>Phone no.: {thisOrder?.phoneNo}</h2>
      <h2>Total Price: {thisOrder?.totalPrice}</h2>
      <h2>
        <b>Address: </b>
        {thisOrder.address1}--{thisOrder.address2}--{thisOrder.pincode}--
        {thisOrder.city}--
        {thisOrder.country}
      </h2>
    </Container>
  );
}
