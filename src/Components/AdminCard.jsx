import { Link, useNavigate } from "react-router-dom";
import "./Productcard.css";

export default function Admincard(props) {
  const {
    // eslint-disable-next-line react/prop-types
    _id,
    name,
    category,
    image1,
    price,
  } = props;

  const deleteHandler = async () => {
    const res = await fetch(
      `https://teal-vast-blackbuck.cyclic.app/api/admin/products/${_id}/delete`,
      { method: "DELETE" }
    );
    console.log(await res.json());
  };

  const navigate = useNavigate();

  const editHandle = () => {
    navigate(`/admin/all-products/${_id}`);
  };

  return (
    <div className="q7Card">
      <img src={image1} alt="..." />

      <Link
        to={`/product/${_id}`}
        style={{ color: "black", textDecoration: "none" }}
      >
        <div className="q7Cont">
          <div>
            <h3>{name}</h3>
            <p>{category}</p>
          </div>
          <p>₹ {price}</p>
        </div>
      </Link>
      <button className="q7-view-btn" onClick={editHandle}>
        Edit Product
      </button>
      <button className="q7-btn" onClick={deleteHandler}>
        Delete Product
      </button>
    </div>
    // <div className="productcard">
    //   <Link to="#">
    //     <div className="product-card-img">
    //       <img src="https://picsum.photos/200/300" alt=".." />
    //       <p>₹ {price}</p>
    //     </div>
    //   </Link>
    //   <div className="product-card-desc">
    //     <h2>{name}</h2>
    //     <p className="product-cat">{category}</p>
    //     <p>{manufactureYear}</p>
    //     <button
    //       style={{
    //         backgroundColor: "white",
    //         border: "1px solid red",
    //         color: "red",
    //         width: "80%",
    //         marginBottom: "10px",
    //       }}
    //       onClick={deleteHandler}
    //     >
    //       Delete Product
    //     </button>
    //     <button
    //       style={{
    //         backgroundColor: "red",
    //         border: "1px solid #666666",
    //         color: "white",
    //         width: "80%",
    //       }}
    //       onClick={editHandle}
    //     >
    //       Edit Product
    //     </button>
    //   </div>
    // </div>
  );
}
