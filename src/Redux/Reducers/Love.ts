import { loveTypes } from "../Actions/LoveAction";

interface CartState { // Define the type of cartItem as needed 
    love: [];
    isLoading: boolean; 
}

const initialState: CartState = { 
    love: [], 
    isLoading: false ,
}

const loveReducer = (state = initialState, action: any) => { 
    switch (action.type) { 
        case loveTypes.GET_LOVE:
            return { 
                ...state, love: action.payload 
            }; 
        case loveTypes.SET_IS_LOADING: 
            return { 
                ...state,  isLoading: action.payload 
            }; 
        default: 
            return state; 
    } 
}
export { loveReducer }
