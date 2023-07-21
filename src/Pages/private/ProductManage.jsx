import { useContext, useState } from "react";
import "./ProductManage.css";
import { useProducts } from "../..";
import Admincard from "../../Components/AdminCard";
import axios from "axios";

export default function ProductManage() {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    price: "",
    description1: "",
    description2: "",
    image1: "",
    image2: "",
    image3: "",
    image4: "",
    manufactureYear: "",
    edition: "",
    numberOfPages: "",
    language: "",
  });

  const { productData } = useContext(useProducts);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(formData);
  };

  const imageHandler = async (e) => {
    try {
      const image = e.target.files[0];
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "t3bjkshk");
      data.append("cloud_name", "da5ar6ga6");
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/da5ar6ga6/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      const uri = await res.json();
      setFormData((prevData) => ({
        ...prevData,
        [e.target.name]: uri?.url,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "https://teal-vast-blackbuck.cyclic.app/api/admin/products/add",
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="login-sec-2">
        <h1>Add Product</h1>
        <label htmlFor="name">
          <input
            id="name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </label>

        <label htmlFor="category">
          Category:
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="Blouse Paper Cutting Pattern">
              Blouse Paper Cutting Pattern
            </option>
            <option value="Tailoring Material">Tailoring Material</option>
            <option value="Dress Paper Cutting Pattern">
              Dress Paper Cutting Pattern
            </option>
          </select>
        </label>

        <label htmlFor="image1">
          Front Image
          <input
            id="image1"
            type="file"
            name="image1"
            // value={formData.category}
            onChange={imageHandler}
            // placeholder="Category"
          />
        </label>
        <label htmlFor="image2">
          Image 1
          <input
            id="image2"
            type="file"
            name="image2"
            // value={formData.category}
            onChange={imageHandler}
            // placeholder="Category"
          />
        </label>
        <label htmlFor="image3">
          Image 2
          <input
            type="file"
            name="image3"
            id="image3"
            // value={formData.category}
            onChange={imageHandler}
            // placeholder="Category"
          />
        </label>
        <label htmlFor="image4">
          Image 3
          <input
            type="file"
            name="image4"
            id="image4"
            // value={formData.category}
            onChange={imageHandler}
            // placeholder="Category"
          />
        </label>

        <label htmlFor="price">
          <input
            id="price"
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />
        </label>

        <label htmlFor="description1">
          <textarea
            id="description1"
            name="description1"
            value={formData.description1}
            onChange={handleChange}
            placeholder="Description 1"
          ></textarea>
        </label>

        <label htmlFor="description2">
          <textarea
            id="description2"
            name="description2"
            value={formData.description2}
            onChange={handleChange}
            placeholder="Description 2"
          ></textarea>
        </label>

        <label htmlFor="manYear">
          <input
            id="manYear"
            type="text"
            name="manufactureYear"
            value={formData.manufactureYear}
            onChange={handleChange}
            placeholder="Manufacturing year"
          />
        </label>

        <label htmlFor="edition">
          <input
            id="edition"
            type="text"
            name="edition"
            value={formData.edition}
            onChange={handleChange}
            placeholder="Edition"
          />
        </label>

        <label htmlFor="nop">
          <input
            id="nop"
            type="text"
            name="numberOfPages"
            value={formData.numberOfPages}
            onChange={handleChange}
            placeholder="Number of pages"
          />
        </label>

        <label htmlFor="lang">
          <input
            id="lang"
            type="text"
            name="language"
            value={formData.language}
            onChange={handleChange}
            placeholder="Language"
          />
        </label>

        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="product-display">
        {productData?.map((items) => {
          const {
            _id,
            name,
            category,
            description1,
            description2,
            manufactureYear,
            image1,
            price,
            edition,
            numberOfPages,
            language,
          } = items;
          return (
            <Admincard
              key={_id}
              _id={_id}
              name={name}
              category={category}
              description1={description1}
              description2={description2}
              image1={image1}
              price={price}
              edition={edition}
              manufactureYear={manufactureYear}
              numberOfPages={numberOfPages}
              language={language}
            />
          );
        })}
      </div>
    </div>
  );
}
