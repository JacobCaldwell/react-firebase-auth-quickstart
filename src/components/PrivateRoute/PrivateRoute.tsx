import { useAuth } from "../../context/AuthContext";
import React, { useEffect } from 'react'
import { Redirect, Route, RouteProps, useLocation } from 'react-router-dom'


export const PrivateRoute: React.FC<RouteProps> = ({ ...routerProps }) => {
  // const currentLocation = useLocation()

  const { user } = useAuth()


  return user ? <Route {...routerProps} /> : <Redirect to='/login' />


}



