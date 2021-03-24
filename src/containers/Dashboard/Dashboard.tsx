import React, { useState } from 'react'
import { useAuth } from "../../context/AuthContext"
import { Button } from "components";

export default function Dashboard() {
  const { currentUser, logout } = useAuth()

  const displayName = currentUser ? currentUser.displayName : 'null'
  const email = currentUser ? currentUser.email : 'null'
  const photoURL = currentUser ? currentUser.photoURL : 'null'
  const uid = currentUser ? currentUser.uid : 'null'

  const wrapperStyle: React.CSSProperties = {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    justifyContent: 'center',
  }

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    maxWidth: '28rem',
    padding: '1.25rem',
    width: '100%',

  }

  const headerStyle: React.CSSProperties = {
    fontSize: '1.875rem',
    fontWeight: 700,
    lineHeight: '2.25rem',
    paddingBottom: '1.75rem',
    textAlign: 'center',
  }

  const textStyle: React.CSSProperties = {
    color: '#71717A',
    fontSize: '0.75rem',
    lineHeight: '1rem',
    paddingBottom: '1.25rem',
    paddingTop: '1.25rem',
    textAlign: 'center',
    textTransform: 'uppercase',
  }

  return (
    <>
      <div style={wrapperStyle} >
        <div style={containerStyle}>
          <h3 style={headerStyle}>Dashboard</h3>
          <div style={textStyle}>display name: {displayName}</div>
          <div style={textStyle}>email: {email}</div>
          <div style={textStyle}>photoURL: {photoURL}</div>
          <div style={textStyle}>uid: {uid}</div>
          <Button onClick={() => logout()} name="Logout" />
        </div>
      </div>
    </>
  )
}




