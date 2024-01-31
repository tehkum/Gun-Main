import axios from "axios";
import { useEffect, useState } from "react";
import "./blog.css";
import { useNavigate } from "react-router";
// import { useParams } from "react-router";
import DOMPurify from "dompurify";

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
      <h1>Sewing Classes</h1>
      <div className="blog-card-arr">
        {blogData?.map(({ heading, _id, coverImage }) => (
          <div
            className="blog-card"
            key={_id}
            onClick={() => navigate(`/blogs/${_id}`)}
          >
            <img src={coverImage} alt="..." />
            <div>
              <h2>{heading}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
