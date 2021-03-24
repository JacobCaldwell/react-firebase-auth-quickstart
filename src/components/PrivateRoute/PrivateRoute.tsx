import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute<RouteProps>({ ...rest }) {
  const { currentUser, isLoading } = useAuth()
  return (currentUser || isLoading) ? <Route {...rest} /> : <Redirect to="/login" />
}



