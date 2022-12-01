import React, { useEffect, useState, useContext } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Nav,
  NavItem,
  NavLink,
  Row,
  TabContent,
  Table,
  TabPane,
} from "reactstrap";
import classnames from "classnames";
import { isEmpty } from "lodash";

import EcommerceOrdersModal from "../EcommerceOrders/EcommerceOrdersModal";

import { EditProduct } from "./EditProduct";

//utils
import { formatNumber } from "utils";

//Import Star Ratings
import StarRatings from "react-star-ratings";

import { useHistory } from "react-router-dom";

//preloader
import { Preloader } from "utils";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

//Import actions
import {
  getProductDetail as onGetProductDetail,
  getProductComments,
  onAddReply as onAddReplyAction,
  onAddComment as onAddCommentAction,

  getOneProduct,
  getAllReviews
} from "store/actions"
import RecentProducts from "./RecentProducts"
import Reviews from "./Reviews"

//redux
import { useSelector, useDispatch } from "react-redux"
import { PageContext } from "store/context";

const EcommerceProductDetail = props => {
  const dispatch = useDispatch()

  const { product, productComments, loading, reviews } = useSelector(state => ({
    product: state.ecommerce.product,
    productComments: state.ecommerce.productComments,
    reviews: state.ecommerce.reviews,
    loading: state.ecommerce.loading
  }))


  const { setCurrentPage } = useContext(PageContext)
  const history = useHistory();
  const [modal1, setModal1] = useState(false);
  const toggleViewModal = () => setModal1(!modal1);
  const [isOpen, setIsOpen] = useState(false);


  const toggle = () => setIsOpen(!isOpen)

  const {
    match: { params },
  } = props
  const [activeTab, setActiveTab] = useState("1")



  useEffect(() => {
    dispatch(getOneProduct({ productID: params.id }));
    dispatch(getAllReviews(({ UserID: params.id })));
  }, [dispatch, reviews.length])

  const toggleTab = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab)
    }
  }

  const imageShow = (img, id) => {
    const expandImg = document.getElementById("expandedImg" + id)
    expandImg.src = img
  }

  useEffect(() => {
    dispatch(getProductComments())
  }, [dispatch])

  const [comments, setComments] = useState([])
  useEffect(() => {
    if (productComments) {
      setComments(productComments)
    }
  }, [productComments])

  const onClickReply = commentId => {
    const modifiedComments = [...comments]

    const commentIdx = (modifiedComments || []).findIndex(
      comment => comment.commentId.toString() === commentId.toString()
    )
    if (commentIdx > -1) {
      if (modifiedComments[commentIdx]) {
        modifiedComments[commentIdx]["showAddComment"] = true

        for (let i = 0; i < (modifiedComments || []).length; i++) {
          if (i !== commentIdx) {
            modifiedComments[i]["showAddComment"] = false
          }
        }
      } else {
        modifiedComments[commentIdx]["showAddComment"] = false
      }
      setComments(modifiedComments)
    }
  }

  const handleBackClicked = () => {
    setCurrentPage('All');
    history.push('/ecommerce-products')
  }

  const onCancelReply = commentId => {
    if (commentId) {
      const modifiedComments = [...comments]
      for (let i = 0; i < (modifiedComments || []).length; i++) {
        modifiedComments[i]["showAddComment"] = false
      }
      setComments(modifiedComments)
    }
  }

  const onAddReply = (commentId, replyText) => {
    if (commentId) {
      const productId = params.id || 1
      dispatch(onAddReplyAction(commentId, productId, replyText))
    }
  }

  const onAddComment = commentText => {
    const productId = params.id || 1
    dispatch(onAddCommentAction(productId, commentText))
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <EcommerceOrdersModal
          currentPage={"Delete"}
          data={{}}
          isOpen={modal1}
          toggle={toggleViewModal}
        />
        <EditProduct data={product} isOpen={isOpen} toggle={toggle} />
        <MetaTags>
          <title>
            Product Detail | Swagplug
          </title>
        </MetaTags>
        <Container fluid>
        <i onClick={handleBackClicked} style={{fontSize: 20, cursor: 'pointer'}} className='bx bx-left-arrow-alt' ></i>
          <Breadcrumbs title="Product" breadcrumbItem="Product Detail" />

          {loading ? (
            <Row>
              <Col md='2'>
                <Preloader height={200} className='mb-3' />
              </Col>
              <Col md='5' height={200} className='mb-3'>
                <Preloader className='mb-3' />
                <Preloader height={40} className='mb-3' count={7} />
              </Col>
              <Col md='5' height={200} className='mb-3'>
                <Preloader className='mb-3' />
                <Preloader height={70} className='mb-3' count={3} />
              </Col>
            </Row>
          )
            :
            (
              <>
                {!isEmpty(product) && (
                  <Row>
                    <Col>
                      <Card>
                        <CardBody>
                          <Row>
                            <Col xl="6">
                              <div className="product-detai-imgs">
                                <Row>
                                  <Col md="2" xs="3">
                                    <Nav className="flex-column" pills>
                                      <NavItem>
                                        <NavLink
                                          className={classnames({
                                            active: activeTab === "1",
                                          })}
                                          onClick={() => {
                                            toggleTab("1")
                                          }}
                                        >
                                          <img
                                            src={product.images[0]?.original}
                                            alt=""
                                            onClick={() => {
                                              imageShow(
                                                product.images[0]?.original,
                                                1
                                              )
                                            }}
                                            className="img-fluid mx-auto d-block rounded"
                                          />
                                        </NavLink>
                                      </NavItem>
                                      <NavItem>
                                        <NavLink
                                          className={classnames({
                                            active: activeTab === "2",
                                          })}
                                          onClick={() => {
                                            toggleTab("2")
                                          }}
                                        >
                                          <img
                                            src={product.images[1]?.original}
                                            alt=""
                                            onClick={() => {
                                              imageShow(
                                                product.images[1]?.original,
                                                2
                                              )
                                            }}
                                            className="img-fluid mx-auto d-block rounded"
                                          />
                                        </NavLink>
                                      </NavItem>
                                      <NavItem>
                                        <NavLink
                                          className={classnames({
                                            active: activeTab === "3",
                                          })}
                                          onClick={() => {
                                            toggleTab("3")
                                          }}
                                        >
                                          <img
                                            src={product.images[2]?.original}
                                            alt=""
                                            onClick={() => {
                                              imageShow(
                                                product.images[2]?.original,
                                                3
                                              )
                                            }}
                                            className="img-fluid mx-auto d-block rounded"
                                          />
                                        </NavLink>
                                      </NavItem>
                                    </Nav>
                                  </Col>
                                  <Col md={{ size: 7, offset: 1 }} xs="9">
                                    <TabContent activeTab={activeTab}>
                                      {
                                        product?.images?.map((data, idx) => (
                                          <TabPane key={idx} tabId={(Number(idx) + 1).toString()}>
                                            <div>
                                              <img
                                                src={data?.original}
                                                alt=""
                                                style={{ height: 300 }}
                                                id={`expandedImg${Number(idx) + 1}`}
                                                className="img-fluid"
                                              />
                                            </div>
                                          </TabPane>
                                        ))
                                      }

                                    </TabContent>

                                  </Col>

                                </Row>
                              </div>
                            </Col>

                            <Col xl="4">
                              <div className="mt-4 mt-xl-3">
                                <Link to="#" className="text-primary">
                                  {product.category}
                                </Link>
                                <h4 className="mt-1 mb-3">{product.name}</h4>

                                <div className="text-muted float-start me-3">
                                  <StarRatings
                                    rating={4}
                                    starRatedColor="#F1B44C"
                                    starEmptyColor="#2D363F"
                                    numberOfStars={5}
                                    name="rating"
                                    starDimension="14px"
                                    starSpacing="3px"
                                  />
                                </div>
                                <p className="text-muted mb-4">
                                  ( {product.reviews} Customers Review )
                                </p>

                                {!!product.isOffer && (
                                  <h6 className="text-success text-uppercase">
                                    {product.offer} % Off
                                  </h6>
                                )}
                                <h5 className="mb-4">
                                  Price :{" "}
                                  <span className="text-muted me-2">
                                    {/* <del>${product.oldPrice} USD</del> */}
                                  </span>{" "}
                                  <b>${formatNumber(product.price)} USD</b>
                                </h5>
                                <p className="text-muted mb-4">
                                  {product.about}
                                </p>
                                <Row className="mb-3">
                                  <Col md="6">
                                    {product.features &&
                                      product.features.map((item, i) => (
                                        <div key={i}>
                                          <p className="text-muted">
                                            <i
                                              className={classnames(
                                                item.icon,
                                                "font-size-16 align-middle text-primary me-2"
                                              )}
                                            />
                                            {item.type && `${item.type}: `}
                                            {item.value}
                                          </p>
                                        </div>
                                      ))}
                                  </Col>
                                  <Col md="6">
                                    {product.features &&
                                      product.features.map((item, i) => (
                                        <div key={i}>
                                          <p className="text-muted">
                                            <i
                                              className={classnames(
                                                item.icon,
                                                "font-size-16 align-middle text-primary me-2"
                                              )}
                                            />
                                            {item.type && `${item.type}:`}
                                            {item.value}
                                          </p>
                                        </div>
                                      ))}
                                  </Col>
                                </Row>

                                {/* <div className="product-color">
                            <h5 className="font-size-15">Color :</h5>
                            {product.colorOptions &&
                              product.colorOptions.map((option, i) => (
                                <Link to="#" className="active" key={i}>
                                  <div className="product-color-item border rounded">
                                    <img
                                      src={productImages[option.image]}
                                      alt=""
                                      className="avatar-md"
                                    />
                                  </div>
                                  <p>{option.color}</p>
                                </Link>
                              ))}
                          </div> */}
                              </div>
                            </Col>
                            <Col xs='2'>
                              <Row>
                                <Col>
                                  <Button
                                    onClick={toggleViewModal}
                                    color="danger"
                                  >
                                    <i style={{ fontSize: 20 }} className='bx bxs-trash'></i>
                                  </Button>
                                </Col>
                                <Col>
                                  <Button
                                    color="primary"
                                    onClick={toggle}
                                  >
                                    <i style={{ fontSize: 20 }} className='bx bxs-edit-alt' ></i>
                                  </Button>
                                </Col>
                              </Row>

                            </Col>
                          </Row>

                          <div className="mt-5">
                            <h5 className="mb-3">Seller :</h5>

                            <div className="table-responsive">
                              <Table className="table mb-0 table-bordered">
                                <tbody>
                                  {product.seller &&
                                    <>
                                      <tr>
                                        <th
                                          scope="row"
                                          style={{ width: "400px" }}
                                          className={"text-capitalize"}
                                        >
                                          Name
                                        </th>
                                        <td>{product.seller.firstName.concat(' ', product.seller.lastName)}</td>
                                      </tr>
                                      <tr>
                                        <th
                                          scope="row"
                                          style={{ width: "400px" }}
                                          className={"text-capitalize"}
                                        >
                                          Email
                                        </th>
                                        <td>{product.seller.email}</td>
                                      </tr>
                                      <tr>
                                        <th
                                          scope="row"
                                          style={{ width: "400px" }}
                                          className={"text-capitalize"}
                                        >
                                          Address
                                        </th>
                                        <td>{product.seller.address}</td>
                                      </tr>
                                      <tr>
                                        <th
                                          scope="row"
                                          style={{ width: "400px" }}
                                          className={"text-capitalize"}
                                        >
                                          Phone
                                        </th>
                                        <td>{product.seller.phone}</td>
                                      </tr>
                                      <tr>
                                        <th
                                          scope="row"
                                          style={{ width: "400px" }}
                                          className={"text-capitalize"}
                                        >
                                          Sales
                                        </th>
                                        <td>{product.seller.sales}</td>
                                      </tr>
                                      <tr>
                                        <th
                                          scope="row"
                                          style={{ width: "400px" }}
                                          className={"text-capitalize"}
                                        >
                                          Posts
                                        </th>
                                        <td>{product.seller.posted}</td>
                                      </tr>
                                    </>
                                  }
                                </tbody>
                              </Table>
                            </div>
                          </div>
                          <Reviews
                            comments={[...comments]}
                            reviews={reviews}
                            productId={params.id || 1}
                            onClickReply={onClickReply}
                            onCancelReply={onCancelReply}
                            onAddReply={onAddReply}
                            onAddComment={onAddComment}
                          />
                        </CardBody>
                      </Card>
                    </Col>
                  </Row>
                )}
              </>
            )
          }
          {/* <RecentProducts recentProducts={product.recentProducts} /> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceProductDetail.propTypes = {
  product: PropTypes.object,
  match: PropTypes.any,
  onGetProductDetail: PropTypes.func,
}

export default EcommerceProductDetail
