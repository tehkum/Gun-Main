import axios from "axios";
import { useEffect, useState } from "react";
// import { useParams } from "react-router";

export default function BlogVIew() {
  //   const { blogId } = useParams();
  const [blogData, setBlog] = useState([]);

  useEffect(() => {
    axios
      .get("https://teal-vast-blackbuck.cyclic.app/api/admin/blog/all")
      .then((res) => setBlog(res?.data))
      .catch((err) => console.log(err));
    //   .post(`https://teal-vast-blackbuck.cyclic.app/api/admin/blog/${blogId}`)
  }, []);

  return <></>;
}
