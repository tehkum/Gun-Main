import "./CategoryBoc.css";
import { katori, dress, tailoring, yt, sewingClass } from "../img/index";

// eslint-disable-next-line react/prop-types
export default function CategoryBox({ categoryName, isTrue }) {
  const catType =
    categoryName === "Blouse Paper Cutting Pattern"
      ? katori
      : categoryName === "Dress Paper Cutting Pattern"
      ? dress
      : categoryName === "Tailoring Material"
      ? tailoring
      : categoryName === "Sewing-class"
      ? sewingClass
      : "https://picsum.photos/200/300";

  return (
    <a
      className="category-box"
      href={
        isTrue && categoryName === "Sewing-class"
          ? `/Sewing-class`
          : isTrue
          ? `#${categoryName}`
          : `/youtube-vids`
      }
    >
      <img src={isTrue ? catType : yt} alt=".." />
      <p>{categoryName}</p>
    </a>
  );
}
