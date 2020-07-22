import { apiFunc } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    id: null,
    email: null,
    login: null,
    isAuth: false
}

let authReducer = (state = initialState, action) => {
    debugger;
    switch (action.type) {
        case SET_USER_DATA: return {
            ...state,
            ...action.data
        }
        default:
            return state
    }

}

export const setAuthUserData = (id, email, login, isAuth) => ({ type: SET_USER_DATA, data: { id, email, login, isAuth } });

export const setAuthUserDataAC = () => {
    return async (dispatch) => {
        debugger
        let data = await apiFunc.authMe()

        if (data.resultCode === 0) {
            let { id, email, login } = data.data;
            dispatch(setAuthUserData(id, email, login, true));
        }
    }
}

export const loginTC = (email, password, rememberMe) => {
    return async (dispatch) => {
        let data = await apiFunc.login(email, password, rememberMe)

        if (data.resultCode === 0) {
            dispatch(setAuthUserDataAC())
        } else {
            let message = data.messages.length > 0 ? data.messages[0] : "some error";
            dispatch(stopSubmit("login", { _error: message }))
        }
    }
}

export const logoutTC = () => {
    return async (dispatch) => {
        let data = await apiFunc.logout()
        
        if (data.resultCode === 0) {
            dispatch(setAuthUserData(null, null, null, false));
        }

    }
}

export default authReducer