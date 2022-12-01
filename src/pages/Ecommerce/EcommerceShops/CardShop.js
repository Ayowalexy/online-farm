import PropTypes from 'prop-types'
import React from "react"
import { Link } from "react-router-dom"
import { Card, Col, Row } from "reactstrap"
import { formatNumber } from 'utils'

const CardShop = props => {
  const { user, color } = props;
  const name = user.firstName
  const nameIcon = name.charAt(0)
  return (
    <React.Fragment>
      <Col xl="4" sm="6">
        <Card>
          <Row>
            <Col xl="5">
              <div className="text-center p-4 border-end">
                <div className="avatar-sm mx-auto mb-3 mt-1">
                  <span
                    className={
                      "avatar-title rounded-circle bg-soft bg-" +
                      " primary text-" +
                      " font-size-16"
                    }

                    style={{backgroundColor: color}}
                  >
                    {nameIcon}
                  </span>
                </div>
                <h6 className="text-truncate">{user?.lastName}</h6>
              </div>
            </Col>

            <Col xl="7">
              <div className="p-4 text-center text-xl-start">
                <Row>
                  <Col xs="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">USDT</p>
                      <h6>${formatNumber(user?.usdtWallet[0]?.balance) || 0}</h6>
                    </div>
                  </Col>
                  <Col xs="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">
                        Wallet
                      </p>
                      <h6>${formatNumber(user?.wallet[0]?.balance) || 0}</h6>
                    </div>
                  </Col>
                </Row>
                <div className="mt-4">
                <Row>
                  <Col xs="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">Reports</p>
                      <h6>{user.reports || 0}</h6>
                    </div>
                  </Col>
                  <Col xs="6">
                    <div>
                      <p className="text-muted mb-2 text-truncate">
                       Sales
                      </p>
                      <h6>{user?.sales || 0}</h6>
                    </div>
                  </Col>
                  </Row>
                </div>

              </div>
            </Col>
          </Row>
        </Card>
      </Col>
    </React.Fragment>
  )
}

CardShop.propTypes = {
  user: PropTypes.object,
  color: PropTypes.string
}

export default CardShop
