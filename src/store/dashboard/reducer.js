import {
    API_SUCCESS,
    API_FAIL,
    GET_CHARTS_DATA
} from "./actionTypes";

const INIT_STATE = {
    chartsData: [],
    error: '',
    loading: false
};

const Dashboard = (state = INIT_STATE, action) => {
    switch (action.type) {

        case GET_CHARTS_DATA:
            return {
                ...state,
                loading: true
            };

        case API_SUCCESS:
            return {
                ...state,
                chartsData: action.payload,
                loading: false
            };

        case API_FAIL:
            return {
                ...state,
                chartsData: action.payload.data,
                loading: false
            };

        default:
            return state;
    }
}


export default Dashboard;