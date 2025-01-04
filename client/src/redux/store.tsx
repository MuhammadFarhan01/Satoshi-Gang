import { configureStore } from "@reduxjs/toolkit";
import BaseApi from "./api/BaseApi";

const ReduxStore = configureStore({
    reducer: {
        'api': BaseApi.reducer
    },
    middleware: (getDefaultMiddlewars) => getDefaultMiddlewars({}).concat(BaseApi.middleware)
});

export default ReduxStore;