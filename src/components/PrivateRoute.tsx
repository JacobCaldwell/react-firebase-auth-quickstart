import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export const PrivateRoute: React.FC = ({component: Component, ...rest}: any)  => {
    const { currentUser } = useAuth()
    return (
        <Route {...rest} render={props =>{
            return currentUser ? <Component {...props}/> : <Redirect to="/login"/>
        }}></Route>
    )
}

