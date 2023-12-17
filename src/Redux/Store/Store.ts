import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {QuanLyChung}from '../Reducers/QuanLyChung';
import {cartReducer}from '../Reducers/Cart';
import { loveReducer } from '../Reducers/Love';
import { orderReducer } from '../Reducers/orderReducer';

const store = configureStore({
  reducer: {
    datHang: orderReducer,
    loveState: loveReducer,
    cartState: cartReducer,
    QuanLyChung: QuanLyChung,
  },
  middleware: [thunk],
});

const getToken = () => store?.getState()?.QuanLyChung?.token

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store, getToken };
