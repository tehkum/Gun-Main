import { useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import ImageUploader from "quill-image-uploader";
import PropTypes from "prop-types";
import "react-quill/dist/quill.snow.css";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";
import { useNavigate } from "react-router";
import cloudinaryUploader from "../../utils";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

Quill.register("modules/imageUploader", ImageUploader);

const CreatePost = () => {
  const [editorHtml, setEditorHtml] = useState("");
  const [postHead, setPostHead] = useState("");
  const [postCategory, setPostCategory] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const navigate = useNavigate();

  const handleChange = (html) => {
    setEditorHtml(html);
  };

  const handleSubmit = async () => {
    if (postHead && editorHtml && postCategory) {
      const api = await axios.post(
        "https://teal-vast-blackbuck.cyclic.app/api/admin/blog/add",
        {
          content: editorHtml,
          heading: postHead,
          coverImage,
          category: postCategory,
        }
      );
      console.log(api);
      navigate("/");
    }
  };

  const coverHandler = async (e) => {
    const img = await cloudinaryUploader(e.target.files[0]);
    setCoverImage(img);
  };

  return (
    <>
      {coverImage && (
        <img
          src={coverImage}
          alt={postHead}
          style={{ width: "100%", height: "300px" }}
        />
      )}
      <div className="create-post-container">
        <p className="small-heading">POST SECTION</p>
        <h1 className="large-heading">Add New Post</h1>
        <label className="create-post-label">
          Cover Image
          <Button
            component="label"
            variant="outlined"
            startIcon={<CloudUploadIcon />}
            style={{ width: "100%" }}
          >
            Upload file
            <VisuallyHiddenInput type="file" onChange={coverHandler} />
          </Button>
        </label>

        <label className="create-post-label">
          Post Heading
          <input
            type="text"
            placeholder="Enter post heading"
            onChange={(e) => setPostHead(e.target.value)}
            value={postHead}
          />
        </label>

        <label className="create-post-label">
          Category
          <input
            type="text"
            placeholder="Enter Category"
            onChange={(e) => setPostCategory(e.target.value)}
            value={postCategory}
          />
        </label>

        <label className="create-post-label">Content</label>
        <ReactQuill
          theme={"snow"}
          onChange={handleChange}
          value={editorHtml}
          modules={CreatePost.modules}
          formats={CreatePost.formats}
          bounds={".app"}
          placeholder={"Write something..."}
        />
        {status === "loading" ? (
          <LoadingButton
            size="small"
            // onClick={handleClick}
            loading={true}
            variant="outlined"
            disabled
          >
            <span>disabled</span>
          </LoadingButton>
        ) : (
          <button
            className="button-primary"
            style={{ width: "100%", marginTop: "10px" }}
            onClick={handleSubmit}
          >
            ADD POST
          </button>
        )}
      </div>
    </>
  );
};

CreatePost.propTypes = {
  placeholder: PropTypes.string,
};

CreatePost.modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  imageUploader: {
    upload: (file) => cloudinaryUploader(file),
  },
  clipboard: {
    matchVisual: false,
  },
};

CreatePost.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "video",
];

export default CreatePost;
