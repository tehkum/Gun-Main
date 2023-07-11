import { useEffect, useState } from "react";
import "./ProductManage.css";

export default function YoutubeManage() {
  const [videos, setVideos] = useState({
    link: "",
    title: "",
    category: "",
  });
  const [vidAdded, setVidAdded] = useState(false);

  const [youtubeVids, setYoutubeVids] = useState([]);

  const videoHandler = async () => {
    try {
      const res = await fetch("https://fair-jade-bream-suit.cyclic.app/api/admin/", {
        method: "GET",
      });
      const data = await res.json();
      setYoutubeVids(data.youtube);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    videoHandler();
  }, [vidAdded]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVideos((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://fair-jade-bream-suit.cyclic.app/api/admin/youtube/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...videos }),
      });
      console.log(await res.json());
    } catch (error) {
      console.log(error);
    } finally {
      setVidAdded(!vidAdded);
    }
  };

  return (
    <div>
      <div className="login-sec-2">
        <h1>Add Product</h1>
        <label>
          <input
            type="link"
            name="link"
            value={videos.link}
            onChange={handleChange}
            placeholder="Youtube link"
          />
        </label>

        <label>
          <input
            type="text"
            name="category"
            value={videos.category}
            onChange={handleChange}
            placeholder="Category"
          />
        </label>

        <label>
          <input
            type="text"
            name="title"
            value={videos.title}
            onChange={handleChange}
            placeholder="title"
          />
        </label>

        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="product-display">
        {youtubeVids.map((items) => {
          const { _id, title, link } = items;
          return (
            <div key={_id}>
              <iframe
                width="420"
                height="315"
                src={link}
              ></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
}
