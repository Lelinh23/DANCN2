import { addYeuThich, xoaKhoiLove, getYeuThich } from "../../Services/Love";

const loveTypes = {
    GET_LOVE: 'GET_LOVE',
    SET_IS_LOADING: 'SET_IS_LOADING',
};

const AddYeuThich = (IdNhaHang: any) => {
  return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
      type: loveTypes.SET_IS_LOADING,
      payload: true
    });
    
    addYeuThich(IdNhaHang).then(loveResponse => {
      dispatch({
        type: loveTypes.GET_LOVE,
        payload: loveResponse?.data,  
      });

      dispatch({
        type: loveTypes.SET_IS_LOADING,
        payload: false
      });

    }).catch(() => {
      dispatch({
        type: loveTypes.SET_IS_LOADING,
        payload: false
      });
    })
  }
}

const XoaKhoiLove = (IdNhaHang: any) => {
  return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
      type: loveTypes.SET_IS_LOADING,
      payload: true
    });
    xoaKhoiLove(IdNhaHang).then(loveResponse => {
      dispatch({
        type: loveTypes.GET_LOVE,
        payload: loveResponse?.data
      });
      dispatch({
        type: loveTypes.SET_IS_LOADING,
        payload: false
      });
    }).catch(() => {
      dispatch({
        type: loveTypes.SET_IS_LOADING,
        payload: false
      });
    })
  }
}

const GetLove = () => {
  return (dispatch: (arg0: { type: string; payload: any; }) => void) => {
    dispatch({
      type: loveTypes.SET_IS_LOADING,
      payload: true
    });
    getYeuThich().then(loveResponse => {
      dispatch({
        type: loveTypes.GET_LOVE,
        payload: loveResponse?.data
      });

      dispatch({
        type: loveTypes.SET_IS_LOADING,
        payload: false
      });
    }).catch(() => {
      dispatch({
        type: loveTypes.SET_IS_LOADING,
        payload: false
      });
    })
  }
}

export { loveTypes, AddYeuThich, XoaKhoiLove, GetLove};