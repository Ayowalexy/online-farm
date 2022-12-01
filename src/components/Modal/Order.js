import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import PropTypes from "prop-types"

//utils
import { formatNumber } from "utils"




export const OrdersModal = ({data}) => {
    return (
        <>
            <ModalHeader>
                Buyer Details
            </ModalHeader>
            <div className="p-4">
                <p className="mb-2">
                    Name: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyer?.firstName}{" "}{data?.buyer?.lastName}</span>
                </p>
                <p className="mb-4">
                    Address: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyer?.address}</span>
                </p>
                <p className="mb-2">
                    Email: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyer?.email}</span>
                </p>
                <p className="mb-4">
                    Phone: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyer?.phone}</span>
                </p>
                <p className="mb-2">
                    Sales: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyer?.sales}</span>
                </p>
                <p className="mb-4">
                    Role: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyer?.role}</span>
                </p>
            </div>

            <ModalHeader>
                Seller Details
            </ModalHeader>
            <div className="p-4">
                <p className="mb-2">
                    Name: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.seller?.firstName}{" "}{data?.seller?.lastName}</span>
                </p>
                <p className="mb-4">
                    Address: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.seller?.address}</span>
                </p>
                <p className="mb-2">
                    Email: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.seller?.email}</span>
                </p>
                <p className="mb-4">
                    Phone: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.seller?.phone}</span>
                </p>
                <p className="mb-2">
                    Sales: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.seller?.sales}</span>
                </p>
                <p className="mb-4">
                    Role: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.seller?.role}</span>
                </p>
            </div>

            <ModalHeader>
                Product Details
            </ModalHeader>
            <div className="p-4">
                <p className="mb-2">
                    Name: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.product?.name}</span>
                </p>
                <p className="mb-4">
                    Available for swap: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.product?.availableForSwap}</span>
                </p>
                <p className="mb-2">
                    Category: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.product?.category}</span>
                </p>
                <p className="mb-4">
                    Price: <span style={{color: 'rgb(50, 255, 0)'}}>{formatNumber(data?.product?.price)}</span>
                </p>
                <p className="mb-2">
                    Quantity: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.product?.quantity}</span>
                </p>
                <p className="mb-4 w-100">
                    Rating: <span>
                        <StarRatings
                            rating={data?.product?.ratingsAverage}
                            starRatedColor="#F1B44C"
                            starEmptyColor="#2D363F"
                            numberOfStars={5}
                            name="rating"
                            starDimension="14px"
                            starSpacing="3px"
                        />
                    </span>
                </p>
                <p className="mb-4">
                    Faults: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.product?.faults}</span>
                </p>
            </div>
        </>
    )
}

OrdersModal.propTypes = {
    data: PropTypes.object
}