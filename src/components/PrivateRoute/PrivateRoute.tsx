import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute<RouteProps>({ ...rest }) {
  const { currentUser } = useAuth()
  return currentUser ? <Route {...rest} /> : <Redirect to="/login" />
}



