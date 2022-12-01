import React, { useEffect, useState, useContext } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { Link, withRouter } from "react-router-dom"
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Form,
  Input,
  Label,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
  Row,
} from "reactstrap"
import classnames from "classnames"
import { isEmpty, map } from "lodash"

//context
import { PageContext } from "store/context"

//utils
import { formatNumber } from "utils"

//preloader
import { Preloader } from "utils"

//Import Star Ratings
import StarRatings from "react-star-ratings"

// RangeSlider
import Nouislider from "nouislider-react"
import "nouislider/distribute/nouislider.css"

//Import Product Images
import { productImages } from "assets/images/product"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"

//Import data
import { discountData, productsData } from "common/data"

//Import actions
import { getProducts as onGetProducts, getallProducts } from "store/e-commerce/actions"

//redux
import { useSelector, useDispatch } from "react-redux"

const EcommerceProducts = props => {
  const dispatch = useDispatch();

  //context for getting the current page
  const { currentPage } = useContext(PageContext)

  const { products, loading } = useSelector(state => ({
    products: state.ecommerce.products,
    loading: state.ecommerce.loading
  }))

  const { history } = props
  // eslint-disable-next-line no-unused-vars
  const [FilterClothes, setFilterClothes] = useState([
    { id: 1, name: "T-shirts", link: "#" },
    { id: 2, name: "Shirts", link: "#" },
    { id: 3, name: "Jeans", link: "#" },
    { id: 4, name: "Jackets", link: "#" },
  ])
  const [productList, setProductList] = useState([])
  const [activeTab, setActiveTab] = useState("1")
  // eslint-disable-next-line no-unused-vars
  const [discountDataList, setDiscountDataList] = useState([])
  const [filters, setFilters] = useState({
    discount: [],
    price: { min: 0, max: 500 },
  })
  const [page, setPage] = useState(1)
  // eslint-disable-next-line no-unused-vars
  const [totalPage, setTotalPage] = useState(1)

  useEffect(() => {
    setProductList(products)
    setDiscountDataList(discountData)
  }, [products, discountData])

  useEffect(() => {
    // dispatch(onGetProducts())
  }, [dispatch])

  useEffect(() => {
    if (!isEmpty(products)) setProductList(products)
  }, [products])

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const onSelectDiscount = e => {
    const { value, checked } = e.target
    const { discount } = filters
    var existing = [...discount]
    if (checked) {
      existing = [...discount, value]
      setFilters({
        ...filters,
        discount: existing,
      })
    } else {
      const unCheckedItem = discount.find(item => item === value)
      if (unCheckedItem) {
        existing = discount.filter(item => item !== value)
      }
    }
    setFilters({
      ...filters,
      discount: existing,
    })
    // onFilterProducts(value, checked)

    let filteredProducts = productsData
    if (checked && parseInt(value) === 0) {
      filteredProducts = productsData.filter(product => product.offer < 10)
    } else if (checked && existing.length > 0) {
      filteredProducts = productsData.filter(
        product => product.offer >= Math.min(...existing)
      )
    }
    setProductList(filteredProducts)
  }
  const onUpdate = (render, handle, value) => {
    setProductList(
      productsData.filter(
        product => product.newPrice >= value[0] && product.newPrice <= value[1]
      )
    )
  }

  const [ratingvalues, setRatingvalues] = useState([])
  /*
  on change rating checkbox method
  */
  const onChangeRating = value => {
    setProductList(productsData.filter(product => product.rating >= value))

    var modifiedRating = [...ratingvalues]
    modifiedRating.push(value)
    setRatingvalues(modifiedRating)
  }

  const onSelectRating = value => {
    setProductList(productsData.filter(product => product.rating === value))
  }

  const onUncheckMark = (value) => {
    var modifiedRating = [...ratingvalues]
    const modifiedData = (modifiedRating || []).filter(x => x !== value)
    /*
    find min values
    */
    var filteredProducts = productsData
    if (modifiedData && modifiedData.length && value !== 1) {
      var minValue = Math.min(...modifiedData)
      if (minValue && minValue !== Infinity) {
        filteredProducts = productsData.filter(
          product => product.rating >= minValue
        )
        setRatingvalues(modifiedData)
      }
    } else {
      filteredProducts = productsData
    }
    setProductList(filteredProducts)
  }

  const handlePageClick = page => {
    setPage(page)
  }


  //hook to fetch all products on page mount
  useEffect(() => {
    if (currentPage) {
      let pageData = ''
      switch (currentPage) {
        case 'Swap':
          pageData = { availableForSwap: 3 }
          break;

        case 'Cash':
          pageData = { availableForSwap: 1 }
          break;

        case 'Cash or Swap':
          pageData = { availableForSwap: 2 }
          break;

        default: pageData = ''
      }

      dispatch(getallProducts({ data: pageData }))
    } else {
      dispatch(getallProducts({ data: {} }));
    }
  }, [dispatch, currentPage])

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Online Farms</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Online Farms" breadcrumbItem="Products" />
          <Row>

            <Col lg="12">
              <Row className="mb-3">
                <Col xl="4" sm="6">
                  <div className="mt-2">
                    <h5>All</h5>
                  </div>
                </Col>
                <Col lg="8" sm="6">
                  <Form className="mt-4 mt-sm-0 float-sm-end d-flex align-items-center">
                    <div className="search-box me-2">
                      <div className="position-relative">
                        <Input
                          type="text"
                          className="form-control border-0"
                          placeholder="Search..."
                        />
                        <i className="bx bx-search-alt search-icon" />
                      </div>
                    </div>
                    <Nav className="product-view-nav" pills>

                    </Nav>
                  </Form>
                </Col>
              </Row>
              <Row>

                {loading ? (
                  <>
                    {Array(6).fill('_').map((_, idx) => (
                      <Col xl="4" sm="6" key={"_col_" + idx}>
                        <Preloader height={300} className='mb-3' />
                      </Col>
                    )
                    )}
                  </>
                )
                  :
                  (
                    <>
                      {!isEmpty(productList) &&
                        productList.map((product, key) => (
                          <Col xl="4" sm="6" key={"_col_" + key}>
                            <Card

                            >
                              <CardBody>
                                <div className="product-img position-relative">


                                  <img
                                    src={product.images[0].original}
                                    alt=""
                                    style={{
                                      height: 300,

                                    }}
                                    className="img-fluid"
                                  />
                                </div>
                                <div className="mt-4 text-center">
                                  <h5 className="mb-3 text-truncate">
                                    <Link
                                      to={"/ecommerce-product-detail/" + product._id}
                                      className="text-dark"
                                    >
                                      {product.name}
                                      <br></br>
                                      <br></br>

                                      {product.category}{" "}

                                    </Link>
                                  </h5>
                                  <div className="text-muted mb-3">
                                    <StarRatings
                                      rating={3}
                                      starRatedColor="#F1B44C"
                                      starEmptyColor="#2D363F"
                                      numberOfStars={5}
                                      name="rating"
                                      starDimension="14px"
                                      starSpacing="3px"
                                    />
                                  </div>
                                  <h5 className="my-0">

                                    <b>${formatNumber(product.price)}</b>
                                  </h5>
                                </div>
                              </CardBody>
                            </Card>
                          </Col>
                        ))}
                    </>
                  )
                }
              </Row>

              <Row>
                <Col lg="12">
                  <Pagination className="pagination pagination-rounded justify-content-end mb-2">
                    <PaginationItem disabled={page === 1}>
                      <PaginationLink
                        previous
                        href="#"
                        onClick={() => handlePageClick(page - 1)}
                      />
                    </PaginationItem>
                    {map(Array(totalPage), (item, i) => (
                      <PaginationItem active={i + 1 === page} key={i}>
                        <PaginationLink
                          style={{ backgroundColor: 'rgb(50, 255, 0)' }}

                          onClick={() => handlePageClick(i + 1)}
                          href="#"
                        >
                          {i + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                    <PaginationItem disabled={page === totalPage}>
                      <PaginationLink
                        next
                        href="#"
                        onClick={() => handlePageClick(page + 1)}
                      />
                    </PaginationItem>
                  </Pagination>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceProducts.propTypes = {
  products: PropTypes.array,
  history: PropTypes.object,
  onGetProducts: PropTypes.func,
}

export default withRouter(EcommerceProducts)
