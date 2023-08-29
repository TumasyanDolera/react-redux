import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '../Services/API';
import tasksReducer from '../Features/Reducer';
import { userApi } from '../Services/UserApi';
import userReducer from '../Features/userReducer';


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userApi.reducerPath]: userApi.reducer,
        tasksReducer: tasksReducer,
        userReducer: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware, userApi.middleware),
})

export default store