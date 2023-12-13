import { getLanDauUse, getToken } from "../../Services/Storage";
import { getUserData } from "../../Services/User";
import { capnhatToken } from "../../Services/XacThuc";
import { GetLove } from "./LoveAction";

const ActionTypes = {
  SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
  SET_TOKEN: 'SET_TOKEN',
  SET_LAN_DAU_USE: 'SET_LAN_DAU_USE',
  SET_USER_DATA: 'SET_USER_DATA'
};

const setIsAppLoading = (isAppLoading: boolean) => {
  return {
    type: ActionTypes.SET_IS_APP_LOADING,
    payload: isAppLoading
  };
};

const setToken = (token: string) => {
  return {
    type: ActionTypes.SET_TOKEN,
    payload: token
  };
};

const setLanDauUse = (isLanDauUse: boolean) => {
  return {
    type: ActionTypes.SET_LAN_DAU_USE,
    payload: isLanDauUse
  };
};

const setUserData = (userData: any) => {
  return {
    type: ActionTypes.SET_USER_DATA,
    payload: userData
  };
};

const appStart = () => {
  return (dispatch: (arg0: { type: string; payload: any; }) => void, getState: any) => {
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
          payload: token,
        })

        getUserData().then(userResponse =>{
          if (userResponse?.status) {
            dispatch({
              type: ActionTypes.SET_USER_DATA,
              payload: userResponse?.data,
            })

            dispatch({
              type: ActionTypes.SET_IS_APP_LOADING,
              payload: false,
            });

          } else if (userResponse?.message === 'TokenExpiredError') {
            capnhatToken().then(tokenResponse => {
              if (tokenResponse?.status) {
                dispatch({
                  type: ActionTypes.SET_TOKEN,
                  payload: tokenResponse?.data,
                });
    
                getUserData().then(userResponse => {
                  if (userResponse?.status) {
                    dispatch({
                      type: ActionTypes.SET_USER_DATA,
                      payload: userResponse?.data,
                    });
    
                    dispatch({
                      type: ActionTypes.SET_IS_APP_LOADING,
                      payload: false,
                    });
                  }
                });
              } else {
                dispatch({
                  type: ActionTypes.SET_TOKEN,
                  payload: '',
                });
    
                dispatch({
                  type: ActionTypes.SET_IS_APP_LOADING,
                  payload: false,
                });
              }
            });
          }
        })
      }
      dispatch({
        type: ActionTypes.SET_IS_APP_LOADING,
        payload: false,
      });
    })
  };
};

export { setIsAppLoading, setToken, ActionTypes, appStart, setLanDauUse, setUserData};


    