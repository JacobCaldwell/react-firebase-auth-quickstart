import React from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";
import { ProviderButton, Input, Button } from 'components'

export const Login: React.FC = () => {

  const emailRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();

  const { login } = useAuth()

  const history = useHistory()

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault()
    if ((emailRef.current) && (passwordRef.current)) {
      const { value: email } = emailRef.current
      const { value: password } = passwordRef.current
      if (!email || !password) {
        // todo: add error handling and validation for null states
        return
      }
      try {
        await login(email, password)
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