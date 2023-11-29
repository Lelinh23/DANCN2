import { setIsAppLoading, setToken, ActionTypes } from "../Actions/HanhDongChung";

interface QuanLyChungState {
    isAppLoading: boolean;
    token: string;
    isLanDauUse: boolean;
}

const BanDauState = {
    isAppLoading: false,
    token: '',
    isLanDauUse: true,
    userData: {}
}

const QuanLyChung = (state: QuanLyChungState = BanDauState, action: any) => {
    switch (action.type) {
        case ActionTypes.SET_IS_APP_LOADING:
            return {
                ...state, isAppLoading: action.payload
            };
        case ActionTypes.SET_TOKEN:
            return {
                ...state, token: action.payload
            };
        case ActionTypes.SET_LAN_DAU_USE:
            return {
                ...state, isLanDauUse: action.payload
            };
        case ActionTypes.SET_USER_DATA:
            return {
                    ...state, userData: action.payload
            };
        default:
            return state;
    }
}

export {QuanLyChung};

