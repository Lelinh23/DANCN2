import { Types } from "../Actions/CartAction";

interface CartState { // Define the type of cartItem as needed 
    cart: {};
    isLoading: boolean; 
}

const initialState = { 
    cart: {}, 
    isLoading: false ,
}

const cartReducer = (state: CartState = initialState, action: any) => { 
    switch (action.type) { 
        case Types.GET_CART_ITEMS:
            return { 
                ...state, cart: action.payload 
            }; 
        case Types.SET_IS_LOADING: 
            return { 
                ...state,  isLoading: action.payload 
            }; 
        default: 
            return state; 
    } 
}
export { cartReducer }
