/* eslint-disable react/jsx-key */
import { TextField } from "@mui/material";
import axios from "axios";
import "./blog.css";
import { useEffect, useState } from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router";
// import PlaygroundSpeedDial from "../../Components/drawer";

export default function AddBlog() {
  const [inputArr, setInputArr] = useState([]);
  const [showControls, setControls] = useState(false);
  const navigate = useNavigate();
  const [titleDetail, setTitleDetail] = useState({ title: "", img: "" });
  const [blogData, setBlog] = useState([]);

  useEffect(() => {
    axios
      .get("https://teal-vast-blackbuck.cyclic.app/api/admin/blog/all")
      .then((res) => setBlog(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteHandler = async (id) => {
    try {
      const res = await axios.delete(
        `https://teal-vast-blackbuck.cyclic.app/api/admin/blog/${id}/delete`
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
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
      setTitleDetail({ ...titleDetail, img: uri?.url });
    } catch (error) {
      console.log(error);
    }
  };

  const submitHandler = async () => {
    try {
      const contentArray = inputArr
        .map((item) => {
          if (item.type === "image") {
            // Handle images
            return { type: "image", src: item.src, alt: "gungun" };
          } else if (item.type === "h2") {
            // Handle subheadings
            return { type: "subHeading", content: item.content };
          } else if (item.type === "p") {
            // Handle paragraphs
            return { type: "paragraph", content: item.content };
          } else {
            // Handle other content or ignore it
            return null;
          }
        })
        .filter(Boolean);

      const mainContent = {
        title: titleDetail?.title,
        body: [...contentArray],
        mainImg: titleDetail?.img,
      };
      const api = await axios.post(
        "https://teal-vast-blackbuck.cyclic.app/api/admin/blog/add",
        mainContent,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(api);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const inputHandler = (type) => {
    if (type === "image") {
      const input = document.createElement("input");
      input.type = "file";
      input.onchange = async (e) => {
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
        console.log(uri);
        setInputArr([...inputArr, { type: "image", src: uri?.url }]);
      };
      input.click();
    }
    if (type === "subHeading") {
      setInputArr([...inputArr, { type: "h2", content: "Write Subheading" }]);
    }
    if (type === "paragraph") {
      setInputArr([...inputArr, { type: "p", content: "Write Paragraph" }]);
    }
  };

  const handleContentChange = (index, newContent) => {
    const updatedInputArr = [...inputArr];
    updatedInputArr[index].content = newContent;
    setInputArr(updatedInputArr);
  };

  return (
    <div className="blog-page">
      {showControls && (
        <div className="type-selector">
          <span onClick={() => inputHandler("image")}>Image</span>
          <span onClick={() => inputHandler("subHeading")}>Subheading</span>
          <span onClick={() => inputHandler("paragraph")}>Paragraph</span>
        </div>
      )}
      <div className="blog-form">
        <h1>Blog Writing</h1>
        <TextField
          label="Enter title"
          onChange={(e) =>
            setTitleDetail({ ...titleDetail, title: e.target.value })
          }
        />
        <label>
          Cover Image: <input type="file" onChange={imageHandler} />
        </label>
        {inputArr.map((item, index) => (
          <div key={index}>
            {item.type === "image" && (
              <img src={item.src} alt="Selected Image" />
            )}
            {item.type === "h2" && (
              <h2
                contentEditable="true"
                onBlur={(e) => handleContentChange(index, e.target.innerText)}
              >
                {item.content}
              </h2>
            )}
            {item.type === "p" && (
              <p
                contentEditable="true"
                onBlur={(e) => handleContentChange(index, e.target.innerText)}
              >
                {item.content}
              </p>
            )}
          </div>
        ))}
        <button onClick={submitHandler}>Submit</button>
      </div>
      <div className="blog-card-arr">
        {blogData?.map(({ title, _id, body, mainImg }) => (
          <div className="blog-card" key={_id}>
            <img
              src={mainImg}
              alt="..."
              onClick={() => navigate(`/blogs/${_id}`)}
            />
            <div>
              <h2 onClick={() => navigate(`/blogs/${_id}`)}>{title}</h2>
              <p>{body[0]?.content}</p>
              <button onClick={() => deleteHandler(_id)}>Delete</button>
              <button onClick={() => navigate(`/admin/edit-blog/${_id}`)}>
                edit
              </button>
            </div>
          </div>
        ))}
      </div>
      <Fab
        color="secondary"
        aria-label="add"
        sx={{ position: "fixed", bottom: "10px", right: "10px" }}
        onClick={() => setControls(!showControls)}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}
