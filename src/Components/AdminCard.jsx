import { Link, useNavigate } from "react-router-dom";
import "./Productcard.css";
import { useContext } from "react";
import { useProducts } from "../Context/ProductProvider";

export default function Admincard(props) {
  const {
    // eslint-disable-next-line react/prop-types
    _id,
    name,
    category,
    image1,
    price,
  } = props;

  const { clickedP } = useContext(useProducts);

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
      <button
        className="q7-btn"
        onClick={() => {
          deleteHandler();
          clickedP();
        }}
      >
        Delete Product
      </button>
    </div>
  );
}
