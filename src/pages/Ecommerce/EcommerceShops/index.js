import React, { useEffect } from "react"
import MetaTags from "react-meta-tags"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { Col, Container, Row } from "reactstrap"
import { map } from "lodash"

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb"


//preloader
import { Preloader } from "utils"


//Import Card
import CardShop from "./CardShop"
import { getShops as onGetShops } from "store/e-commerce/actions"
import { getAllUsers } from "store/e-commerce/actions"

//redux
import { useSelector, useDispatch } from "react-redux";

const EcommerceShops = props => {
  const dispatch = useDispatch()

  const { shops, users, loading } = useSelector(state => ({
    shops: state.ecommerce.shops,
    users: state.ecommerce.users,
    loading: state.ecommerce.loading
  }))

  console.log('All users', users)


  useEffect(() => {
    dispatch(onGetShops())
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch])


  const randomColor = () => {
    const red = Math.floor(Math.random() * 100);
    const blue = Math.floor(Math.random() * 100);
    const green = Math.floor(Math.random() * 100);

    return `rgba(${red}, ${blue}, ${green}, 0.8)`

  }

  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>Online Farms</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Online Farms" breadcrumbItem="Users" />
          <Row>
            {
              loading
                ?
                (
                  Array(6).fill('_').map((_, i) => (
                    <Col key={`preloader-${i}`} xl="4" sm="6">
                      <Row>
                        <Col xl="12">
                          <Preloader className='mb-3' height={200} />
                        </Col>
                      </Row>
                    </Col>

                  )
                  )
                )
                :
                (
                  <>
                    {map(users, (user, key) => {
                      const color = randomColor();
                      return (
                        <CardShop user={user} color={color} key={"_user_" + key} />
                      )
                    })}
                  </>
                )

            }


          </Row>
          <Row>
            <Col xs="12">
              {/* <div className="text-center my-3">
                <Link to="#" className="text-success">
                  <i className="bx bx-loader bx-spin font-size-18 align-middle me-2" />
                  Load more
                </Link>
              </div> */}
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  )
}

EcommerceShops.propTypes = {
  shops: PropTypes.array,
  onGetShops: PropTypes.func,
}

export default EcommerceShops;
