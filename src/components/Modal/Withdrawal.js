import React from 'react';
import { ModalHeader, ModalBody } from 'reactstrap';
import PropTypes from "prop-types"
import moment from 'moment';
//utils
import { formatNumber } from "utils"




export const WithdrawalModal = ({data}) => {

    console.log('here', data)
    return (
        <>
            
            <div className="p-4">
                <p className="mb-2">
                    Account Number: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.accountNumber}</span>
                </p>
                <p className="mb-4">
                    Bank Name: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.bankName}</span>
                </p>
                <p className="mb-4">
                    Bank Code: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.bankCode}</span>
                </p>
                <p className="mb-2">
                    Amount: <span style={{color: 'rgb(50, 255, 0)'}}>{formatNumber(data?.amount)}</span>
                </p>
                <p className="mb-4">
                    Narration: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.narration}</span>
                </p>
                <p className="mb-2">
                    Reference: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.reference}</span>
                </p>
                <p className="mb-4">
                    Transaction Date: <span style={{color: 'rgb(50, 255, 0)'}}>{moment(data?.transactionDate).format('ll')}</span>
                </p>
                <p className="mb-4">
                    Transaction ID: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.transactionId}</span>
                </p>
                
                <p className="mb-4">
                    Transaction Status: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.transactionStatus}</span>
                </p>
                <p className="mb-4">
                    Currency: <span style={{color: 'rgb(50, 255, 0)'}}>{data?.currency}</span>
                </p>
               
            </div>

            
           
        </>
    )
}

WithdrawalModal.propTypes = {
    data: PropTypes.object
}