import { useContext } from "react";
import "./OrderManage.css";
import { useProducts } from "../../Context/ProductProvider";
import AdminPanel from "../../Components/AdminPanel";

export default function OrderManage() {
  const { orderNo, productData } = useContext(useProducts);
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
      <AdminPanel />
      <div className="order-sec">
        {orderNo?.map((row) => (
          <div key={row._id} className="order-per-box">
            <div>
              {row?.productData?.map((item) => (
                <div key={item.productId}>
                  {
                    productData?.find(
                      (product) => product?._id === item?.productId
                    )?._id
                  }
                </div>
              ))}
            </div>

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
