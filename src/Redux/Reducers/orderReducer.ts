import { orderTypes } from "../Actions/OrderAction";

const initialState = {
    loading: false,
    order: {},
    error: '',
};

export const orderReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case orderTypes.PLACE_ORDER:
            return {
                ...state,
                loading: true,
            };
        case orderTypes.PLACE_ORDER_SUCCESS:
            return {
                ...state,
                loading: false,
                order: action.payload,
            };
        case orderTypes.SET_IS_LOADING:
            return {
                ...state,
                loading: false,
                error: action.payload,
            };
        default:
            return state;
    }
};
