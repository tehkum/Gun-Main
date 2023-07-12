import "./CategoryBoc.css";

// eslint-disable-next-line react/prop-types
export default function CategoryBox({categoryName}){
    return <div className="category-box">
        <img src="https://picsum.photos/200/300" alt=".." />
        <h3><a style={{color: "black", textDecoration: "none"}} href={`#${categoryName}`}>{categoryName}</a></h3>
    </div>
}