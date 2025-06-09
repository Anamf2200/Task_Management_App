import { useSelector } from "react-redux";
import type { RootState } from "../app/store";
import { Navigate } from "react-router-dom";
import type { JSX } from "react";





export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
 const token = useSelector((state: RootState) => state.auth.token);
  const tokenFromStorage = localStorage.getItem('token');

  const isAuthenticated = token || tokenFromStorage;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};