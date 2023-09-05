import axios from "axios";
import { useEffect, useState } from "react";
import "./blog.css";
import { useNavigate } from "react-router";
// import { useParams } from "react-router";

export default function BlogVIew() {
  //   const { blogId } = useParams();
  const [blogData, setBlog] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://teal-vast-blackbuck.cyclic.app/api/admin/blog/all")
      .then((res) => setBlog(res?.data?.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(blogData);

  // const convertString = (str) => {
  //   return str
  //     .split("")
  //     .filter((char, index) => index <= 36)
  //     .join("")
  //     .concat("...");
  // };

  return (
    <div className="blog-view">
      <h1>Blogs</h1>
      <div className="blog-card-arr">
        {blogData?.map(({ title, _id, body, mainImg }) => (
          <div
            className="blog-card"
            key={_id}
            onClick={() => navigate(`/blogs/${_id}`)}
          >
            <img src={mainImg} alt="..." />
            <div>
              <h2>{title}</h2>
              <p>{body[0]?.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
