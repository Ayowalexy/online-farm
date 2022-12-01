import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from "prop-types"
import moment from 'moment';
//utils
import { formatNumber } from "utils"




export const FundingModal = ({data}) => {

    return (
        <>
            
            <div className="p-4">
                <p className="mb-2">
                    Name: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.userId?.firstName}{" "}{data?.userId?.lastName}</span>
                </p>
                <p className="mb-4">
                    Email: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.userId?.email}</span>
                </p>
                <p className="mb-4">
                    Address: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.userId?.address}</span>
                </p>
                <p className="mb-4">
                    Followes: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.userId?.followers?.length}</span>
                </p>
                <p className="mb-4">
                    Sales: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.userId?.sales}</span>
                </p>
               
                <p className="mb-4">
                    Role: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.userId?.role}</span>
                </p>
                <p className="mb-4">
                    Created At: <span style={{color: 'rgb(50, 255, 0)'}}>{moment(data?.createdAt).format('ll')}</span>
                </p>
                <p className="mb-4">
                    Transaction ID: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.transactionId}</span>
                </p>
                
                <p className="mb-4">
                    Transaction Status: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.transactionStatus || 'NA'}</span>
                </p>
                <p className="mb-4">
                    Payment Gateway: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.paymentGateway}</span>
                </p>
                <p className="mb-4">
                    Amount: <span style={{color: 'rgb(50, 255, 0)'}}>{formatNumber(data?.amount)}</span>
                </p>
                <p className="mb-4">
                    Currency: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.currency}</span>
                </p>
               
            </div>

            
           
        </>
    )
}

FundingModal.propTypes = {
    data: PropTypes.object
}