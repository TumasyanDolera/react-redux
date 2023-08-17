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
        
        getTask: builder.query({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: "GET"
            })
        }),
        deleteTask: builder.mutation({
            query: (taskId ) => ({
                url: `/tasks/${taskId}`,
                method: 'DELETE',
            }),
        }),
        createTask:builder.mutation({
            query: (task) => ({
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
                url: `/tasks`,
                method: 'POST',
                body: JSON.stringify(task)
            })
        }),
        putTask:builder.mutation({
            query: ({id, ...taskObj}) => ({
                url: `/tasks/${id}`,
                method: "PUT",
                body: JSON.stringify(taskObj),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        deleteCheckedTasks: builder.mutation({
            query: (payload)=>({
                url: '/tasks',
                method: 'DELETE',
                body:JSON.stringify({ids:payload}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),
        getSingleTask: builder.query({
            query: (taskId) => ({
                url: `/tasks/${taskId}`,
                method: "GET"
            })
        }),
        
    }),
})


export const {useGetSingleTaskQuery, useGetAllTasksQuery, useDeleteTaskMutation, useCreateTaskMutation, useGetTaskQuery, usePutTaskMutation, useDeleteCheckedTasksMutation} = apiSlice;
