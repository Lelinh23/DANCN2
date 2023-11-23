import { ThunkAction } from "redux-thunk";
import { getLanDauUse, getToken } from "../../Services/Storage";

const ActionTypes = {
    SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
    SET_TOKEN: 'SET_TOKEN',
    SET_LAN_DAU_USE: 'SET_LAN_DAU_USE'
};

const setIsAppLoading = (isAppLoading: any) => {
    return {
        type: ActionTypes.SET_IS_APP_LOADING,
        payload: isAppLoading
    };
};

const setToken = (token: any) => {
    return {
        type: ActionTypes.SET_TOKEN,
        payload: token
    };
};

const appStart = () => {
    return (dispatch: any, getState: any) =>{
        getLanDauUse().then(isLanDauUse => {
            dispatch({
                type: ActionTypes.SET_LAN_DAU_USE,
                payload: isLanDauUse ? false : true
            })
        });

        getToken().then(token => {
            if (token) {
                dispatch({
                    type: ActionTypes.SET_TOKEN,
                    payload: token
                })
            }
        });

        dispatch({
            type: ActionTypes.SET_LAN_DAU_USE,  
            payload: false,
        });
    }
}

export { setIsAppLoading, setToken, ActionTypes, appStart };
