import React from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
  Spinner
} from "reactstrap"
import img7 from "../../../assets/images/product/img-7.png"
import img4 from "../../../assets/images/product/img-4.png"
import moment from "moment"



const EcommerceOrdersModal = props => {
  const { isOpen, toggle, data, loading } = props
  return (
    <Modal
      isOpen={isOpen}
      role="dialog"
      autoFocus={true}
      centered={true}
      className="exampleModal"
      tabIndex="-1"
      toggle={toggle}
    >
      <div className="modal-content">
        {

          <>
            <ModalHeader toggle={toggle}>
              User Details
            </ModalHeader>
            <ModalBody>

              {
                loading
                  ?
                  (
                    <div className="d-flex justify-content-center align-items-center">
                      <Spinner size="sm">
                        Loading...
                      </Spinner>

                    </div>
                  )
                  :
                  (
                    <>
                      <p className="mb-2">
                        Name: <span className="text-primary">{data.firstName}{" "}{data.lastName}</span>
                      </p>
                      <p className="mb-4">
                        Address: <span className="text-primary">{data.address}</span>
                      </p>
                      <p className="mb-2">
                        Email: <span className="text-primary">{data.email}</span>
                      </p>
                      <p className="mb-4">
                        Followers: <span className="text-primary">{data.followers?.length}</span>
                      </p>
                      <p className="mb-2">
                        Following: <span className="text-primary">{data.following?.length}</span>
                      </p>
                      <p className="mb-4">
                        Verified: <span className="text-primary">{data.isVerified ? 'Yes' : 'No'}</span>
                      </p>
                      <p className="mb-2">
                        Phone: <span className="text-primary">{data.phone}</span>
                      </p>
                      <p className="mb-4">
                        Posted: <span className="text-primary">{data.posted}</span>
                      </p>
                      <p className="mb-4">
                        Referral ID: <span className="text-primary">{data.referralId}</span>
                      </p>
                      <p className="mb-2">
                        Reports: <span className="text-primary">{data.reports}</span>
                      </p>
                      <p className="mb-4">
                        Role: <span className="text-primary">{data.role}</span>
                      </p>
                      <p className="mb-4">
                        Sales: <span className="text-primary">{data.sales}</span>
                      </p>
                      <p className="mb-2">
                        State <span className="text-primary">{data.state}</span>
                      </p>
                      <p className="mb-4">
                        Created At: <span className="text-primary">{moment(data.createdAt).format('ll')}</span>
                      </p>
                    </>

                  )
              }

            </ModalBody>
          </>
        }

        <ModalFooter>
          <Button type="button" color="danger" onClick={toggle}>
            Close
          </Button>
        </ModalFooter>
      </div>
    </Modal>
  )
}

EcommerceOrdersModal.propTypes = {
  toggle: PropTypes.func,
  isOpen: PropTypes.bool,
  data: PropTypes.object,
  loading: PropTypes.bool
}

export default EcommerceOrdersModal
