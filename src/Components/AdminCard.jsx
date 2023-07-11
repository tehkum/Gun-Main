import { Link, useNavigate } from "react-router-dom";
import "./Productcard.css";

export default function Admincard(props) {
  const {
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
  } = props;

  const deleteHandler = async () => {
    const res = await fetch(
      `http://localhost:3000/api/admin/products/${_id}/delete`,
      { method: "DELETE" }
    );
    console.log(await res.json());
  };

  const navigate = useNavigate();

  const editHandle = () => {
    navigate(`/admin/all-products/${_id}`);
  };

  return (
    <div className="productcard">
      <Link to="#">
        <div className="product-card-img">
          <img src="https://picsum.photos/200/300" alt=".." />
          <p>₹ {price}</p>
        </div>
      </Link>
      <div className="product-card-desc">
        <h2>{name}</h2>
        <p className="product-cat">{category}</p>
        <p>{manufactureYear}</p>
        <button
          style={{
            backgroundColor: "white",
            border: "1px solid red",
            color: "red",
            width: "80%",
            marginBottom: "10px",
          }}
          onClick={deleteHandler}
        >
          Delete Product
        </button>
        <button
          style={{
            backgroundColor: "red",
            border: "1px solid #666666",
            color: "white",
            width: "80%",
          }}
          onClick={editHandle}
        >
          Edit Product
        </button>
      </div>
    </div>
  );
}
