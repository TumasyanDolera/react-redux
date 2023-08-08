import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const BASE_URL = process.env.REACT_APP_URL_API;


export const apiSlice = createApi({
    reducerPath: 'getAllTasks',
    baseQuery: fetchBaseQuery({ baseUrl: `http://localhost:3004` }),
    endpoints: (builder) => ({
        getAllTasks: builder.query({
            query: () => ({
                url: `/tasks`,
                
            })
        }),
        deleteTask: builder.mutation({
            query: (taskId ) => ({
                url: `/tasks/${taskId}`,
                method: 'DELETE',
            }),
        }),
        AddTask: builder.mutation({
            query: () => ({
                url:`/tasks/`,
                method: 'POST',
                body: 'newTaskObj'
            })
        })
    }),
})


export const {useGetAllTasksQuery, useDeleteTaskMutation, useAddTaskMutation} = apiSlice;
