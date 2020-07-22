import { setAuthUserDataAC } from "./auth-reducer";

const INITHIALIZED_SUCCSES = 'INITHIALIZED_SUCCSES';


let initialState = {
    initialized: false
}

let appReducer = (state = initialState, action) => {
    switch (action.type) {
        case INITHIALIZED_SUCCSES: return {
            ...state,
            initialized: true
        }
        default:
            return state
    }

}

export const inithializeAC = () => ({ type: INITHIALIZED_SUCCSES});

export const initialezedTC = () => {
    return (dispatch) => {
        debugger
        let promise = dispatch(setAuthUserDataAC())

        promise.then(() => {
            dispatch(inithializeAC())
        })
    }
}

export default appReducer