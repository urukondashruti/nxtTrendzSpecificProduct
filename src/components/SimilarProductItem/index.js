// Write your code here
import './index.css'

const Products = props => {
  const {Items2} = props
  const {
    availability,
    brand,
    description,
    imageUrl,
    price,
    rating,
    style,
    title,
    totalReviews,
  } = Items2

  return (
    <li className="con10">
      <img src={imageUrl} className="img10" alt="similar product" />
      <h1 className="head">{title}</h1>
      <p>By {brand}</p>
      <div className="div14">
        <p>Rs {price}/- </p>
        <div className="backs">
          <p>{rating}</p>
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="size4"
          />
        </div>
      </div>
    </li>
  )
}

export default Products
