import { useContext } from "react"
import { useProducts } from "../../Context/ProductProvider"

export default function YoutubeVids(){
    const { youtubeVideos } = useContext(useProducts);

    return <div className="product-display">
    {youtubeVideos.map((items) => {
      const { _id, link } = items;
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
}