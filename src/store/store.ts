import { configureStore } from '@reduxjs/toolkit';
import digitReducer from './digitSlice';

export const store = configureStore({
	reducer: {
		digit: digitReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
