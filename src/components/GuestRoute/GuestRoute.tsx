import React from 'react'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { useAuth } from "context/AuthContext";

export default function GuestRoute<RouteProps>({ ...rest }) {
  const { currentUser, isLoading } = useAuth()
  return (currentUser && isLoading) ? <Redirect to="/dashboard" /> : <Route {...rest} />
}