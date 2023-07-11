import "./CategoryBoc.css";

export default function CategoryBox({categoryName, CategoryImg}){
    return <div className="category-box">
        <img src="https://picsum.photos/200/300" alt=".." />
        <h3><a href={`#${categoryName}`}>{categoryName}</a></h3>
    </div>
}