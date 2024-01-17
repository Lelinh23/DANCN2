import { getAllOrder, placeOrder, trackOrder } from '../../Services/Order';

const orderTypes = {
    PLACE_ORDER: 'PLACE_ORDER',
    PLACE_ORDER_SUCCESS: 'PLACE_ORDER_SUCCESS',
    SET_IS_LOADING: 'SET_IS_LOADING',
};

const OrderFood = (email: any, address: any) => {
  return async (dispatch: any) => {
      dispatch({
          type: orderTypes.PLACE_ORDER,
          payload: true
      });

      try {
          const orderResponse = await placeOrder(email, address);
          dispatch({
              type: orderTypes.PLACE_ORDER_SUCCESS,
              payload: orderResponse?.data
          });

          dispatch({
              type: orderTypes.SET_IS_LOADING,
              payload: false
          });

          return orderResponse?.data; // Trả về dữ liệu từ action
      } catch (error) {
          dispatch({
              type: orderTypes.SET_IS_LOADING,
              payload: false
          });
      }
  }
}

const GetAllOrders = (email: any) => {
    return async (dispatch: (arg0: { type: string; payload: any; }) => void) => {
        dispatch({ 
          type: orderTypes.PLACE_ORDER,
          payload: true
         });

        getAllOrder(email).then(response => {
          dispatch({
            type: orderTypes.PLACE_ORDER_SUCCESS,
            payload: response.data,
          });
          dispatch({
            type: orderTypes.SET_IS_LOADING,
            payload: false
          });
        }).catch(() => {
          dispatch({
              type: orderTypes.SET_IS_LOADING,
              payload: false
          });
        }
      )
    };
};

const TrackOrder = (_id: any) => {
  return async (dispatch: any) => {
      dispatch({
          type: orderTypes.PLACE_ORDER,
          payload: true
      });

      try {
          const orderResponse = await trackOrder(_id);
          dispatch({
              type: orderTypes.PLACE_ORDER_SUCCESS,
              payload: orderResponse?.data
          });

          dispatch({
              type: orderTypes.SET_IS_LOADING,
              payload: false
          });

          return orderResponse?.data; // Trả về dữ liệu từ action
      } catch (error) {
          dispatch({
              type: orderTypes.SET_IS_LOADING,
              payload: false
          });
      }
  }
}
export {orderTypes, OrderFood, GetAllOrders, TrackOrder}
