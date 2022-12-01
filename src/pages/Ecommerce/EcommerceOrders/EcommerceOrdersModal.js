import React, { useContext } from "react"
import PropTypes from "prop-types"
import {
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap"
import img7 from "../../../assets/images/product/img-7.png"
import img4 from "../../../assets/images/product/img-4.png"
import moment from "moment"

import { PageContext } from "store/context"

import { Spinner } from "reactstrap"

//Import Star rating
import StarRatings from "react-star-ratings"


//utils
import { formatNumber } from "utils"

//actions
import { deleteOneProduct } from "store/actions"

//MODALS
import { OrdersModal } from "components/Modal/Order"
import { ReportsModal } from "components/Modal/Reports"
import { WithdrawalModal } from "components/Modal/Withdrawal"
import { FundingModal } from "components/Modal/Funding"

import { useParams, useHistory } from "react-router-dom"

import { useSelector, useDispatch } from "react-redux"


const EcommerceOrdersModal = props => {
  const { isOpen, toggle, data, loading, currentPage } = props;

  const { setCurrentPage } = useContext(PageContext);
  const params = useParams();
  const history = useHistory();
  const { id } = params;

  const dispatch = useDispatch();

  const { delLoading } = useSelector(state => ({
    delLoading: state.ecommerce.delLoading
  }))

  console.log('del', delLoading)


  const handleDelete = () => {
    dispatch(deleteOneProduct({ productID: id }));
    if (!delLoading) {
      setCurrentPage('All');
      toggle();
      history.push('/ecommerce-products');
    }
  }

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

      <div className="modal-content h-100 inline-block">
        {

          <>
            <ModalHeader toggle={toggle}>
              {currentPage} Details
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
                      {
                        currentPage === 'Orders'
                          ? <OrdersModal data={data} />
                          : currentPage === 'Reports'
                            ? <ReportsModal data={data} />
                            : currentPage === 'Withdrawal'
                              ? <WithdrawalModal data={data} />
                              : currentPage === 'Funding'
                                ? <FundingModal data={data} />
                                : currentPage === 'Delete'
                                  ? (
                                    <div>
                                      Are you sure you want to delete this product?
                                    </div>
                                  )
                                  : null
                      }
                    </>
                  )

              }



            </ModalBody>
          </>
        }

        <ModalFooter>
          {
            currentPage === 'Delete' && (
              <Button type="button" color="danger" onClick={handleDelete}>
                {
                  delLoading
                    ?
                    <Spinner size="sm">
                      Loading...
                    </Spinner>
                    :
                    "Delete"
                }
              </Button>
            )
          }
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
  loading: PropTypes.bool,
  currentPage: PropTypes.string
}

export default EcommerceOrdersModal
