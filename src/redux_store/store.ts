import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./pageReducer";

const store = configureStore({
    reducer: {
        pageReducer: pageReducer,
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
