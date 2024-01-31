// import { useNavigate } from "react-router";
import { useParams } from "react-router";
import "./blog.css";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMPurify from "dompurify";

export default function BlogPage() {
  //   const navigate = useNavigate();
  const { blogId } = useParams();
  const [blog, setBlog] = useState({});

  useEffect(() => {
    axios
      .get(`https://teal-vast-blackbuck.cyclic.app/api/admin/blog/${blogId}`)
      .then((response) => {
        setBlog(response.data.data);
        console.log(response.data.data.body);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [blogId]);

  // const blogBody = () => {
  //   return blog?.body?.map((body) => {
  //     if (body?.type === "subHeading") {
  //       return <h3 key={body?._id}>{body?.content}</h3>;
  //     }
  //     if (body?.type === "paragraph") {
  //       return <p key={body?._id}>{body?.content}</p>;
  //     }
  //     if (body?.type === "image") {
  //       return (
  //         <img
  //           src={body?.src}
  //           alt={body?.alt}
  //           key={body?.content}
  //           className="blog-body-image"
  //         />
  //       );
  //     }
  //   });
  // };

  return (
    <>
      <img
        src={blog?.coverImage}
        alt={blog?.heading}
        className="main-img-display"
      />
      <div className="layout-subs">
        <div className="typography">
          <h1>{blog?.heading}</h1>

          <div
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(blog?.content),
            }}
          ></div>
        </div>
      </div>
    </>
  );
}
