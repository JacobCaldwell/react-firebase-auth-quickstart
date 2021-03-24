import React, { useState } from 'react';
import { useAuth } from 'context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import { Button, Input, ProviderButton } from "components";
import { wrapperStyle, containerStyle, headerStyle, formStyle, textStyle, providersContainer } from "styles/CommonStyles";

export const SignUp: React.FC = () => {

  const emailRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const passwordRepeatRef = React.createRef<HTMLInputElement>();

  const { signup, signInWithProvider } = useAuth()

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

  const handleSignInWithProvider =
    async (provider: Parameters<typeof signInWithProvider>[0]) => {
      try {
        await signInWithProvider(provider)
        history.push('/dashboard')
      } catch (error) {
        console.log(error);
      }
    }

  const flexDirStyle: React.CSSProperties = {
    flexDirection: true ? 'row' : 'column',
    // todo: add media query to change direction on page size
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
          <div style={{ ...providersContainer, ...flexDirStyle }}>
            <ProviderButton
              name="Facebook"
              src="https://bit.ly/38YlZ4U"
              onClick={() => handleSignInWithProvider('facebook')} />
            <ProviderButton
              name="Google"
              src="https://bit.ly/2P9OzJw"
              onClick={() => handleSignInWithProvider('google')} />
            <ProviderButton
              name="Apple"
              src="https://bit.ly/3tDpV2I"
              onClick={() => { }} />
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