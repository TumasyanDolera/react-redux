import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './API';
import tasksReducer from './Reducer';


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        tasksReducer: tasksReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
})

export default store