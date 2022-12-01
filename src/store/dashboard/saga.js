import { call, put, takeEvery, all, fork } from "redux-saga/effects";

// Crypto Redux States
import { GET_CHARTS_DATA, API_SUCCESS, API_FAIL } from "./actionTypes";
import { apiSuccess, apiFail } from "./actions";

//Include Both Helper File with needed methods
import {
    getWeeklyData,
    getYearlyData,
    getMonthlyData
}
    from "../../helpers/fakebackend_helper";

//dashboard
import { getDashboardStats } from "helpers/backend_helper";

function* getChartsData({ payload: periodType }) {
    try {
        var response;
        if (periodType == "monthly") {
            response = yield call(getWeeklyData, periodType);
        }
        if (periodType == "yearly") {
            response = yield call(getYearlyData, periodType);
        }
        if (periodType == "weekly") {
            response = yield call(getMonthlyData, periodType);
        }

        yield put(apiSuccess(GET_CHARTS_DATA, response));
    } catch (error) {
        yield put(apiFail(GET_CHARTS_DATA, error));
    }
}


function* getAllDashboardStats () {
    try {
        const response = yield call(getDashboardStats);
        console.log('Dashboard', response);
        if(response.status === 'success'){
            yield put(apiSuccess(response));
        }
    }  catch (error){
        console.log(error)
        window.location = "/login"
        yield put(apiFail(error));
    }
}


export function* watchGetChartsData() {
    yield takeEvery(GET_CHARTS_DATA, getAllDashboardStats);
}

function* dashboardSaga() {
    yield all([fork(watchGetChartsData)]);
}

export default dashboardSaga;
