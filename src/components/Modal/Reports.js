import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';
import StarRatings from 'react-star-ratings';
import PropTypes from "prop-types"

//utils
import { formatNumber } from "utils"




export const ReportsModal = ({ data }) => {

    return (
        <>
            <ModalHeader>
                Buyer Details
            </ModalHeader>
            <div className="p-4">
                <p className="mb-2">
                    Name: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyerId?.firstName}{" "}{data?.buyerId?.lastName}</span>
                </p>
                <p className="mb-4">
                    Address: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyerId?.address}</span>
                </p>
                <p className="mb-2">
                    Email: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyerId?.email}</span>
                </p>
                <p className="mb-4">
                    Phone: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyerId?.phone}</span>
                </p>
                <p className="mb-2">
                    Sales: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyerId?.sales}</span>
                </p>
                <p className="mb-4">
                    Role: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.buyerId?.role}</span>
                </p>
            </div>

            <ModalHeader>
                Seller Details
            </ModalHeader>
            <div className="p-4">
                <p className="mb-2">
                    Name: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.sellerId?.firstName}{" "}{data?.sellerId?.lastName}</span>
                </p>
                <p className="mb-4">
                    Address: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.sellerId?.address}</span>
                </p>
                <p className="mb-2">
                    Email: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.sellerId?.email}</span>
                </p>
                <p className="mb-4">
                    Phone: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.sellerId?.phone}</span>
                </p>
                <p className="mb-2">
                    Sales: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.sellerId?.sales}</span>
                </p>
                <p className="mb-4">
                    Role: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.sellerId?.role}</span>
                </p>
            </div>

            <ModalHeader>
                Product Details
            </ModalHeader>
            <div className="p-4">
                <p className="mb-2">
                    Name: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.orderId?.product?.name}</span>
                </p>
                <p className="mb-4">
                    Available for swap: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.orderId?.product?.availableForSwap}</span>
                </p>
                <p className="mb-2">
                    Category: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.orderId?.product?.category}</span>
                </p>
                <p className="mb-4">
                    Price: <span style={{color: 'rgb(50, 255, 0)'}}>{formatNumber(data?.orderId?.product?.price)}</span>
                </p>
                <p className="mb-2">
                    Quantity: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.orderId?.product?.quantity}</span>
                </p>
                <p className="mb-4 w-100">
                    Rating: <span>
                        <StarRatings
                            rating={data?.orderId?.product?.ratingsAverage}
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
                    Faults: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.orderId?.product?.faults}</span>
                </p>
            </div>
        </>
    )
}

ReportsModal.propTypes = {
    data: PropTypes.object
}