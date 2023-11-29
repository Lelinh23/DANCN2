import { ThunkAction } from "redux-thunk";
import { getLanDauUse, getToken } from "../../Services/Storage";
import { getUserData } from "../../Services/User";
import { capnhatToken } from "../../Services/XacThuc";

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
      dispatch(setLanDauUse(isLanDauUse ? false : true));
    });

    getUserData().then(userResponse => {
      if (userResponse?.status) {
        dispatch(setUserData(userResponse?.data));

        dispatch(setIsAppLoading(false));
      } else if (userResponse?.message === 'TokenExpiredError') {
        capnhatToken().then(tokenResponse => {
          if (tokenResponse?.status) {
            dispatch(setToken(tokenResponse?.data));

            getUserData().then(userResponse => {
              if (userResponse?.status) {
                dispatch(setUserData(userResponse?.data));

                dispatch(setIsAppLoading(false));
              }
            });
          } else {
            dispatch(setToken(''));

            dispatch(setIsAppLoading(false));
          }
        });
      }

      getToken().then(token => {
        if (token) {
          dispatch(setToken(token));
        }
      });

      dispatch(setLanDauUse(false));
    });
  };
};

export { setIsAppLoading, setToken, ActionTypes, appStart };
