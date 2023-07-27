// import { useEffect, useState } from "react";
// import "./ProductManage.css";

// export default function YoutubeManage() {
//   const [videos, setVideos] = useState({
//     link: "",
//     title: "",
//     category: "",
//   });
//   const [vidAdded, setVidAdded] = useState(false);

//   const [youtubeVids, setYoutubeVids] = useState([]);

//   const videoHandler = async () => {
//     try {
//       const res = await fetch(
//         "https://teal-vast-blackbuck.cyclic.app/api/admin/",
//         {
//           method: "GET",
//         }
//       );
//       const data = await res.json();
//       setYoutubeVids(data.youtube);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const deleteVideo = async (_id) => {
//     try {
//       const res = await fetch(
//         `https://teal-vast-blackbuck.cyclic.app/api/admin/youtube/${_id}/delete`,
//         { method: "DELETE" }
//       );
//       console.log(await res.json());
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     videoHandler();
//   }, [vidAdded]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setVideos((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       const res = await fetch(
//         "https://teal-vast-blackbuck.cyclic.app/api/admin/youtube/add",
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ ...videos }),
//         }
//       );
//       console.log(await res.json());
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setVidAdded(!vidAdded);
//     }
//   };

//   return (
//     <div>
//       <div className="login-sec-2">
//         <h1>Add Product</h1>
//         <label>
//           <input
//             type="link"
//             name="link"
//             value={videos.link}
//             onChange={handleChange}
//             placeholder="Youtube link"
//           />
//         </label>

//         <label>
//           <input
//             type="text"
//             name="category"
//             value={videos.category}
//             onChange={handleChange}
//             placeholder="Category"
//           />
//         </label>

//         <label>
//           <input
//             type="text"
//             name="title"
//             value={videos.title}
//             onChange={handleChange}
//             placeholder="title"
//           />
//         </label>

//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//       <div className="product-display">
//         {youtubeVids.map((items) => {
//           const { _id, link } = items;
//           return (
//             <div key={_id} style={{ position: "relative" }}>
//               <button
//                 style={{ position: "absolute", top: "10px", left: "10px" }}
//                 onClick={() => deleteVideo(_id)}
//               >
//                 X
//               </button>
//               <iframe width="420" height="315" src={link}></iframe>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

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
  const [errors, setErrors] = useState({});

  const videoHandler = async () => {
    try {
      const res = await fetch(
        "https://teal-vast-blackbuck.cyclic.app/api/admin/",
        {
          method: "GET",
        }
      );
      const data = await res.json();
      setYoutubeVids(data.youtube);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteVideo = async (_id) => {
    try {
      const res = await fetch(
        `https://teal-vast-blackbuck.cyclic.app/api/admin/youtube/${_id}/delete`,
        { method: "DELETE" }
      );
      console.log(await res.json());
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
    // Clear the error message when the user starts typing in the field
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async () => {
    const validationErrors = {};
    if (!videos.link) {
      validationErrors.link = "Youtube link is required.";
    }
    if (!videos.category) {
      validationErrors.category = "Category is required.";
    }
    if (!videos.title) {
      validationErrors.title = "Title is required.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      try {
        const res = await fetch(
          "https://teal-vast-blackbuck.cyclic.app/api/admin/youtube/add",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...videos }),
          }
        );
        console.log(await res.json());
      } catch (error) {
        console.log(error);
      } finally {
        setVidAdded(!vidAdded);
        // Clear form fields after successful submission
        setVideos({
          link: "",
          title: "",
          category: "",
        });
      }
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
          {errors.link && <span className="error">{errors.link}</span>}
        </label>

        <label>
          <input
            type="text"
            name="category"
            value={videos.category}
            onChange={handleChange}
            placeholder="Category"
          />
          {errors.category && <span className="error">{errors.category}</span>}
        </label>

        <label>
          <input
            type="text"
            name="title"
            value={videos.title}
            onChange={handleChange}
            placeholder="title"
          />
          {errors.title && <span className="error">{errors.title}</span>}
        </label>

        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="product-display">
        {youtubeVids.map((items) => {
          const { _id, link } = items;
          return (
            <div key={_id} style={{ position: "relative" }}>
              <button
                style={{ position: "absolute", top: "10px", left: "10px" }}
                onClick={() => deleteVideo(_id)}
              >
                X
              </button>
              <iframe width="420" height="315" src={link}></iframe>
            </div>
          );
        })}
      </div>
    </div>
  );
}
