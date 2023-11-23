import { configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {QuanLyChung}from '../Reducers/QuanLyChung';

const store = configureStore({
  reducer: {
    QuanLyChung: QuanLyChung
  },
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export { store };
