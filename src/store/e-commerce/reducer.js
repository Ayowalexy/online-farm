import {
  GET_CART_DATA_FAIL,
  GET_CART_DATA_SUCCESS,
  GET_CUSTOMERS_FAIL,
  GET_CUSTOMERS_SUCCESS,
  ADD_CUSTOMER_SUCCESS,
  ADD_CUSTOMER_FAIL,
  UPDATE_CUSTOMER_SUCCESS,
  UPDATE_CUSTOMER_FAIL,
  DELETE_CUSTOMER_SUCCESS,
  DELETE_CUSTOMER_FAIL,
  GET_ORDERS_FAIL,
  GET_ORDERS_SUCCESS,
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_SUCCESS,
  GET_SHOPS_FAIL,
  GET_SHOPS_SUCCESS,
  GET_PRODUCT_DETAIL_SUCCESS,
  GET_PRODUCT_DETAIL_FAIL,
  ADD_ORDER_SUCCESS,
  ADD_ORDER_FAIL,
  UPDATE_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  DELETE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  GET_PRODUCT_COMMENTS_SUCCESS,
  GET_PRODUCT_COMMENTS_FAIL,
  ON_LIKE_COMMENT_SUCCESS,
  ON_LIKE_REPLY_SUCCESS,
  ON_ADD_REPLY_SUCCESS,
  ON_ADD_COMMENT_SUCCESS,

  GET_ALL_USERS,
  GET_ALL_USERS_FAILURE,
  GET_ALL_USERS_SUCCESS,

  GET_ONE_USER,
  GET_ONE_USER_SUCCESS,
  GET_ONE_USER_FAILURE,

  GET_ALL_PRODUCTS,
  GET_ALL_PRODUCTS_FAILURE,
  GET_ALL_PRODUCTS_SUCCESS,

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
  GET_ONE_ORDERS_SUCCESS,
  GET_ONE_ORDERS_FAILURE,

  GET_ALL_WITHDRAWALS,
  GET_ALL_WITHDRAWALS_SUCCESS,
  GET_ALL_WITHDRAWALS_FAILURE,

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
  GET_ONE_FUNDING_SUCCESS,
  GET_ONE_FUNDING_FAILURE,

  DELETE_ONE_PRODUCT_SUCCESS,
  DELETE_ONE_PRODUCT_FAILURE,
  DELETE_ONE_PRODUCT,

  UPDATE_ONE_PRODUCT,
  UPDATE_ONE_PRODUCT_SUCCESS,
  UPDATE_ONE_PRODUCT_FAILURE
} from "./actionTypes";

const INIT_STATE = {
  products: [],
  product: {},
  orders: [],
  oneOrder: {},
  cartData: {},
  customers: [],
  shops: [],
  error: {},
  reports: [],
  report: {},
  fundings: [],
  funding: {},
  productComments: [],
  users: [],
  user: {},
  payouts: [],
  withdrawals: [],
  withdrawal: {},
  loading: false,
  Isloading: false,
  reviews: [],
  delLoading: false,
  isReviewLoading: false
};

const Ecommerce = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PRODUCTS_SUCCESS:
      return {
        ...state,
        products: action.payload,
      };

    case GET_PRODUCTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PRODUCT_DETAIL_SUCCESS:
      return {
        ...state,
        product: action.payload,
      };

    case GET_PRODUCT_DETAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ORDERS_SUCCESS:
      return {
        ...state,
        orders: action.payload,
      };

    case GET_ORDERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_ORDER_SUCCESS:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };

    case ADD_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id.toString()
            ? { order, ...action.payload }
            : order
        ),
      };

    case UPDATE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_ORDER_SUCCESS:
      return {
        ...state,
        orders: state.orders.filter(
          order => order.id.toString() !== action.payload.id.toString()
        ),
      };

    case DELETE_ORDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CART_DATA_SUCCESS:
      return {
        ...state,
        cartData: action.payload,
      };

    case GET_CART_DATA_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CUSTOMERS_SUCCESS:
      return {
        ...state,
        customers: action.payload,
      };

    case GET_CUSTOMERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };

    case ADD_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.map(customer =>
          customer.id.toString() === action.payload.id.toString()
            ? { customer, ...action.payload }
            : customer
        ),
      };

    case UPDATE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_CUSTOMER_SUCCESS:
      return {
        ...state,
        customers: state.customers.filter(
          customer => customer.id.toString() !== action.payload.id.toString()
        ),
      };

    case DELETE_CUSTOMER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_SHOPS_SUCCESS:
      return {
        ...state,
        shops: action.payload,
      };

    case GET_SHOPS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PRODUCT_COMMENTS_SUCCESS:
    case ON_LIKE_COMMENT_SUCCESS:
    case ON_LIKE_REPLY_SUCCESS:
    case ON_ADD_REPLY_SUCCESS:
    case ON_ADD_COMMENT_SUCCESS:
      return {
        ...state,
        productComments: action.payload,
      };

    case GET_PRODUCT_COMMENTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    //USERS CASES
    case GET_ALL_USERS:
      return {
        ...state,
        loading: true
      }

    case GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        users: action.payload,
        loading: false
      }

    case GET_ALL_USERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }


    //GET ONE USER CASES
    case GET_ONE_USER:
      return {
        ...state,
        Isloading: true,

      }

    case GET_ONE_USER_SUCCESS:
      return {
        ...state,
        Isloading: false,
        user: action.payload
      }

    case GET_ONE_USER_FAILURE:
      return {
        ...state,
        Isloading: false,
        error: action.payload
      }

    //GET PRODUCTS
    case GET_ALL_PRODUCTS:
      return {
        ...state,
        loading: true
      }

    case GET_ALL_PRODUCTS_SUCCESS:
      return {
        ...state,
        loading: false,
        products: action.payload
      }

    case GET_ALL_PRODUCTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    // ONE PRODUCT
    case GET_ONE_PRODUCT:
      return {
        ...state,
        loading: true
      }

    case GET_ONE_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        product: action.payload
      }

    case GET_ONE_PRODUCT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

    //REVIEWS
    case GET_ALL_REVIEW:
      return {
        ...state, 
        Isloading: true
      }

    case GET_ALL_REVIEW_SUCCESS: 
      return {
        ...state,
        Isloading: false,
        reviews: action.payload
      }
    

    case GET_ALL_REVIEW_SUCCESS:
      return {
        ...state,
        Isloading: false,
        error: action.payload
    }

    case POST_A_REVIEW: 
      return {
        ...state,
        isReviewLoading: true
      }
    
    case POST_A_REVIEW_SUCCESS: 
      return {
        ...state,
        isReviewLoading: false
      }

    case POST_A_REVIEW_FAILURE:
      return {
        ...state,
        isReviewLoading: false,
        error: action.payload
      }


      //ORDERS
    case GET_ALL_ORDERS:
      return {
        ...state,
        loading: true
      }
    
    case GET_ALL_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.payload
      }

    case GET_ALL_ORDERS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      }

      case GET_ONE_ORDERS:
        return {
          ...state, 
          Isloading: true
        }

      case GET_ONE_ORDERS_SUCCESS:
        return {
          ...state,
          Isloading: false,
          oneOrder: action.payload
        }

      case GET_ONE_ORDERS_FAILURE: 
        return {
          ...state,
          Isloading: false,
          error: action.payload
        }

      //WITHDRWALS
      case GET_ALL_WITHDRAWALS:
        return {
          ...state,
          loading: true
        }

      case GET_ALL_WITHDRAWALS_SUCCESS:
        return {
          ...state,
          loading: false,
          withdrawals: action.payload
        }

      case GET_ALL_WITHDRAWALS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        }

      //PAYOUTS
      case GET_ALL_PAYOUTS:
        return {
          ...state,
          loading: true
        }

      case GET_ALL_PAYOUTS_SUCCESS: 
        return {
          ...state,
          loading: false,
          payouts: action.payload
        }

      case GET_ALL_PAYOUTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        }

      //REPORTS
      case GET_ALL_REPORTS:
        return {
          ...state,
          loading: true,
        }
      
      case GET_ALL_REPORTS_SUCCESS:
        return {
          ...state,
          loading: false,
          reports: action.payload
        }

      case GET_ALL_REPORTS_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        }

        //ONE REPORT
      case GET_ONE_REPORT:
        return {
          ...state,
          Isloading: true
        }

      case GET_ONE_REPORT_SUCCESS: 
        return {
          ...state,
          Isloading: false,
          report: action.payload
        }

      case GET_ONE_REPORT_FAILURE:
        return {
          ...state,
          Isloading: false,
          error: action.payload
        }



      //FUNDING
      case GET_ALL_FUNDING:
        return {
          ...state,
          loading: true
        }

      case GET_ALL_FUNDING_SUCCESS: 
        return {
          ...state,
          loading: false,
          fundings: action.payload
        }

      case GET_ALL_FUNDING_FAILURE:
        return {
          ...state,
          loading: false,
          error: action.payload
        }

        //ONE FUNDING
      case GET_ONE_FUNDING:
        return {
          ...state,
          Isloading: true
        }

      case GET_ONE_FUNDING_SUCCESS: 
        return {
          ...state,
          Isloading: false,
          funding: action.payload
        }

      case GET_ONE_FUNDING_FAILURE:
        return {
          ...state,
          Isloading: false,
          error: action.payload
        }


         //ONE WITHDRAWAL
      case GET_ONE_WITHDRAWAL:
        return {
          ...state,
          Isloading: true
        }

      case GET_ONE_WITHDRAWAL_SUCCESS: 
        return {
          ...state,
          Isloading: false,
          withdrawal: action.payload
        }

      case GET_ONE_WITHDRAWAL_FAILURE:
        return {
          ...state,
          Isloading: false,
          error: action.payload
        }

      

        //DELETE ONE PRODUCT
        case DELETE_ONE_PRODUCT_SUCCESS: 
          return {
            ...state,
            delLoading: false
          }

        case DELETE_ONE_PRODUCT:
          return {
            ...state,
            delLoading: true
          }

        case DELETE_ONE_PRODUCT_FAILURE:
          return {
            ...state,
            delLoading: false
          }

          //UPDATE ONE PRODUCT
          case UPDATE_ONE_PRODUCT:
            return{
              ...state,
              Isloading: true
            }

          case UPDATE_ONE_PRODUCT_SUCCESS:
            return {
              ...state,
              Isloading: false
            }

          case UPDATE_ONE_PRODUCT_FAILURE:
            return {
              ...state,
              Isloading: false
            }
        
    default:
      return state;
  }
};

export default Ecommerce;
