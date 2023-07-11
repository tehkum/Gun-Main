import { useContext, useState } from "react";
import "./ProductManage.css";
import { useProducts } from "../../main";
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
        "https://fair-jade-bream-suit.cyclic.app/api/admin/products/add", {...formData},
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
        <label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </label>

        <label>
          {/* <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="Category"
          /> */}
          Category: 
          <select name="category"
            value={formData.category}
            onChange={handleChange}>
            <option value="Blouse Paper Cutting Pattern">Blouse Paper Cutting Pattern</option>
            <option value="Tailoring Material">Tailoring Material</option>
            <option value="Dress Paper Cutting Pattern">Dress Paper Cutting Pattern</option>
          </select>
        </label>

        <label>
          Front Image
          <input
            type="file"
            name="image1"
            // value={formData.category}
            onChange={imageHandler}
            // placeholder="Category"
          />
        </label>
        <label>
          Image 1
          <input
            type="file"
            name="image2"
            // value={formData.category}
            onChange={imageHandler}
            // placeholder="Category"
          />
        </label>
        <label>
          Image 2
          <input
            type="file"
            name="image3"
            // value={formData.category}
            onChange={imageHandler}
            // placeholder="Category"
          />
        </label>
        <label>
          Image 3
          <input
            type="file"
            name="image4"
            // value={formData.category}
            onChange={imageHandler}
            // placeholder="Category"
          />
        </label>

        <label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Price"
          />
        </label>

        <label>
          <textarea
            name="description1"
            value={formData.description1}
            onChange={handleChange}
            placeholder="Description 1"
          ></textarea>
        </label>

        <label>
          <textarea
            name="description2"
            value={formData.description2}
            onChange={handleChange}
            placeholder="Description 2"
          ></textarea>
        </label>

        <label>
          <input
            type="text"
            name="manufactureYear"
            value={formData.manufactureYear}
            onChange={handleChange}
            placeholder="Manufacturing year"
          />
        </label>

        <label>
          <input
            type="text"
            name="edition"
            value={formData.edition}
            onChange={handleChange}
            placeholder="Edition"
          />
        </label>

        <label>
          <input
            type="text"
            name="numberOfPages"
            value={formData.numberOfPages}
            onChange={handleChange}
            placeholder="Number of pages"
          />
        </label>

        <label>
          <input
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



