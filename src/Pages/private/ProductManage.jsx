import { useContext, useState } from "react";
import "./ProductManage.css";
import { useProducts } from "../..";
import Admincard from "../../Components/AdminCard";
import axios from "axios";

export default function ProductManage() {
  const initialFormData = {
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
  };
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});

  const { productData, clickedP } = useContext(useProducts);

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
    const validationErrors = {};
    // Perform form validation checks
    if (!formData.name) {
      validationErrors.name = "Name is required.";
    }
    if (formData.category === "none") {
      validationErrors.category = "Please select a category.";
    }
    if (!formData.price) {
      validationErrors.price = "Price is required.";
    }
    // Add more validation checks for other fields if needed
    if (!formData.description1) {
      validationErrors.description1 = "Please select a description";
    }
    if (!formData.description2) {
      validationErrors.description2 = "Please select a description";
    }
    if (!formData.image1) {
      validationErrors.image1 = "Please select a image";
    }
    if (!formData.manufactureYear) {
      validationErrors.manufactureYear = "Manufacture Year Required";
    }
    if (!formData.edition) {
      validationErrors.edition = "Please select a edition";
    }
    if (!formData.numberOfPages) {
      validationErrors.numberOfPages = "Please write number of pages";
    }
    if (!formData.language) {
      validationErrors.language = "Please select a language";
    }

    // If there are validation errors, set the state and prevent form submission
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
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
        clickedP();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
      setFormData(initialFormData);
      setErrors({});
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
          {errors.name && <span className="error">{errors.name}</span>}
        </label>

        <label htmlFor="category">
          Category:
          <select
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="none" selected>
              --
            </option>
            <option value="Blouse Paper Cutting Pattern">
              Blouse Paper Cutting Pattern
            </option>
            <option value="Tailoring Material">Tailoring Material</option>
            <option value="Dress Paper Cutting Pattern">
              Dress Paper Cutting Pattern
            </option>
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
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
          {errors.image1 && <span className="error">{errors.image1}</span>}
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
          {errors.price && <span className="error">{errors.price}</span>}
        </label>

        <label htmlFor="description1">
          <textarea
            id="description1"
            name="description1"
            value={formData.description1}
            onChange={handleChange}
            placeholder="Description 1"
          ></textarea>
          {errors.description1 && (
            <span className="error">{errors.description1}</span>
          )}
        </label>

        <label htmlFor="description2">
          <textarea
            id="description2"
            name="description2"
            value={formData.description2}
            onChange={handleChange}
            placeholder="Description 2"
          ></textarea>
          {errors.description2 && (
            <span className="error">{errors.description2}</span>
          )}
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
          {errors.manufactureYear && (
            <span className="error">{errors.manufactureYear}</span>
          )}
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
          {errors.edition && <span className="error">{errors.edition}</span>}
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
          {errors.numberOfPages && (
            <span className="error">{errors.numberOfPages}</span>
          )}
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
          {errors.language && <span className="error">{errors.language}</span>}
        </label>

        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="coupon-Register">
        <label>
          Coupon Code: <input type="text" />
        </label>
        <label>
          discount: <input type="number" />
        </label>
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
