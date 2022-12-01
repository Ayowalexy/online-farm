import { call, put, takeEvery } from "redux-saga/effects";

// Ecommerce Redux States
import {
  GET_CART_DATA,
  GET_CUSTOMERS,
  GET_ORDERS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS,
  GET_SHOPS,
  ADD_NEW_ORDER,
  DELETE_ORDER,
  UPDATE_ORDER,
  ADD_NEW_CUSTOMER,
  DELETE_CUSTOMER,
  UPDATE_CUSTOMER,
  GET_PRODUCT_COMMENTS,
  ON_LIKE_COMMENT,
  ON_LIKE_REPLY,
  ON_ADD_REPLY,
  ON_ADD_COMMENT,


  //USER_TYPES
  GET_ALL_USERS,
  GET_ONE_USER,
  GET_ALL_PRODUCTS,
  GET_ONE_PRODUCT,
  GET_ALL_REVIEW,
  POST_A_REVIEW,
  GET_ALL_ORDERS,
  GET_ONE_ORDERS,
  GET_ALL_WITHDRAWALS,
  GET_ALL_PAYOUTS,
  GET_ALL_REPORTS,
  GET_ALL_FUNDING,
  GET_ONE_REPORT,
  GET_ONE_WITHDRAWAL,
  GET_ONE_FUNDING,
  DELETE_ONE_PRODUCT,
  UPDATE_ONE_PRODUCT

} from "./actionTypes";
import {
  getCartDataFail,
  getCartDataSuccess,
  getCustomersFail,
  getCustomersSuccess,
  getOrdersFail,
  getOrdersSuccess,
  getProductDetailFail,
  getProductDetailSuccess,
  getProductsFail,
  getProductsSuccess,
  getShopsFail,
  getShopsSuccess,
  addOrderFail,
  addOrderSuccess,
  updateOrderSuccess,
  updateOrderFail,
  deleteOrderSuccess,
  deleteOrderFail,
  addCustomerFail,
  addCustomerSuccess,
  updateCustomerSuccess,
  updateCustomerFail,
  deleteCustomerSuccess,
  deleteCustomerFail,
  getProductCommentsSuccess,
  getProductCommentsFail,
  onLikeCommentSuccess,
  onLikeCommentFail,
  onLikeReplySuccess,
  onLikeReplyFail,
  onAddReplySuccess,
  onAddReplyFail,
  onAddCommentSuccess,
  onAddCommentFail,


  getAllUsers,
  getAllUserFailure,
  getAllUserSuccess,

  getOneUser,
  getOneUserFailure,
  getOneUserSuccess,
  
  getallProducts,
  getAllProductsFailure,
  getAllProductsSuccess,

  getOneProductSuccess,
  getOneProductFailure,

  getAllReviewsSuccess,
  getAllReviewsFailure,

  postReviewSuccess,
  postReviewFailure,

  getAllOrderSuccess,
  getAllOrdersFailure,

  getOneOrderSuccess,
  getOneOrderFailure,

  getAllWithdrawalsSuccess,
  getAllWithdrawalFailure,

  getAllPayoutsSuccess,
  getAllPayoutsFailure,

  getAllReportsFailure,
  getAllReportsSuccess,

  getAllFundingSuccess,
  getAllFundingFailure,

  getOneReportSuccess,
  getOneReportfailure,

  getOneWithdrawalSuccess,
  getOneWithdrawalFailure,

  getOneFundingSuccess,
  getOneFundingFailure,

  deleteOneProductSuccess,
  deleteOneProductFailure,

  updateOneProductFailure,
  updateOneProductSuccess
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCartData,
  getCustomers,
  getOrders,
  getProducts,
  getShops,
  getProductDetail,
  addNewOrder,
  updateOrder,
  deleteOrder,
  addNewCustomer,
  updateCustomer,
  deleteCustomer,
  getProductComents as getProductComentsApi,
  onLikeComment as onLikeCommentApi,
  onLikeReply as onLikeReplyApi,
  onAddReply as onAddReplyApi,
  onAddComment as onAddCommentApi,


  
} from "helpers/fakebackend_helper";


import { 
  getAllUsersAsync, 
  getOneUserAsync,
  getAllProductsAsync,
  getOneProductAsync,
  getAllReviewsAsync,
  postReviewAsync,
  getAllOrdersAsync,
  getOneOrderAsync,
  getAllWithdrawalsAsync,
  getAllPayoutsAsync,
  getAllReportsAsync,
  getAllFundingAsync,
  getOneReportsAsync,
  getOneWithdrawalAsync,
  getOneFundingAsync,
  deleteOneProductAsync,
  updateOneProductAsync
 } from "helpers/backend_helper";

function* fetchProducts() {
  try {
    const response = yield call(getProducts);
    yield put(getProductsSuccess(response));
  } catch (error) {
    yield put(getProductsFail(error));
  }
}

function* fetchProductDetail({ productId }) {
  try {
    const response = yield call(getProductDetail, productId);
    yield put(getProductDetailSuccess(response));
  } catch (error) {
    yield put(getProductDetailFail(error));
  }
}

function* fetchOrders() {
  try {
    const response = yield call(getOrders);
    yield put(getOrdersSuccess(response));
  } catch (error) {
    yield put(getOrdersFail(error));
  }
}

function* fetchCartData() {
  try {
    const response = yield call(getCartData);
    yield put(getCartDataSuccess(response));
  } catch (error) {
    yield put(getCartDataFail(error));
  }
}

function* fetchCustomers() {
  try {
    const response = yield call(getCustomers);
    yield put(getCustomersSuccess(response));
  } catch (error) {
    yield put(getCustomersFail(error));
  }
}

function* onUpdateCustomer({ payload: customer }) {
  try {
    const response = yield call(updateCustomer, customer);
    yield put(updateCustomerSuccess(response));
  } catch (error) {
    yield put(updateCustomerFail(error));
  }
}

function* onDeleteCustomer({ payload: customer }) {
  try {
    const response = yield call(deleteCustomer, customer);
    yield put(deleteCustomerSuccess(response));
  } catch (error) {
    yield put(deleteCustomerFail(error));
  }
}

function* onAddNewCustomer({ payload: customer }) {
  try {
    const response = yield call(addNewCustomer, customer);

    yield put(addCustomerSuccess(response));
  } catch (error) {
    yield put(addCustomerFail(error));
  }
}

function* fetchShops() {
  try {
    const response = yield call(getShops);
    yield put(getShopsSuccess(response));
  } catch (error) {
    yield put(getShopsFail(error));
  }
}

function* onUpdateOrder({ payload: order }) {
  try {
    const response = yield call(updateOrder, order);
    yield put(updateOrderSuccess(response));
  } catch (error) {
    yield put(updateOrderFail(error));
  }
}

function* onDeleteOrder({ payload: order }) {
  try {
    const response = yield call(deleteOrder, order);
    console.log("response",response)
    yield put(deleteOrderSuccess(response));
  } catch (error) {
    console.log("error",error)
    yield put(deleteOrderFail(error));
  }
}

function* onAddNewOrder({ payload: order }) {
  try {
    const response = yield call(addNewOrder, order);
    yield put(addOrderSuccess(response));
  } catch (error) {
    yield put(addOrderFail(error));
  }
}

function* getProductComents() {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(getProductComentsApi);
    yield put(getProductCommentsSuccess(response));
  } catch (error) {
    yield put(getProductCommentsFail(error));
  }
}

function* onLikeComment({ payload: { commentId, productId } }) {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(onLikeCommentApi, commentId, productId);
    yield put(onLikeCommentSuccess(response));
  } catch (error) {
    yield put(onLikeCommentFail(error));
  }
}

function* onLikeReply({ payload: { commentId, productId, replyId } }) {
  try {
    // todo - add product Id to the payload and api
    const response = yield call(onLikeReplyApi, commentId, productId, replyId);
    yield put(onLikeReplySuccess(response));
  } catch (error) {
    yield put(onLikeReplyFail(error));
  }
}

function* onAddReply({ payload: { commentId, productId, replyText } }) {
  try {
    const response = yield call(onAddReplyApi, commentId, productId, replyText);
    yield put(onAddReplySuccess(response));
  } catch (error) {
    yield put(onAddReplyFail(error));
  }
}

function* onAddComment({ payload: { productId, commentText } }) {
  try {
    const response = yield call(onAddCommentApi, productId, commentText);
    yield put(onAddCommentSuccess(response));
  } catch (error) {
    yield put(onAddCommentFail(error));
  }
}


function* onGetAllUsers (){
  try { 
    const response = yield call(getAllUsersAsync);
    console.log('Response', response.data)
    if(response.status === 'success'){
      yield put(getAllUserSuccess(response.data))
    }

  } catch (error){
    yield put(getAllUserFailure(error))
  }
}


function* onGetOneUser ({payload: { userID } }) {
  try {
      const response = yield call(getOneUserAsync, userID.userID);
      if(response.status === 'success'){
        yield put(getOneUserSuccess(response.data))
      }
  } catch(error){
    yield put(getOneUserFailure(error))
  }
}


function* onGetAllProducts ({payload: { data }}) {
  try {
    const response = yield call(getAllProductsAsync, data);
    if(response.status === 'success'){
      yield put(getAllProductsSuccess(response.data))
    }

  } catch(error){
    yield put(getAllProductsFailure(error))
  }
}


function* onGetOneProduct ({ payload: { productID}}) {
  try {
    const response = yield call(getOneProductAsync, productID);
    if(response.status === 'success'){
      console.log('one products', response);
      yield put(getOneProductSuccess(response.data))
    }
  } catch(error){
    yield put(getOneProductFailure(error))
  }
}


function* onGetAllReviews ({ payload: { UserID}}) {
  try {
    const response = yield call(getAllReviewsAsync, UserID);
    console.log('All reviews', response)
    if(response.status === 'success'){
      yield put(getAllReviewsSuccess(response.data))
    }
  } catch(error){
    yield put(getAllReviewsFailure(error))
  }
}

function* onPostReview({payload: { data }}){
  try {
    const response = yield call(postReviewAsync, {
      review: data.review,
      rating: data.rating,
      productId: data.productId
    })
    if(response.status === 'success'){
      yield put(postReviewSuccess(response.data));
    }
  } catch(error){
    yield put(postReviewFailure(error?.response?.data?.message));
  }
}


function* onGetAllOrders() {
  try {
    const response = yield call(getAllOrdersAsync)
    console.log('all orders', response);
    if(response.status === 'success'){
      yield put(getAllOrderSuccess(response.data))
    }

  } catch (error){
    yield put(getAllOrdersFailure(error?.response?.data?.message))
  }
}


function* onGetOneOrder({payload: { productID}}){
  try {
    const response = yield call(getOneOrderAsync, productID);
    console.log('One order', response)
    if(response.status === 'success'){
      yield put(getOneOrderSuccess(response.data))
    }
  } catch(error){
    put(getOneOrderFailure(error?.response?.data?.message))
  }
}


function* onGetAllWithdrawal(){
  try {
    const response = yield call(getAllWithdrawalsAsync);
    console.log('All withdrawals', response);
    if(response.status === 'success'){
      yield put(getAllWithdrawalsSuccess(response.data))
    }
  } catch(error){
    yield put(getAllWithdrawalFailure(error?.response?.data?.message));
  }
}

function* onGetAllPayouts({payload: { data }}) {
  try {
    const response = yield call(getAllPayoutsAsync, data);
    console.log('All payouts', response);
    if(response.status === 'success'){
      yield put(getAllPayoutsSuccess(response.data))
    }
  } catch(error){
    yield put(getAllPayoutsFailure(error?.response?.data?.message))
  }
}


function* onGetAllReports() {
  try {
    const response = yield call(getAllReportsAsync);
    console.log('All payouts', response);
    if(response.status === 'success'){
      yield put(getAllReportsSuccess(response.data))
    }
  } catch(error){
    yield put(getAllReportsFailure(error?.response?.data?.message))
  }
}

function* onGetAllFunding() {
  try {
    const response = yield call(getAllFundingAsync);
    console.log('All payouts', response);
    if(response.status === 'success'){
      yield put(getAllFundingSuccess(response.data))
    }
  } catch(error){
    yield put(getAllFundingFailure(error?.response?.data?.message))
  }
}



function* onGetOneReport({payload: { productID }}) {
  try {
    const response = yield call(getOneReportsAsync, productID);
    console.log('one report', response);
    if(response.status === 'success'){
      yield put(getOneReportSuccess(response.data))
    }
  } catch(error){
    yield put(getOneReportfailure(error?.response?.data?.message))
  }
}

function* onGetOneWithdrawal({payload: { productID }}) {
  try {
    const response = yield call(getOneWithdrawalAsync, productID);
    console.log('one report', response);
    if(response.status === 'success'){
      yield put(getOneWithdrawalSuccess(response.data))
    }
  } catch(error){
    yield put(getOneWithdrawalFailure(error?.response?.data?.message))
  }
}

function* onGetOneFunding({payload: { productID }}) {
  try {
    const response = yield call(getOneFundingAsync, productID);
    console.log('one funding', response);
    if(response.status === 'success'){
      yield put(getOneFundingSuccess(response.data))
    }
  } catch(error){
    yield put(getOneFundingFailure(error?.response?.data?.message))
  }
}

function* onDeleteOneProduct ({payload: { productID }}) {
  try {
    const response = yield call(deleteOneProductAsync, productID);
    console.log('deleted', productID, response.status)
    if(response.status === 204){
      yield put(deleteOneProductSuccess());
    }
  } catch(error){
    yield put(deleteOneProductFailure(error?.response?.data?.message))

  }
}


function* onUpdateOneProduct ({ payload: { productID, data }}) {
  try {
    console.log(productID, data)
    const response = yield call(updateOneProductAsync, productID, data);
    console.log('updated product', response)
    if(response.status === 'success'){
      yield put(updateOneProductSuccess());
    }
  } catch(error){
    yield put(updateOneProductFailure(error?.response?.data?.message))
  }
}


function* ecommerceSaga() {
  yield takeEvery(GET_PRODUCTS, fetchProducts);
  yield takeEvery(GET_PRODUCT_DETAIL, fetchProductDetail);
  yield takeEvery(GET_ORDERS, fetchOrders);
  yield takeEvery(GET_CART_DATA, fetchCartData);
  yield takeEvery(GET_CUSTOMERS, fetchCustomers);
  yield takeEvery(ADD_NEW_CUSTOMER, onAddNewCustomer);
  yield takeEvery(UPDATE_CUSTOMER, onUpdateCustomer);
  yield takeEvery(DELETE_CUSTOMER, onDeleteCustomer);
  yield takeEvery(GET_SHOPS, fetchShops);
  yield takeEvery(ADD_NEW_ORDER, onAddNewOrder);
  yield takeEvery(UPDATE_ORDER, onUpdateOrder);
  yield takeEvery(DELETE_ORDER, onDeleteOrder);
  yield takeEvery(GET_PRODUCT_COMMENTS, getProductComents);
  yield takeEvery(ON_LIKE_COMMENT, onLikeComment);
  yield takeEvery(ON_LIKE_REPLY, onLikeReply);
  yield takeEvery(ON_ADD_REPLY, onAddReply);
  yield takeEvery(ON_ADD_COMMENT, onAddComment);

  yield takeEvery(GET_ALL_USERS, onGetAllUsers);
  yield takeEvery(GET_ONE_USER, onGetOneUser);
  yield takeEvery(GET_ALL_PRODUCTS, onGetAllProducts);
  yield takeEvery(GET_ONE_PRODUCT, onGetOneProduct);
  yield takeEvery(GET_ALL_REVIEW, onGetAllReviews);
  yield takeEvery(POST_A_REVIEW, onPostReview);
  yield takeEvery(GET_ALL_ORDERS, onGetAllOrders);
  yield takeEvery(GET_ONE_ORDERS, onGetOneOrder);
  yield takeEvery(GET_ALL_WITHDRAWALS, onGetAllWithdrawal);
  yield takeEvery(GET_ALL_PAYOUTS, onGetAllPayouts);
  yield takeEvery(GET_ALL_REPORTS, onGetAllReports);
  yield takeEvery(GET_ALL_FUNDING, onGetAllFunding);
  yield takeEvery(GET_ONE_REPORT, onGetOneReport);
  yield takeEvery(GET_ONE_WITHDRAWAL, onGetOneWithdrawal);
  yield takeEvery(GET_ONE_FUNDING, onGetOneFunding);
  yield takeEvery(DELETE_ONE_PRODUCT, onDeleteOneProduct);
  yield takeEvery(UPDATE_ONE_PRODUCT, onUpdateOneProduct);

}

export default ecommerceSaga;
