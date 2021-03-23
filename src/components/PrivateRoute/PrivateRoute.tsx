import React, { Component, useEffect } from 'react'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'
import { useAuth } from "../../context/AuthContext";

export default function PrivateRoute<RouteProps>({ ...rest }) {
  const { currentUser } = useAuth()
  return currentUser ? <Route {...rest} /> : <Redirect to="/login" />
}



