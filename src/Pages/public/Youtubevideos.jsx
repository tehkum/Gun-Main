import { useContext } from "react"
import { useProducts } from "../../Context/ProductProvider"
import "./youtube.css";

export default function YoutubeVids(){
    const { youtubeVideos } = useContext(useProducts);

    return <div className="product-display">
    {youtubeVideos.map((items) => {
      const { _id, link, title } = items;
      return (
        <div key={_id}>
          <iframe
          className="vid-box"
            width="420"
            height="315"
            src={link}
          ></iframe>
          <h2>{title}</h2>
        </div>
      );
    })}
  </div>
}