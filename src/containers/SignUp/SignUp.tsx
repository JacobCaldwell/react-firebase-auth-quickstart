import React, { useState } from 'react';
import { useAuth } from '../../context/newAuthContext'
import { Link, useHistory } from "react-router-dom"
import { Button, Input, ProviderButton } from "components";

export const SignUp: React.FC = () => {

  const emailRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const passwordRepeatRef = React.createRef<HTMLInputElement>();

  const { signup } = useAuth()

  const history = useHistory()

  const handleSubmit = async (e: React.MouseEvent) => {
    console.log('button click')
    e.preventDefault()
    if ((emailRef.current) && (passwordRef.current)) {
      const { value: email } = emailRef.current
      const { value: password } = passwordRef.current
      console.log({ email, password })
      try {
        await signup(email, password)
        history.push('/dashboard')
      } catch (error) {
        console.log(error)
      }
    }
  }

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

  const formStyle: React.CSSProperties = {
    alignItems: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
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

  const providersContainer: React.CSSProperties = {
    display: 'flex',
    gap: '0.75rem',
    flexDirection: true ? 'row' : 'column',
    justifyContent: 'space-between',
    rowGap: '0.75rem',
  }


  return (
    <>
      <div style={wrapperStyle} >
        <div style={containerStyle}>
          <h3 style={headerStyle}>Sign up</h3>
          <form
            style={formStyle}>
            <Input
              ref={emailRef}
              type="email"
              placeholder="Email"
              autocomplete="email"
              required />
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              autocomplete="password"
              required />
            <Input
              ref={passwordRepeatRef}
              type="password"
              placeholder="Password"
              autocomplete="password"
              required />
            <Button
              name="Create Account"
              onClick={handleSubmit}
            />
          </form>
          <p style={textStyle}>or sign up with</p>
          <div style={providersContainer}>
            <ProviderButton
              name="Facebook"
              src="https://bit.ly/38YlZ4U" />
            <ProviderButton
              name="Google"
              src="https://bit.ly/2P9OzJw" />
            <ProviderButton
              name="Apple"
              src="https://bit.ly/3tDpV2I" />
          </div>
          <div style={textStyle}>
            Already have an account?
            <Link
              style={{
                color: 'inherit',
                fontSize: 'inherit',
                textDecoration: 'inherit'
              }}
              to="/login"
            > Login</Link>
          </div>
        </div>
      </div>
    </>
  )
}