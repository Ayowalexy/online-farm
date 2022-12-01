import {
  GET_CART_DATA,
  GET_CART_DATA_FAIL,
  GET_CART_DATA_SUCCESS,
  GET_ORDERS,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  ADD_NEW_ORDER,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  UPDATE_ORDER,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  GET_PRODUCTS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_CUSTOMERS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_NEW_CUSTOMER,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  GET_SHOPS,
  GET_SHOPS_FAIL,
  GET_SHOPS_SUCCESS,
  GET_PRODUCT_DETAIL,
  GET_PRODUCT_DETAIL_FAIL,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_COMMENTS,
  GET_PRODUCT_COMMENTS_SUCCESS,
  GET_PRODUCT_COMMENTS_FAIL,
  ON_LIKE_COMMENT,
  ON_LIKE_COMMENT_SUCCESS,
  ON_LIKE_COMMENT_FAIL,
  ON_LIKE_REPLY,
  ON_LIKE_REPLY_SUCCESS,
  ON_LIKE_REPLY_FAIL,
  ON_ADD_REPLY,
  ON_ADD_REPLY_SUCCESS,
  ON_ADD_REPLY_FAIL,

  ON_ADD_COMMENT,
  ON_ADD_COMMENT_SUCCESS,
  ON_ADD_COMMENT_FAIL,

  GET_ALL_USERS,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAILURE,


  GET_ONE_USER,
  GET_ONE_USER_SUCCESS,
  GET_ONE_USER_FAILURE,

  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_SUCCESS,
  GET_ALL_PRODUCTS_FAILURE,

  GET_ONE_PRODUCT,
  GET_ONE_PRODUCT_FAILURE,
  GET_ONE_PRODUCT_SUCCESS,

  GET_ALL_REVIEW,
  GET_ALL_REVIEW_FAILURE,
  GET_ALL_REVIEW_SUCCESS,

  POST_A_REVIEW,
  POST_A_REVIEW_FAILURE,
  POST_A_REVIEW_SUCCESS,

  GET_ALL_ORDERS,
  GET_ALL_ORDERS_FAILURE,
  GET_ALL_ORDERS_SUCCESS,

  GET_ONE_ORDERS,
  GET_ONE_ORDERS_FAILURE,
  GET_ONE_ORDERS_SUCCESS,

  GET_ALL_WITHDRAWALS,
  GET_ALL_WITHDRAWALS_FAILURE,
  GET_ALL_WITHDRAWALS_SUCCESS,

  GET_ALL_PAYOUTS,
  GET_ALL_PAYOUTS_FAILURE,
  GET_ALL_PAYOUTS_SUCCESS,

  GET_ALL_REPORTS,
  GET_ALL_REPORTS_FAILURE,
  GET_ALL_REPORTS_SUCCESS,

  GET_ALL_FUNDING,
  GET_ALL_FUNDING_FAILURE,
  GET_ALL_FUNDING_SUCCESS,

  GET_ONE_REPORT,
  GET_ONE_REPORT_FAILURE,
  GET_ONE_REPORT_SUCCESS,

  GET_ONE_WITHDRAWAL,
  GET_ONE_WITHDRAWAL_SUCCESS,
  GET_ONE_WITHDRAWAL_FAILURE,

  GET_ONE_FUNDING,
  GET_ONE_FUNDING_FAILURE,
  GET_ONE_FUNDING_SUCCESS,

  DELETE_ONE_PRODUCT,
  DELETE_ONE_PRODUCT_FAILURE,
  DELETE_ONE_PRODUCT_SUCCESS,

  UPDATE_ONE_PRODUCT,
  UPDATE_ONE_PRODUCT_FAILURE,
  UPDATE_ONE_PRODUCT_SUCCESS
} from "./actionTypes"

export const updateOneProduct = (productID, data) => ({
  type: UPDATE_ONE_PRODUCT,
  payload: { productID, data }
})

export const updateOneProductSuccess = () => ({
  type: UPDATE_ONE_PRODUCT_SUCCESS
})

export const updateOneProductFailure = () => ({
  type: UPDATE_ONE_PRODUCT_FAILURE
})

export const deleteOneProduct = (productID) => ({
  type: DELETE_ONE_PRODUCT,
  payload: productID
})

export const deleteOneProductSuccess = () => ({
  type: DELETE_ONE_PRODUCT_SUCCESS
})

export const deleteOneProductFailure = () => ({
  type: DELETE_ONE_PRODUCT_FAILURE
})

export const getOneFunding = (productID) => ({
  type: GET_ONE_FUNDING,
  payload: productID
})

export const getOneFundingSuccess = (data) => ({
  type: GET_ONE_FUNDING_SUCCESS,
  payload: data
})

export const getOneFundingFailure = (error) => ({
  type: GET_ONE_FUNDING_FAILURE,
  payload: error
})

export const getOneWithdrawal = (productID) =>({
  type: GET_ONE_WITHDRAWAL,
  payload: productID
})

export const getOneWithdrawalSuccess = (data) => ({
  type: GET_ONE_WITHDRAWAL_SUCCESS,
  payload: data
})

export const getOneWithdrawalFailure = (error) => ({
  type: GET_ONE_WITHDRAWAL_FAILURE,
  payload: error
})


export const getOneReport = (productID) =>({
  type: GET_ONE_REPORT,
  payload: productID
})

export const getOneReportSuccess = (data) => ({
  type: GET_ONE_REPORT_SUCCESS,
  payload: data
})

export const getOneReportfailure = (error) => ({
  type: GET_ONE_REPORT_FAILURE,
  payload: error
})

export const getAllFunding = () => ({
  type: GET_ALL_FUNDING
})

export const getAllFundingSuccess = (data) => ({
  type: GET_ALL_FUNDING_SUCCESS,
  payload: data
})

export const getAllFundingFailure = (error) => ({
  type: GET_ALL_FUNDING_FAILURE,
  error: payload
})

export const getAllReports = () => ({
  type: GET_ALL_REPORTS
})

export const getAllReportsSuccess = (data) => ({
  type: GET_ALL_REPORTS_SUCCESS,
  payload: data
})

export const getAllReportsFailure = (error) => ({
  type: GET_ALL_REPORTS_FAILURE,
  payload: error
})

export const getAllPayouts = (data) => ({
  type: GET_ALL_PAYOUTS,
  payload: data
})

export const getAllPayoutsSuccess = (data) => ({
  type: GET_ALL_PAYOUTS_SUCCESS,
  payload: data
})

export const getAllPayoutsFailure = (error) => ({
  type: GET_ALL_PAYOUTS_FAILURE,
  payload: error
})

export const getAllWithdrawals = () => ({
  type: GET_ALL_WITHDRAWALS
})

export const getAllWithdrawalsSuccess = (data) => ({
  type: GET_ALL_WITHDRAWALS_SUCCESS,
  payload: data
})

export const getAllWithdrawalFailure = (error) => ({
  type: GET_ALL_WITHDRAWALS_FAILURE,
  payload: error
})

export const getOneOder = (productID) => ({
  type: GET_ONE_ORDERS,
  payload: productID
})

export const getOneOrderSuccess = (data) => ({
  type: GET_ONE_ORDERS_SUCCESS,
  payload: data
})

export const getOneOrderFailure = (error) => ({
  type: GET_ONE_ORDERS_FAILURE,
  payload: error
})

export const getAllOrders = () => ({
  type: GET_ALL_ORDERS
})

export const getAllOrderSuccess = (data) => ({
  type: GET_ALL_ORDERS_SUCCESS,
  payload: data
})

export const getAllOrdersFailure = (error) => ({
  type: GET_ALL_ORDERS_FAILURE,
  payload: data
})

export const postReview = (data) => ({
  type: POST_A_REVIEW,
  payload: data
})

export const postReviewSuccess = (data) => ({
  type: POST_A_REVIEW_SUCCESS,
  payload: data
})

export const postReviewFailure = (error) => ({
  type: POST_A_REVIEW_FAILURE,
  payload: error
})

export const getAllReviews = (UserID) => ({
  type: GET_ALL_REVIEW,
  payload: UserID
})

export const getAllReviewsSuccess = (data) => ({
  type: GET_ALL_REVIEW_SUCCESS,
  payload: data
})

export const getAllReviewsFailure = (error) => ({
  type: GET_ALL_REVIEW_FAILURE,
  payload: error
})

export const getOneProduct = (productID) => ({
  type: GET_ONE_PRODUCT,
  payload: productID
})

export const getOneProductSuccess = (data) => ({
  type: GET_ONE_PRODUCT_SUCCESS,
  payload: data
})

export const getOneProductFailure = (error) => ({
  type: GET_ONE_PRODUCT_FAILURE,
  payload: error
})

export const getallProducts = (data) => ({
  type: GET_ALL_PRODUCTS,
  payload: data
})

export const getAllProductsSuccess = (data) => ({
  type: GET_ALL_PRODUCTS_SUCCESS,
  payload: data
})

export const getAllProductsFailure = (error) => ({
  type: GET_ALL_PRODUCTS_FAILURE,
  payload: error
})

export const getOneUser = (userID) => ({
  type: GET_ONE_USER,
  payload: { userID }
})

export const getOneUserSuccess = data => ({
  type: GET_ONE_USER_SUCCESS,
  payload: data
})

export const getOneUserFailure = data => ({
  type: GET_ONE_USER_FAILURE,
  payload: data
})

export const getAllUsers = () => ({
  type: GET_ALL_USERS
})

export const getAllUserSuccess = (data) => ({
  type: GET_ALL_USERS_SUCCESS,
  payload: data
})

export const getAllUserFailure = (data) => ({
  type: GET_ALL_USERS_FAILURE,
  payload: data
})

export const getProducts = () => ({
  type: GET_PRODUCTS,
})

export const getProductsSuccess = products => ({
  type: GET_PRODUCTS_SUCCESS,
  payload: products,
})

export const getProductsFail = error => ({
  type: GET_PRODUCTS_FAIL,
  payload: error,
})

export const getProductDetail = productId => ({
  type: GET_PRODUCT_DETAIL,
  productId,
})

export const getProductDetailSuccess = products => ({
  type: GET_PRODUCT_DETAIL_SUCCESS,
  payload: products,
})

export const getProductDetailFail = error => ({
  type: GET_PRODUCT_DETAIL_FAIL,
  payload: error,
})

export const getOrders = () => ({
  type: GET_ORDERS,
})

export const getOrdersSuccess = orders => ({
  type: GET_ORDERS_SUCCESS,
  payload: orders,
})

export const getOrdersFail = error => ({
  type: GET_ORDERS_FAIL,
  payload: error,
})

export const addNewOrder = order => ({
  type: ADD_NEW_ORDER,
  payload: order,
})

export const addOrderSuccess = order => ({
  type: ADD_ORDER_SUCCESS,
  payload: order,
})

export const addOrderFail = error => ({
  type: ADD_ORDER_FAIL,
  payload: error,
})

export const updateOrder = order => ({
  type: UPDATE_ORDER,
  payload: order,
})

export const updateOrderSuccess = order => ({
  type: UPDATE_ORDER_SUCCESS,
  payload: order,
})

export const updateOrderFail = error => ({
  type: UPDATE_ORDER_FAIL,
  payload: error,
})

export const deleteOrder = order => ({
  type: DELETE_ORDER,
  payload: order,
})

export const deleteOrderSuccess = order => ({
  type: DELETE_ORDER_SUCCESS,
  payload: order,
})

export const deleteOrderFail = error => ({
  type: DELETE_ORDER_FAIL,
  payload: error,
})

export const getCartData = () => ({
  type: GET_CART_DATA,
})

export const getCartDataSuccess = cartData => ({
  type: GET_CART_DATA_SUCCESS,
  payload: cartData,
})

export const getCartDataFail = error => ({
  type: GET_CART_DATA_FAIL,
  payload: error,
})

export const getCustomers = () => ({
  type: GET_CUSTOMERS,
})

export const getCustomersSuccess = customers => ({
  type: GET_CUSTOMERS_SUCCESS,
  payload: customers,
})

export const getCustomersFail = error => ({
  type: GET_CUSTOMERS_FAIL,
  payload: error,
})

export const addNewCustomer = customer => ({
  type: ADD_NEW_CUSTOMER,
  payload: customer,
})

export const addCustomerSuccess = customer => ({
  type: ADD_CUSTOMER_SUCCESS,
  payload: customer,
})

export const addCustomerFail = error => ({
  type: ADD_CUSTOMER_FAIL,
  payload: error,
})

export const updateCustomer = customer => ({
  type: UPDATE_CUSTOMER,
  payload: customer,
})

export const updateCustomerSuccess = customer => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer,
})

export const updateCustomerFail = error => ({
  type: UPDATE_CUSTOMER_FAIL,
  payload: error,
})

export const deleteCustomer = customer => ({
  type: DELETE_CUSTOMER,
  payload: customer,
})

export const deleteCustomerSuccess = customer => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: customer,
})

export const deleteCustomerFail = error => ({
  type: DELETE_CUSTOMER_FAIL,
  payload: error,
})

export const getShops = () => ({
  type: GET_SHOPS,
})

export const getShopsSuccess = shops => ({
  type: GET_SHOPS_SUCCESS,
  payload: shops,
})

export const getShopsFail = error => ({
  type: GET_SHOPS_FAIL,
  payload: error,
})

export const getProductComments = () => ({
  type: GET_PRODUCT_COMMENTS,
})

export const getProductCommentsSuccess = comments => ({
  type: GET_PRODUCT_COMMENTS_SUCCESS,
  payload: comments,
})

export const getProductCommentsFail = error => ({
  type: GET_PRODUCT_COMMENTS_FAIL,
  payload: error,
})

export const onLikeComment = (commentId, productId) => ({
  type: ON_LIKE_COMMENT,
  payload: { commentId, productId },
})

export const onLikeCommentSuccess = comments => ({
  type: ON_LIKE_COMMENT_SUCCESS,
  payload: comments,
})

export const onLikeCommentFail = error => ({
  type: ON_LIKE_COMMENT_FAIL,
  payload: error,
})

export const onLikeReply = (commentId, productId, replyId) => ({
  type: ON_LIKE_REPLY,
  payload: { commentId, productId, replyId },
})

export const onLikeReplySuccess = comments => ({
  type: ON_LIKE_REPLY_SUCCESS,
  payload: comments,
})

export const onLikeReplyFail = error => ({
  type: ON_LIKE_REPLY_FAIL,
  payload: error,
})

export const onAddReply = (commentId, productId, replyText) => ({
  type: ON_ADD_REPLY,
  payload: { commentId, productId, replyText },
})

export const onAddReplySuccess = comments => ({
  type: ON_ADD_REPLY_SUCCESS,
  payload: comments,
})

export const onAddReplyFail = error => ({
  type: ON_ADD_REPLY_FAIL,
  payload: error,
})

export const onAddComment = (productId, commentText) => ({
  type: ON_ADD_COMMENT,
  payload: { productId, commentText },
})

export const onAddCommentSuccess = comments => ({
  type: ON_ADD_COMMENT_SUCCESS,
  payload: comments,
})

export const onAddCommentFail = error => ({
  type: ON_ADD_COMMENT_FAIL,
  payload: error,
})