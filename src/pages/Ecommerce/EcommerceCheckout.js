import React, { useEffect, useState, useRef, useContext } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { withRouter, Link } from "react-router-dom";
import { isEmpty } from "lodash";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";
import * as Yup from "yup";
import { useFormik } from "formik";
import DeleteModal from "../../components/Common/DeleteModal";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import * as moment from "moment";

import { PageContext } from "store/context";

//preloader
import { Preloader } from "utils";

//empty state image
import Empty from "assets/images/empty_.png";

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Badge,
  UncontrolledTooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  Input,
  FormFeedback,
  Label,
} from "reactstrap";

//redux
import { useSelector, useDispatch } from "react-redux";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

//utils
import { formatNumber } from "utils";

import {
  getOrders as onGetOrders,
  addNewOrder as onAddNewOrder,
  updateOrder as onUpdateOrder,
  deleteOrder as onDeleteOrder,

  getAllWithdrawals,
  getAllPayouts,
  getAllReports,
  getOneReport,
  getOneWithdrawal,
  getAllFunding,
  getOneFunding
} from "store/actions";

import EcommerceOrdersModal from "./EcommerceOrders/EcommerceOrdersModal";

const EcommerceOrders = props => {
  const dispatch = useDispatch();
  const { currentPage } = useContext(PageContext);

  const [orderList, setOrderList] = useState([]);
  const [order, setOrder] = useState(null);

  //state to display the current table data orders | withdrawals | payouts
  const [tableData, setTableData] = useState([]);

  // validation
  const validation = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      orderId: (order && order.orderId) || '',
      billingName: (order && order.billingName) || '',
      orderdate: (order && order.orderdate) || '',
      total: (order && order.total) || '',
      paymentStatus: (order && order.paymentStatus) || 'Paid',
      badgeclass: (order && order.badgeclass) || 'success',
      paymentMethod: (order && order.paymentMethod) || 'Mastercard',
    },
    validationSchema: Yup.object({
      orderId: Yup.string().required("Please Enter Your Order Id"),
      billingName: Yup.string().required("Please Enter Your Billing Name"),
      orderdate: Yup.string().required("Please Enter Your Order Date"),
      total: Yup.string().required("Total Amount"),
      paymentStatus: Yup.string().required("Please Enter Your Payment Status"),
      badgeclass: Yup.string().required("Please Enter Your Badge Class"),
      paymentMethod: Yup.string().required("Please Enter Your Payment Method"),
    }),
    onSubmit: (values) => {
      if (isEdit) {
        const updateOrder = {
          id: order ? order.id : 0,
          orderId: values.orderId,
          billingName: values.billingName,
          orderdate: values.orderdate,
          total: values.total,
          paymentStatus: values.paymentStatus,
          paymentMethod: values.paymentMethod,
          badgeclass: values.badgeclass,
        };
        // update order
        dispatch(onUpdateOrder(updateOrder));
        validation.resetForm();
      } else {
        const newOrder = {
          id: Math.floor(Math.random() * (30 - 20)) + 20,
          orderId: values["orderId"],
          billingName: values["billingName"],
          orderdate: values["orderdate"],
          total: values["total"],
          paymentStatus: values["paymentStatus"],
          paymentMethod: values["paymentMethod"],
          badgeclass: values["badgeclass"],
        };
        // save new order
        dispatch(onAddNewOrder(newOrder));
        validation.resetForm();
      }
      toggle();
    },
  });

  const { orders, payouts, withdrawals, loading, Isloading, reports, report, withdrawal, fundings, funding } = useSelector(state => ({
    orders: state.ecommerce.orders,
    payouts: state.ecommerce.payouts,
    withdrawals: state.ecommerce.withdrawals,
    loading: state.ecommerce.loading,
    reports: state.ecommerce.reports,
    Isloading: state.ecommerce.Isloading,
    report: state.ecommerce.report,
    withdrawal: state.ecommerce.withdrawal,
    fundings: state.ecommerce.fundings,
    funding: state.ecommerce.funding
  }));

  const selectRow = {
    mode: "checkbox",
  };

  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [isEdit, setIsEdit] = useState(false);


  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: tableData.length, // replace later with size(orders),
    custom: true,
  };
  const { SearchBar } = Search;

  // const toggleModal = () => {
  //   setModal1(!modal1)
  // }
  const toggleViewModal = () => setModal1(!modal1);

  const toLowerCase1 = str => {
    return (
      str === "" || str === undefined ? "" : str.toLowerCase()
    );
  };

  const EcommerceWithdrawalColumns = [
    {
      dataField: "createdAt",
      text: "Created at",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => moment(row.createdAt).format('ll'),
    },
    {
      dataField: "reference",
      text: "Reference",
      sort: true,
    },
    {
      dataField: "accountNumber",
      text: "Account number",
      sort: true,
    },
    {
      dataField: "bankName",
      text: "Bank Name",
      sort: true,
    },

    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      formatter: (cellContent, row) => (
        <div>${formatNumber(row.amount)}</div>
      ),
    },

    {
      dataField: "transactionStatus",
      text: "Transaction Status",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              borderRadius: 40,
              padding: '4px',
              color: '#fff',
              width: '70%',
              fontSize: '10px',
              backgroundColor: row.transactionStatus === 'SUCCESSFUL'
                ? '#1a9949'
                : row.transactionStatus === 'FAILED'
                  ? '#f2592e'
                  
                    : "rgb(50, 255, 0)"
            }}
          >
            {row.transactionStatus}

          </div>
        )
      }
    },




    {
      dataField: "_id",
      isDummyField: true,
      text: "View Details",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Button
          type="button"
          style={{ backgroundColor: "#E85B6B", border: 'none' }}
          className="btn-sm btn-rounded"
          onClick={() => {
            dispatch(getOneWithdrawal({ productID: row._id }));
            toggleViewModal();
          }}
        >
          View Details
        </Button>
      ),
    },

  ];



  const EcommerceFundingColumns = [
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
      formatter: (cellContent, row) => (
        <div>
          {moment(row.createdAt).format('ll')}
        </div>
      )
    },
    {
      dataField: "transactionId",
      text: "Transaction ID",
      sort: true,
    },
    {
      dataField: "paymentGateway",
      text: "Payment Gateway",
      sort: true,
    },
    {
      dataField: "userId",
      text: "Name",
      sort: true,
      formatter: (cellContent, row) => (
        <div>
          {row.userId.firstName}{" "}{row.userId.lastName}
        </div>
      )

    },
    {
      dataField: "amount",
      text: "Amount",
      sort: true,
      formatter: (cellContent, row) => (
        <div>
          ${formatNumber(row.amount)}
        </div>
      )

    },
    {
      dataField: "paymentStatus",
      text: "Payment Status",
      sort: true,
      formatter: (cellContent, row) => {
        return (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{
              borderRadius: 40,
              padding: '4px',
              width: '70%',
              fontSize: '10px',
              color: '#fff',
              backgroundColor: row.paymentStatus === 'successful'
                ? '#1a9949'
                : row.paymentStatus === 'failed'
                  ? '#f2592e'
                  
                    : "rgb(50, 255, 0)"
            }}
          >
            {row.paymentStatus}

          </div>
        )
      }
    },


    {
      dataField: "_id",
      isDummyField: true,
      text: "View Details",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Button
          type="button"
          style={{ backgroundColor: "#E85B6B", border: 'none' }}
          className="btn-sm btn-rounded"
          onClick={() => {
            dispatch(getOneFunding({ productID: row._id }));
            toggleViewModal();
          }}
        >
          View Details
        </Button>
      ),
    },

  ];


  const EcommerceReportsColumns = [
    {
      dataField: "createdAt",
      text: "Created At",
      sort: true,
      formatter: (cellContent, row) => moment(row.createdAt).format('ll')
    },
    {
      dataField: "buyerId",
      text: "Buyer name",
      sort: true,
      formatter: (cellContent, row) => (
        <div>
          {row?.buyerId?.firstName}{" "}{row?.buyerId?.lastName}
        </div>
      )

    },
    {
      dataField: "orderId",
      text: "Buyer Phone",
      sort: true,
      formatter: (cellContent, row) => (
        <div>
          {row?.orderId?.buyer?.phone}
        </div>
      )

    },
    {
      dataField: "sellerId",
      text: "Seller name",
      sort: true,
      formatter: (cellContent, row) => (
        <div>
          {row?.sellerId?.firstName}{" "}{row?.sellerId?.lastName}
        </div>
      )

    },


    {
      dataField: "_id",
      isDummyField: true,
      text: "View Details",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Button
          type="button"
          style={{ backgroundColor: "#E85B6B", border: 'none' }}
          className="btn-sm btn-rounded"
          onClick={() => {
            dispatch(getOneReport({ productID: row._id }));
            toggleViewModal();
          }}
        >
          View Details
        </Button>
      ),
    },

  ];


  useEffect(() => {
    if (currentPage) {
      switch (currentPage) {
        case 'Withdrawal':
          dispatch(getAllWithdrawals())
          break;

        case 'Payouts':
          dispatch(getAllPayouts({ data: '' }));
          break;

        case 'Reports':
          dispatch(getAllReports());
          break;

        case 'Funding':
          dispatch(getAllFunding());
          break;

        case 'Dispute':
          dispatch(getAllPayouts({ data: { transfer: false } }));
          break;

        default: null
      }
    }
    dispatch(getAllWithdrawals())


  }, [dispatch, currentPage])


  useEffect(() => {
    if (currentPage) {
      if (currentPage === 'Withdrawal') {
        setTableData(withdrawals)
      } else if (currentPage === 'Payouts' || currentPage === 'Dispute') {
        setTableData(payouts)
      } else if (currentPage === 'Reports') {
        setTableData(reports)
      } else if (currentPage === 'Funding') {
        setTableData(fundings);
      }
    } else {
      setTableData(withdrawals);
    }
  }, [currentPage, payouts, withdrawals, reports, fundings])

  useEffect(() => {
    if (orders && !orders.length) {
      dispatch(onGetOrders());
    }
  }, [dispatch, orders]);

  useEffect(() => {
    setOrderList(orders);
  }, [orders]);

  useEffect(() => {
    if (!isEmpty(orders) && !!isEdit) {
      setOrderList(orders);
      setIsEdit(false);
    }
  }, [orders]);

  const toggle = () => {
    if (modal) {
      setModal(false);
      setOrder(null);
    } else {
      setModal(true);
    }
  };

  const handleOrderClick = arg => {
    const order = arg;

    setOrder({
      id: order.id,
      orderId: order.orderId,
      billingName: order.billingName,
      orderdate: order.orderdate,
      total: order.total,
      paymentStatus: order.paymentStatus,
      paymentMethod: order.paymentMethod,
      badgeclass: order.badgeclass,
    });

    setIsEdit(true);

    toggle();
  };

  var node = useRef();
  const onPaginationPageChange = page => {
    if (
      node &&
      node.current &&
      node.current.props &&
      node.current.props.pagination &&
      node.current.props.pagination.options
    ) {
      node.current.props.pagination.options.onPageChange(page);
    }
  };

  //delete order
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (order) => {
    setOrder(order);
    setDeleteModal(true);
  };

  const handleDeleteOrder = () => {
    if (order.id) {
      dispatch(onDeleteOrder(order));
      onPaginationPageChange(1);
      setDeleteModal(false);
    }
  };
  const handleOrderClicks = () => {
    setOrderList("");
    setIsEdit(false);
    toggle();
  };

  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const defaultSorted = [
    {
      dataField: "orderId",
      order: "desc",
    },
  ];


  return (
    <React.Fragment>
      <EcommerceOrdersModal
        currentPage={currentPage}
        data={
          currentPage === 'Reports'
            ? report
            : currentPage === 'Withdrawal'
              ? withdrawal
              : currentPage === 'Funding'
                ? funding
                : {}
        }
        isOpen={modal1}
        loading={Isloading}
        toggle={toggleViewModal}
      />
      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteOrder}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Online Farms</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Online Farms" breadcrumbItem={currentPage} />
          <Row>
            <Col xs="12">
              <Card>
                <CardBody>
                  {
                    loading
                      ?
                      <Preloader
                        count={10}
                        height={40}
                        className="mb-3" />
                      :
                      <>
                        {
                          tableData.length
                            ?
                            <PaginationProvider
                              pagination={paginationFactory(pageOptions)}
                              keyField="id"
                              columns={
                                currentPage === 'Reports'
                                  ? EcommerceReportsColumns
                                  : currentPage === 'Withdrawal'
                                    ? EcommerceWithdrawalColumns
                                    : currentPage === 'Funding'
                                      ? EcommerceFundingColumns
                                      : EcommerceWithdrawalColumns}
                              data={tableData}
                            >
                              {({ paginationProps, paginationTableProps }) => (
                                <ToolkitProvider
                                  keyField="id"
                                  data={tableData}
                                  columns={
                                    currentPage === 'Reports'
                                      ? EcommerceReportsColumns
                                      : currentPage === 'Withdrawal'
                                        ? EcommerceWithdrawalColumns
                                        : currentPage === 'Funding'
                                          ? EcommerceFundingColumns
                                          : EcommerceWithdrawalColumns}
                                  bootstrap4
                                  search
                                >
                                  {toolkitProps => (
                                    <React.Fragment>
                                      <Row className="mb-2">
                                        <Col sm="4">
                                          <div className="search-box me-2 mb-2 d-inline-block">
                                            <div className="position-relative">
                                              <SearchBar {...toolkitProps.searchProps} />
                                              <i className="bx bx-search-alt search-icon" />
                                            </div>
                                          </div>
                                        </Col>

                                      </Row>
                                      <Row>
                                        <Col xl="12">
                                          <div className="table-responsive">
                                            <BootstrapTable
                                              keyField="id"
                                              responsive
                                              bordered={false}
                                              striped={false}
                                              defaultSorted={defaultSorted}
                                              selectRow={selectRow}
                                              classes={
                                                "table align-middle table-nowrap table-check"
                                              }
                                              headerWrapperClasses={"table-light"}
                                              {...toolkitProps.baseProps}
                                              {...paginationTableProps}
                                              ref={node}
                                            />
                                          </div>
                                        
                                        </Col>
                                      </Row>
                                      <Row className="align-items-md-center mt-30">
                                        <Col className="pagination pagination-rounded justify-content-end mb-2 inner-custom-pagination">
                                          <PaginationListStandalone
                                            {...paginationProps}
                                          />
                                        </Col>
                                      </Row>
                                    </React.Fragment>
                                  )}
                                </ToolkitProvider>
                              )}
                            </PaginationProvider>
                            :
                            (
                              <div className="d-flex justify-content-center align-items-center">
                                <img src={Empty} alt='empty' height={100} width={100} />
                              </div>
                            )
                        }
                      </>

                  }

                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

EcommerceOrders.propTypes = {
  orders: PropTypes.array,
  onGetOrders: PropTypes.func,
  onAddNewOrder: PropTypes.func,
  onDeleteOrder: PropTypes.func,
  onUpdateOrder: PropTypes.func,
};

export default withRouter(EcommerceOrders);

