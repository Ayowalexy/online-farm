import React from 'react';
import {
    Col,
    Input,
    Label,
    Row,
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Form,
    FormFeedback,
    InputGroup,
    InputGroupText,
    Spinner
} from "reactstrap"
import PropTypes from "prop-types"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formatNumber } from 'utils';

import { useDispatch, useSelector } from 'react-redux';

import { updateOneProduct } from 'store/actions';

import { useParams } from 'react-router-dom';


export const EditProduct = (props) => {

    const { isOpen, toggle, data } = props;
    const params = useParams();

    const { id } = params;
    const dispatch = useDispatch();

    const { IsLoading } = useSelector(state => ({
        IsLoading: state.ecommerce.IsLoading
    }))


    const validation = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            name: (data && data?.name) || '',
            category: (data && data?.category) || '',
            availableForSwap: (data && data?.availableForSwap) || '',
            about: (data && data?.about) || '',
            faults: (data && data?.faults) || '',
            durationUsed: (data && data?.durationUsed) || '',
            quantity: (data && data?.quantity) || '',
            price: (data && data?.price) || '',
            slug: (data && data?.slug) || '',
            state: (data && data?.state) || '',
            status: (data && data?.state) || '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Please Enter Your Name"),
            category: Yup.string().required("Please Enter product category"),
            availableForSwap: Yup.string().required("Required"),
            about: Yup.string().required("Please Enter about product"),
            price: Yup.string().required("Please Enter price"),
            state: Yup.string().required("Please Enter state"),
            status: Yup.string().required("Please Enter status"),
            durationUsed: Yup.string().required("Please Enter Duration used"),
            quantity: Yup.string().required("Please Enter quantity"),
        }),
        onSubmit: (values) => {
            const updatedata = {
                ...values
            };
           
            dispatch(updateOneProduct(id, updatedata));
            validation.resetForm();

            toggle();
        },
    });


    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <ModalHeader toggle={toggle} tag="h4">
                Edit Product
            </ModalHeader>
            <ModalBody>
                <Form
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                >
                    <Row form>
                        <Col className="col-12">
                            <div className="mb-3">
                                <Label className="form-label">Name</Label>
                                <Input
                                    name="name"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.name || ""}
                                    invalid={
                                        validation.touched.name && validation.errors.name ? true : false
                                    }
                                />
                                {validation.touched.name && validation.errors.name ? (
                                    <FormFeedback type="invalid">{validation.errors.name}</FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Category</Label>
                                <Input
                                    name="category"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.category || ""}
                                    invalid={
                                        validation.touched.category && validation.errors.category ? true : false
                                    }
                                />
                                {validation.touched.category && validation.errors.category ? (
                                    <FormFeedback type="invalid">{validation.errors.category}</FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Available For Swap</Label>
                                <Input
                                    name="availableForSwap"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.availableForSwap || ""}
                                    invalid={
                                        validation.touched.availableForSwap && validation.errors.availableForSwap ? true : false
                                    }
                                />
                                {validation.touched.availableForSwap && validation.errors.availableForSwap ? (
                                    <FormFeedback type="invalid">{validation.errors.availableForSwap}</FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">About</Label>
                                <Input
                                    name="address"
                                    type="textarea"
                                    rows="3"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.about || ""}
                                    invalid={
                                        validation.touched.about && validation.errors.about ? true : false
                                    }
                                />
                                {validation.touched.about && validation.errors.about ? (
                                    <FormFeedback type="invalid">{validation.errors.about}</FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Faults</Label>
                                <Input
                                    name="faults"
                                    type="textarea"
                                    rows="3"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.faults || ""}
                                    invalid={
                                        validation.touched.faults && validation.errors.faults ? true : false
                                    }
                                />
                                {validation.touched.faults && validation.errors.faults ? (
                                    <FormFeedback type="invalid">{validation.errors.faults}</FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Duration Used</Label>
                                <Input
                                    name="durationUsed"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.durationUsed || ""}
                                    invalid={
                                        validation.touched.durationUsed && validation.errors.durationUsed ? true : false
                                    }
                                />
                                {validation.touched.durationUsed && validation.errors.durationUsed ? (
                                    <FormFeedback type="invalid">{validation.errors.durationUsed}</FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Price</Label>
                                <InputGroup>
                                    <InputGroupText>
                                        $
                                    </InputGroupText>
                                    <Input
                                        name="price"
                                        type="text"
                                        onChange={validation.handleChange}
                                        onBlur={validation.handleBlur}
                                        value={formatNumber(validation.values.price) || ""}
                                        invalid={
                                            validation.touched.price && validation.errors.price ? true : false
                                        }
                                    />
                                </InputGroup>

                                {validation.touched.price && validation.errors.price ? (
                                    <FormFeedback type="invalid">{validation.errors.price}</FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Quantity</Label>
                                <Input
                                    name="quantity"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.quantity || ""}
                                    invalid={
                                        validation.touched.quantity && validation.errors.quantity ? true : false
                                    }
                                />
                                {validation.touched.quantity && validation.errors.quantity ? (
                                    <FormFeedback type="invalid">{validation.errors.quantity}</FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Slug</Label>
                                <Input
                                    name="slug"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.slug || ""}
                                    invalid={
                                        validation.touched.slug && validation.errors.slug ? true : false
                                    }
                                />
                                {validation.touched.slug && validation.errors.slug ? (
                                    <FormFeedback type="invalid">{validation.errors.slug}</FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">State</Label>
                                <Input
                                    name="state"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.state || ""}
                                    invalid={
                                        validation.touched.state && validation.errors.state ? true : false
                                    }
                                />
                                {validation.touched.state && validation.errors.state ? (
                                    <FormFeedback type="invalid">{validation.errors.state}</FormFeedback>
                                ) : null}
                            </div>

                            <div className="mb-3">
                                <Label className="form-label">Status</Label>
                                <Input
                                    name="status"
                                    type="text"
                                    onChange={validation.handleChange}
                                    onBlur={validation.handleBlur}
                                    value={validation.values.status || ""}
                                    invalid={
                                        validation.touched.status && validation.errors.status ? true : false
                                    }
                                />
                                {validation.touched.status && validation.errors.status ? (
                                    <FormFeedback type="invalid">{validation.errors.status}</FormFeedback>
                                ) : null}
                            </div>


                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="text-end">
                                <button
                                    type="submit"
                                    className="btn btn-success save-data"
                                >
                                    {
                                        IsLoading
                                            ?
                                            (
                                                <Spinner size="sm">
                                                    Loading...
                                                </Spinner>
                                            )
                                            :
                                            "Save"
                                    }
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </ModalBody>
        </Modal>
    )
}

EditProduct.propTypes = {
    isOpen: PropTypes.bool,
    data: PropTypes.object,
    toggle: PropTypes.func,
    loading: PropTypes.bool
}