import "./CategoryBoc.css";

// eslint-disable-next-line react/prop-types
export default function CategoryBox({categoryName}){

    return <a className="category-box"  href={`#${categoryName}`}>
        <img src="https://picsum.photos/200/300" alt=".." />
        <h3>{categoryName}</h3>
    </a>
}