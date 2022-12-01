import React, { useEffect, useState, useRef, useContext } from "react";
import MetaTags from "react-meta-tags";
import PropTypes from "prop-types";
import { isEmpty } from "lodash";
import * as moment from "moment";
import * as Yup from "yup";
import { useFormik } from "formik";

//Import actions
import {
  getAllUsers,
  getOneUser
} from "store/e-commerce/actions";

//Import Page Context
import { PageContext } from "store/context";

//Import loading spinner
import { Spinner } from 'reactstrap';

import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Modal,
  ModalHeader,
  ModalBody,
  UncontrolledDropdown,
  Input,
  FormFeedback,
  Label,
  Form,
} from "reactstrap";

import ToolkitProvider, { Search } from "react-bootstrap-table2-toolkit";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator";

//Import Preloader
import { Preloader } from "utils";

//Import Breadcrumb
import Breadcrumbs from "components/Common/Breadcrumb";

import DeleteModal from "../../../components/Common/DeleteModal";
import {
  getCustomers as onGetCustomers,
  addNewCustomer as onAddNewCustomer,
  updateCustomer as onUpdateCustomer,
  deleteCustomer as onDeleteCustomer,
} from "store/e-commerce/actions";

//redux
import { useSelector, useDispatch } from "react-redux";

import EcommerceOrdersModal from "./EcommerceOrdersModal";

const EcommerceCustomers = props => {
  const dispatch = useDispatch();
  const [modal1, setModal1] = useState(false);
  const toggleViewModal = () => setModal1(!modal1);

  const { customers, users, loading } = useSelector(state => ({
    customers: state.ecommerce.customers,
    users: state.ecommerce.users,
    loading: state.ecommerce.loading,
  }));

  const { Isloading, user } = useSelector(state => ({
    user: state.ecommerce.user,
    Isloading: state.ecommerce.Isloading
  }))

  console.log('One usersss', Isloading)

  const [modal, setModal] = useState(false);
  const [customerList, setCustomerList] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [customer, setCustomer] = useState(null);
  


  //pagination customization
  const pageOptions = {
    sizePerPage: 10,
    totalSize: customers.length, // replace later with size(orders),
    custom: true,
  };

  const EcommerceCustomerColumns = [
    {
      dataField: "createdAt",
      text: "Joining Date",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => handleValidDate(row.createdAt),
    },
    {
      text: "Name",
      dataField: "firstName",
      sort: true, formatter: (cellContent, row) => (
        <>
          <p className="mb-1">{row.full_name}</p>
        </>
      ),
    },
    {
      text: "Phone / Email",
      dataField: "email",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <>
          <p className="mb-1">{row.phone}</p>
          <p className="mb-0">{row.email}</p>
        </>
      ),
    },
    {
      dataField: "address",
      text: "Address",
      sort: true,
    },
    {
      dataField: "state",
      text: "State",
      sort: true,
    },

   
    {
      dataField: "_id",
      isDummyField: true,
      text: "View Details",
      sort: true,
      // eslint-disable-next-line react/display-name
      formatter: (cellContent, row) => (
        <Button
          style={{backgroundColor: "#E85B6B", border: 'none'}}
          type="button"
          className="btn-sm btn-rounded"
          onClick={() => handleGetOneUser(row._id)}
        >
          View Details
        </Button>
      ),
    },

  ];

  const toggle = () => {
    if (modal) {
      setModal(false);
      setCustomer(null);
    } else {
      setModal(true);
    }
  };


  const handleCustomerClick = arg => {
    const customer = arg;

    setCustomer({
      id: customer.id,
      username: customer.username,
      phone: customer.phone,
      email: customer.email,
      address: customer.address,
      rating: customer.rating,
      walletBalance: customer.walletBalance,
      joiningDate: customer.joiningDate,
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

  //delete customer
  const [deleteModal, setDeleteModal] = useState(false);

  const onClickDelete = (customer) => {
    setCustomer(customer);
    setDeleteModal(true);
  };

  const handleDeleteCustomer = () => {
    if (customer.id) {
      dispatch(onDeleteCustomer(customer));
      onPaginationPageChange(1);
      setDeleteModal(false);
    }
  };

  const { SearchBar } = Search;

  useEffect(() => {
    dispatch(getAllUsers());
  }, [])

  useEffect(() => {
    if (customers && !customers.length) {
      dispatch(onGetCustomers());
    }
  }, [dispatch, customers]);

  useEffect(() => {
    setCustomerList(customers);
  }, [customers]);

  useEffect(() => {
    if (!isEmpty(customers)) {
      setCustomerList(customers);
    }
  }, [customers]);

  // eslint-disable-next-line no-unused-vars
  const handleTableChange = (type, { page, searchText }) => {
    setCustomerList(
      customers.filter(customer =>
        Object.keys(customer).some(key =>
          customer[key].toLowerCase().includes(searchText.toLowerCase())
        )
      )
    );
  };

  const handleCustomerClicks = () => {
    setCustomerList("");
    setIsEdit(false);
    toggle();
  };

  const handleGetOneUser = (userID) => {
    dispatch(getOneUser({ userID }));
    toggleViewModal();
  }

  const defaultSorted = [
    {
      dataField: "id",
      order: "desc",
    },
  ];

  /** set Date formate */
  const handleValidDate = date => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  return (
    <React.Fragment>
      <EcommerceOrdersModal
        isOpen={modal1}
        data={user}
        loading={Isloading}
        toggle={toggleViewModal}
      />

      <DeleteModal
        show={deleteModal}
        onDeleteClick={handleDeleteCustomer}
        onCloseClick={() => setDeleteModal(false)}
      />
      <div className="page-content">
        <MetaTags>
          <title>Customers | Swapplug</title>
        </MetaTags>
        <Container fluid>
          <Breadcrumbs title="Online Farms" breadcrumbItem="Users" />
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
                      <PaginationProvider
                        pagination={paginationFactory(pageOptions)}
                        keyField="id"
                        columns={EcommerceCustomerColumns}
                        data={users}
                      >
                        {({ paginationProps, paginationTableProps }) => (
                          <ToolkitProvider
                            keyField="id"
                            data={users || []}
                            columns={EcommerceCustomerColumns}
                            bootstrap4
                            search
                          >
                            {toolkitProps => (
                              <React.Fragment>
                                <Row className="mb-2">
                                  <Col sm="4">
                                    <div className="search-box ms-2 mb-2 d-inline-block">
                                      <div className="position-relative">
                                        <SearchBar {...toolkitProps.searchProps} />
                                        <i className="bx bx-search-alt search-icon" />
                                      </div>
                                    </div>
                                  </Col>
                                  <Col sm="8">
                                    
                                  </Col>
                                </Row>
                                <Row>
                                  <Col xl="12">
                                    <div className="table-responsive">
                                      <BootstrapTable
                                        responsive
                                        bordered={false}
                                        striped={false}
                                        defaultSorted={defaultSorted}
                                        classes={"table align-middle table-nowrap"}
                                        keyField="id"
                                        {...toolkitProps.baseProps}
                                        onTableChange={handleTableChange}
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

EcommerceCustomers.propTypes = {
  customers: PropTypes.array,
  onGetCustomers: PropTypes.func,
  onAddNewCustomer: PropTypes.func,
  onDeleteCustomer: PropTypes.func,
  onUpdateCustomer: PropTypes.func,
};

export default EcommerceCustomers;
