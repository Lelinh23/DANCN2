import { addToCart, getCartItem, XoaFromCart } from "../../Services/Cart";

const Types = {
    GET_CART_ITEMS: 'GET_CART_ITEMS',
    SET_IS_LOADING: 'SET_IS_LOADING',
    ADD_TO_CART:  'ADD_TO_CART',
    XOA_FROM_CART: 'XOA_FROM_CART'
};

const AddToCart = (foodId: any) => {
  return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
      type: Types.SET_IS_LOADING,
      payload: true
    });
    
    addToCart(foodId).then(cartResponse => {
      dispatch({
        type: Types.GET_CART_ITEMS,
        payload: cartResponse?.data,  
      });

      dispatch({
        type: Types.SET_IS_LOADING,
        payload: false
      });

    }).catch(() => {
      dispatch({
        type: Types.SET_IS_LOADING,
        payload: false
      });
    })
  }
}

const xoadFromCart = (foodId: any) => {
  return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
      type: Types.SET_IS_LOADING,
      payload: true
    });
    XoaFromCart(foodId).then(cartResponse => {
      dispatch({
        type: Types.GET_CART_ITEMS,
        payload: cartResponse?.data
      });
      dispatch({
        type: Types.SET_IS_LOADING,
        payload: false
      });
    }).catch(() => {
      dispatch({
        type: Types.SET_IS_LOADING,
        payload: false
      });
    })
  }
}

const GetCartItem = () => {
  return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
      type: Types.SET_IS_LOADING,
      payload: true
    });
    getCartItem().then(cartResponse => {
      dispatch({
        type: Types.GET_CART_ITEMS,
        payload: cartResponse?.data
      });

      dispatch({
        type: Types.SET_IS_LOADING,
        payload: false
      });
    }).catch(() => {
      dispatch({
        type: Types.SET_IS_LOADING,
        payload: false
      });
    })
  }
}

export { Types, AddToCart, xoadFromCart, GetCartItem };