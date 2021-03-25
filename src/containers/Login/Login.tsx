import React from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "context/AuthContext";
import { ProviderButton, Input, Button } from 'components'
import { wrapperStyle, containerStyle, headerStyle, formStyle, textStyle, providersContainer } from "styles/CommonStyles";

export const Login: React.FC = () => {

  const emailRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();

  const { login, signInWithProvider } = useAuth()

  const history = useHistory()

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault()

    const email = emailRef.current && emailRef.current.value
    const password = passwordRef.current && passwordRef.current.value

    if (!email) {
      // todo: add error handling
      console.log('no email entered');
      return
    }

    if (!password) {
      // todo: add error handling
      console.log('passwords can not be left blank');
      return
    }

    try {
      await login(email, password)
      history.push('/dashboard')
    } catch (error) {
      console.log(error)
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
          <h3 style={headerStyle}>Login</h3>
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
            <Button
              name="Login"
              onClick={handleSubmit}
            />
          </form>
          <p style={textStyle}>or sign in with</p>
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
            Need an account?
            <Link
              style={{
                color: 'inherit',
                fontSize: 'inherit',
                textDecoration: 'inherit'
              }}
              to="/signup"
            > Sign up</Link>
          </div>
        </div>
      </div>
    </>
  )
}