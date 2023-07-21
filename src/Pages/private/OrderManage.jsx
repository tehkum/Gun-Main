import { useContext } from "react";
import "./OrderManage.css";
import { useProducts } from "../../Context/ProductProvider";
import { useNavigate } from "react-router";

export default function OrderManage() {
  const { orderNo } = useContext(useProducts);
  const navigate = useNavigate();
  console.log(orderNo, "wdf");

  // const rows = orderNo.map((orders) =>
  //   createData(
  //     orders.fullName,
  //     orders.phoneNo,
  //     `${orders.address1}--${orders.address2}--${orders.pincode}--${orders.city}--${orders.country}`,
  //     1
  //   )
  // );

  // function createData(name, calories, fat, carbs, protein) {
  //   return { name, calories, fat, carbs, protein };
  // }

  return (
    <>
      <div className="order-sec">
        {orderNo?.map((row) => (
          <div key={row._id} className="order-per-box" onClick={()=>navigate(`/admin/order/${row._id}`)}>
            {/* <div>
              {row?.productData?.map((item) => {
                const thisProduct = productData?.find(
                  (product) => product?._id === item?.productId
                );
                return (
                  <div key={item.productId}>
                    <img src={thisProduct?.image1} alt=".." />
                  </div>
                );
              })}
            </div> */}

            <p>{row.fullName}</p>
            <p>{row.phoneNo}</p>
            <p>
              {row.address1}--{row.address2}--{row.pincode}--{row.city}--
              {row.country}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
// <div>
//   <div className="product-display">
//     <ul>{
//         orderNo?.map(items=>{
//          const { _id, } = items;
//          return <li key={_id}>
//           <div></div>
//          </li>
//         })
//     }</ul>
// </div>
// </div>
