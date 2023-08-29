import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
const USER_URL_API = process.env.REACT_APP_URL_API_USER;
const TEST = process.env.REACT_APP_URL_API_USER


export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: fetchBaseQuery({
        baseUrl: USER_URL_API
    }),
    endpoints: (bulder) => ({
        registerNewUser: bulder.mutation({
            query: ({name, surname, password }) => ({
                url: '/Register',
                method: 'POST',
                body: JSON.stringify({ name, surname, email: "eve.holt@reqres.in", password}),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        }),

        logIn: bulder.mutation({
            query:({name, surname, password})=>({
                url: '/LogIn',
                method: 'POST',
                body: JSON.stringify({name, surname, email: "eve.holt@reqres.in", password }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
        })


    })
})

export const { useRegisterNewUserMutation, useLogInMutation } = userApi;