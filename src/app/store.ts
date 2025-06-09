import { configureStore } from '@reduxjs/toolkit'
import { userApi } from '../redux/users/user.Api'
import { authApi } from '../redux/users/auth/auth.Api'
import authReducer from '../redux/users/auth/authSlice';
import { taskApi } from '../redux/tasks/tasks.Api';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,  
    [authApi.reducerPath]: authApi.reducer,  
    auth: authReducer,  
    [taskApi.reducerPath]: taskApi.reducer,  
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(authApi.middleware)
      .concat(taskApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
