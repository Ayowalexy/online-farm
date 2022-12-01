import {
    API_SUCCESS,
    API_FAIL,
    GET_CHARTS_DATA
} from "./actionTypes";

export const apiSuccess = (data) => ({
    type: API_SUCCESS,
    payload: data
});

export const apiFail = (error) => ({
    type: API_FAIL,
    payload:  error 
});

// charts data
export const getChartsData = () => ({
    type: GET_CHARTS_DATA
});
