import PropTypes from "prop-types"
import React, { useEffect } from "react"
import { Col, Card, CardBody } from "reactstrap"

//skeleton preloader animation
import { Preloader } from "utils";


const MiniWidget = ({ reports, loading }) => {

  return (
    <React.Fragment>
      {reports.map((report, key) => (
        <Col sm="6" key={key}>
          <Card>
            {
              loading
                ? <Preloader className='mb-3' />
                : <CardBody>
                  <div className="d-flex align-items-center mb-3">
                    <div className="avatar-xs me-3">
                      <span style={{backgroundColor: 'rgba(50, 255, 0, 0.5)'}} className="avatar-title rounded-circle bg-soft text-primary font-size-18">
                        <i style={{color: '#fff'}} className={report.icon} />
                      </span>
                    </div>
                    <h5 className="font-size-14 mb-0">{report.title}</h5>
                  </div>
                  <div className="text-muted">
                    <h4>
                      {report?.value}{" "}
                    </h4>

                  </div>
                </CardBody>
            }

          </Card>
        </Col>
      ))}
    </React.Fragment>
  )
}

MiniWidget.propTypes = {
  reports: PropTypes.array,
  loading: PropTypes.bool
}

export default MiniWidget
