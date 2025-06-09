import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";



export const authApi=createApi({
    reducerPath:'authApi',
    baseQuery:fetchBaseQuery({baseUrl:'http://localhost:3000/',}),
    endpoints:(builder)=>({
        login:builder.mutation<{access_token:string},{email:string,password:string}>({
            query:(credentials)=>({
                url:'/auth/login',
                method:'POST',
                body:credentials
            }),
        })
    })

})

export const {useLoginMutation}=authApi