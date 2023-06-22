// Write your code here
import Loader from 'react-loader-spinner'

import Cookies from 'js-cookie'

import {Component} from 'react'

import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'

import Header from '../Header'

import Products from '../SimilarProductItem'

import './index.css'

const statusList = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class ProductItemDetails extends Component {
  state = {
    object: {},
    list7: [],
    status: statusList.initial,
    count: 1,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  getProductDetails = async () => {
    this.setState({status: statusList.loading})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(`https://apis.ccbp.in/products/${id}`, options)
    const result = await response.json()
    if (response.ok === true) {
      const data1 = {
        id: result.id,
        availability: result.availability,
        brand: result.brand,
        description: result.description,
        imageUrl: result.image_url,
        price: result.price,
        rating: result.rating,
        style: result.style,
        title: result.title,
        totalReviews: result.total_reviews,
      }
      const list5 = result.similar_products.map(each => ({
        id: each.id,
        availability: each.availability,
        brand: each.brand,
        description: each.description,
        imageUrl: each.image_url,
        price: each.price,
        rating: each.rating,
        style: each.style,
        title: each.title,
        totalReviews: each.total_reviews,
      }))
      this.setState({object: data1, list7: list5, status: statusList.success})
    }
    if (result.status_code === 404) {
      this.setState({status: statusList.failure})
    }
  }

  onAdd = () => {
    const {count} = this.state
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  onSub = () => {
    const {count} = this.state
    if (count > 1) {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  getDetails = () => {
    const {object, list7, count} = this.state
    console.log(list7)
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
    } = object

    return (
      <div>
        <Header />
        <div className="div11">
          <div className="con5">
            <div>
              <img src={imageUrl} className="img9" alt="product" />
            </div>
            <div className="con13">
              <h1>{title}</h1>
              <p>Rs {price}/- </p>
              <div className="div7">
                <div className="backs">
                  <p>{rating}</p>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                    alt="star"
                    className="size4"
                  />
                </div>
                <p>{totalReviews}Reviews</p>
              </div>
              <p>{description}</p>
              <p>Available:{availability}</p>
              <p>Brand:{brand}</p>
              <hr />
              <div className="div1">
                <button
                  type="button"
                  className="but2"
                  data-testid="minus"
                  onClick={this.onSub}
                >
                  <BsDashSquare />
                </button>
                <p>{count}</p>
                <button
                  type="button"
                  className="but2"
                  data-testid="plus"
                  onClick={this.onAdd}
                >
                  <BsPlusSquare />
                </button>
              </div>
              <button type="button" className="button1">
                ADD TO CART
              </button>
            </div>
          </div>
          <ul className="list5">
            {list7.map(each => (
              <Products Items2={each} key={each.id} />
            ))}
          </ul>
        </div>
      </div>
    )
  }

  onClickContinue = () => {
    const {history} = this.props
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      history.push('/products')
    }
  }

  getFailure = () => (
    <div className="div16">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
        alt="failure view"
        className="size9"
      />
      <h1>Product Not Found</h1>
      <button type="button" onClick={this.onClickContinue}>
        Continue Shopping
      </button>
    </div>
  )

  getLoading = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />
    </div>
  )

  render() {
    const {object, list7, status} = this.state
    switch (status) {
      case statusList.success:
        return this.getDetails()
      case statusList.failure:
        return this.getFailure()
      case statusList.loading:
        return this.getLoading()
      default:
        return null
    }
  }
}

export default ProductItemDetails
