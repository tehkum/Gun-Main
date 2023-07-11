import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router"
import { useProducts } from "../../main";

export default function AllProducts(){
    const { id } = useParams();
    const { productData } = useContext(useProducts);
    const [ product, setProduct ] = useState({});

    useEffect(()=>{
        setProduct(productData.find(item=> item._id == id))
    },[id])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prevData) => ({
          ...prevData,
          [name]: value,
        }));
        console.log(product)
      };

    const handleSubmit = async () => {
        const res =  await fetch(`https://gungun-react.vercel.app/api/admin/products/${product._id}/edit`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
          },
        body: JSON.stringify({ ...product }) })
    console.log(res)
    }
    

    return<>
    <div className="login-sec-2">
        <h1>Edit Product</h1>
        <label>
          <input
            type="text"
            name="name"
            defaultValue={product.name}
            onChange={handleChange}
            placeholder="Name"
          />
        </label>

        <label>
          <input
            type="text"
            name="category"
            defaultValue={product.category}
            onChange={handleChange}
            placeholder="Category"
          />
        </label>

        <label>
          <input
            type="text"
            name="price"
            defaultValue={product.price}
            onChange={handleChange}
            placeholder="Price"
          />
        </label>

        <label>
          <textarea
            name="description1"
            defaultValue={product.description1}
            onChange={handleChange}
            placeholder="Description 1"
          ></textarea>
        </label>

        <label>
          <textarea
            name="description2"
            defaultValue={product.description2}
            onChange={handleChange}
            placeholder="Description 2"
          ></textarea>
        </label>

        <label>
          <input
            type="text"
            name="manufactureYear"
            defaultValue={product.manufactureYear}
            onChange={handleChange}
            placeholder="Manufacturing year"
          />
        </label>

        <label>
          <input
            type="text"
            name="edition"
            defaultValue={product.edition}
            onChange={handleChange}
            placeholder="Edition"
          />
        </label>

        <label>
          <input
            type="text"
            name="numberOfPages"
            defaultValue={product.numberOfPages}
            onChange={handleChange}
            placeholder="Number of pages"
          />
        </label>

        <label>
          <input
            type="text"
            name="language"
            defaultValue={product.language}
            onChange={handleChange}
            placeholder="Language"
          />
        </label>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </>
}