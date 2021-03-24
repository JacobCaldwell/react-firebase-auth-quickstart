import React, { useState } from 'react'
import { useAuth } from "context/AuthContext"
import { Button } from "components";
import { wrapperStyle, containerStyle, headerStyle, textStyle } from "styles/CommonStyles";

export default function Dashboard() {
  const { currentUser, logout } = useAuth()

  const email = currentUser ? currentUser.email : 'loading...'
  const uid = currentUser ? currentUser.uid : 'loading...'

  return (
    <>
      <div style={wrapperStyle} >
        <div style={containerStyle}>
          <h3 style={headerStyle}>Dashboard</h3>
          <div style={textStyle}>email: {email}</div>
          <div style={textStyle}>uid: {uid}</div>
          <Button onClick={() => logout()} name="Logout" />
        </div>
      </div>
    </>
  )
}




