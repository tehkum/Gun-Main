import "./CategoryBoc.css";

// eslint-disable-next-line react/prop-types
export default function CategoryBox({categoryName, isTrue}){

    return <a className="category-box"  href={isTrue ? `#${categoryName}`: `/youtube-vids`}>
        <img src="https://picsum.photos/200/300" alt=".." />
        <p>{categoryName}</p>
    </a>
}