import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type { Task } from './task.type';
export const taskApi = createApi({

    
    reducerPath:'task',
    baseQuery:fetchBaseQuery({baseUrl: 'http://localhost:3000/', prepareHeaders: (headers) => {
      const token = localStorage.getItem('token')

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
            console.log("Token being set:", token);

      return headers },
}),
    
    
    tagTypes:['Task'],
    endpoints: (builder) => ({
        getTasks: builder.query<Task[], void>({
          query: () => 'tasks',
          providesTags: ['Task'],
        }),
        addTask: builder.mutation<Task, Partial<Task>>({
         query: (newProduct) => ({
           url: 'tasks',
           method: 'POST',
           body: newProduct,
         }),
         invalidatesTags: ['Task'],
       }),
       updateTask: builder.mutation<Task, Task>({
         query: (product) => ({
           url: `tasks/${product.id}`,
           method: 'PUT',
           body: product,
         }),
         invalidatesTags: ['Task'],
       }),

    
       deleteTask: builder.mutation<{ success: boolean }, number>({
         query: (id) => ({
           url: `tasks/${id}`,
           method: 'DELETE',
         }),
         invalidatesTags: ['Task'],
       }),
      }),
    
});

export const { useGetTasksQuery, useAddTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation}= taskApi;



