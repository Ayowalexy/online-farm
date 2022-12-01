import React, { useState, useEffect } from "react"
import {
  Row,
  Col,
  Card,
  CardBody,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap"

import PropTypes from "prop-types"

//Import Images
import avatar1 from "../../assets/images/users/avatar-1.jpg"

//utils
import { getCurrentUser } from "utils"

function CardUser({data}) {

  const [settingsMenu, setSettingsMenu] = useState(false)
  //Setting Menu
  const toggleSettings = () => {
    setSettingsMenu(settingsMenu)
  }

  //user details
  const [userdetails, setUserDetails] = useState({
    name: "",
    role: "",
    image: ""
  })


  //useEffect hoot to update user details on login
  useEffect(() => {
      const user = getCurrentUser();
      setUserDetails({
        ...userdetails,
        name: user?.full_name,
        role: user.role,
      })
  }, [])


  return (
    <React.Fragment>
      <Row>
        <Col lg="12">
          <Card>
            <CardBody>
              <Row>
                <Col lg="4">
                  <div className="d-flex">
                    <div className="me-3">
                      <img
                        src={userdetails.image}
                        alt=""
                        className="avatar-md rounded-circle img-thumbnail"
                      />
                    </div>
                    <div className="flex-grow-1 align-self-center">
                      <div className="text-muted">
                        <p className="mb-2">Welcome to Online Farms</p>
                        <h5 className="mb-1 text-capitalize">{userdetails.name}</h5>
                        <p className="mb-0 text-capitalize">{userdetails.role}</p>
                      </div>
                    </div>
                  </div>
                </Col>

                <Col lg="8" className="align-self-center">
                  <div className="text-lg-center mt-4 mt-lg-0">
                    <Row>
                      <Col xs="3">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                            Total Products
                          </p>
                          <h5 className="mb-0">{data?.TotalProducts || 0}</h5>
                        </div>
                      </Col>
                      <Col xs="3">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                          Total Sales

                          </p>
                          <h5 className="mb-0">
                            {data?.UserStats[0]?.totalSales || 0 }
                          </h5>
                        </div>
                      </Col>
                      <Col xs="3">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                          Total Orders

                          </p>
                          <h5 className="mb-0">{data?.TotalOrders || 0}</h5>
                        </div>
                      </Col>
                      <Col xs="3">
                        <div>
                          <p className="text-muted text-truncate mb-2">
                          Total Reports

                          </p>
                          <h5 className="mb-0">
                            {data?.UserStats[0]?.totalReports || 0}
                          </h5>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Col>

               
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  )
}


CardUser.propTypes = {
  data: PropTypes.object
}

export default CardUser
