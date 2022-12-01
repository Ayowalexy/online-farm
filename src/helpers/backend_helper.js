import { get, post, del, patch } from "./api_helper";
import * as url from "./url_helper";

// CONNECTED DASHBOARD CHARTS DATA
export const getDashboardStats = () => get(url.GET_DASHBOARD_DATA);


// GET ALL USERS
export const getAllUsersAsync = () => get(url.GET_ALL_USERS_);

// GET ONE USER
export const getOneUserAsync = (id) => get(url.GET_ONE_USER.concat('/', id));

//PRODUCTS
export const getAllProductsAsync = (data) => {
    let Useurl = '';
    if(data){
        const key = Object.keys(data);
        const value = Object.values(data);
        Useurl = `${url.GET_ALL_PRODUCTS}?${key.toString()}=${value.toString()}`
    } else {
        Useurl = url.GET_ALL_PRODUCTS
    }

   const resp = get(Useurl);
   return resp
};
export const getOneProductAsync = (id) => get(url.GET_ALL_PRODUCTS.concat('/', id));
export const deleteOneProductAsync = (id) => del(url.GET_ALL_PRODUCTS.concat('/', id));
export const updateOneProductAsync = (id, data) => patch(url.GET_ALL_PRODUCTS.concat('/', id), data);

//REVIEWS
export const getAllReviewsAsync = (id) => get(url.GET_ALL_REVIEWS.concat('/', id));
//POST A REVIEW
export const postReviewAsync = (data) => post(url.GET_ALL_REVIEWS, data);
//ORDERS
export const getAllOrdersAsync = () => get(url.GET_ALL_ORDERS);
export const getOneOrderAsync = (id) => get(url.GET_ONE_ORDER.concat('/', id));

//WITHDRAWALS
export const getAllWithdrawalsAsync = () => get(url.GET_ALLL_WITHDRAWALS);
export const getOneWithdrawalAsync = (id) => get(url.GET_ONE_WITHDRAWAL.concat('/', id));

//PAYOUTS
export const getAllPayoutsAsync = (data) => {
    let Useurl = '';
    if(data){
        const key = Object.keys(data);
        const value = Object.values(data);
        Useurl = `${url.GET_ALL_PAYOUTS}?${key.toString()}=${value}`
    } else {
        Useurl = url.GET_ALL_PAYOUTS
    }

   const resp = get(Useurl);
   return resp
};

//REPORTS
export const getAllReportsAsync = () => get(url.GET_ALL_REPORTS);
export const getOneReportsAsync = (id) => get(url.GET_ALL_REPORTS.concat('/', id));

//FUNDING
export const getAllFundingAsync = () => get(url.GET_ALL_FUNDING);
export const getOneFundingAsync = (id) => get(url.GET_ONE_FUNDING.concat('/', id));