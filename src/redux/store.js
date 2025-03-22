import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "../services/authApi";
import { userApi } from "../services/userApi";
import { diseaseApi } from "../services/diseaseApi";
import { productApi } from "../services/productApi";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [diseaseApi.reducerPath]: diseaseApi.reducer,
        [productApi.reducerPath]: productApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        userApi.middleware,
        diseaseApi.middleware,
        productApi.middleware
    ),
})

export default store