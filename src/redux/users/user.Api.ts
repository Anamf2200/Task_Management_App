import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
 import type { User } from './user.type';
export const userApi = createApi({
    
    reducerPath:'api',
    baseQuery:fetchBaseQuery({baseUrl: 'http://localhost:3000/', prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers },
}),
    
    
    tagTypes:['User'],
    endpoints: (builder) => ({
        getUsers: builder.query<User[], void>({
          query: () => 'users',
          providesTags: ['User'],
        }),
        addUser: builder.mutation<User, Partial<User>>({
         query: (newProduct) => ({
           url: 'users',
           method: 'POST',
           body: newProduct,
         }),
         invalidatesTags: ['User'],
       }),
       updateUser: builder.mutation<User, User>({
         query: (product) => ({
           url: `users/${product.id}`,
           method: 'PUT',
           body: product,
         }),
         invalidatesTags: ['User'],
       }),
       deleteUser: builder.mutation<{ success: boolean }, number>({
         query: (id) => ({
           url: `users/${id}`,
           method: 'DELETE',
         }),
         invalidatesTags: ['User'],
       }),
      }),
    
});

export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation}= userApi;



// import type { User } from './user.type';

// export const userApi = createApi({
//  reducerPath: 'api', // optional name for the reducer
//  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
//  tagTypes: ['User'],
//  endpoints: (builder) => ({
//    getUsers: builder.query<User[], void>({
//      query: () => 'users',
//      providesTags: ['User'],
//    }),
//    addUser: builder.mutation<User, Partial<User>>({
//     query: (newProduct) => ({
//       url: 'users',
//       method: 'POST',
//       body: newProduct,
//     }),
//     invalidatesTags: ['User'],
//   }),
//   updateUser: builder.mutation<User, User>({
//     query: (product) => ({
//       url: `users/${product.id}`,
//       method: 'PUT',
//       body: product,
//     }),
//     invalidatesTags: ['User'],
//   }),
//   deleteUser: builder.mutation<{ success: boolean }, number>({
//     query: (id) => ({
//       url: `users/${id}`,
//       method: 'DELETE',
//     }),
//     invalidatesTags: ['User'],
//   }),
//  }),
// });

// export const { useGetUsersQuery, useAddUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;