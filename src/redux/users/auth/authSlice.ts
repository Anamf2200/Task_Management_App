import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  email: string;
  role: string;
}


interface AuthState {
 token: string | null;
   user: User | null;

}

const storedAuth = localStorage.getItem('auth');
const parsedAuth = storedAuth ? JSON.parse(storedAuth) : null;

const initialState: AuthState = {
  token: parsedAuth?.token || null,
  user: parsedAuth?.user || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token } = action.payload;
      state.token = token;
      localStorage.setItem('auth', JSON.stringify({ token }));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      localStorage.removeItem('auth');
    },
  },
});
export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;









