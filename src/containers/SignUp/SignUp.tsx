import React, { useReducer, useState } from 'react';
import { useAuth } from 'context/AuthContext'
import { Link, useHistory } from "react-router-dom"
import { Button, Input, ProviderButton } from "components";
import { wrapperStyle, containerStyle, headerStyle, formStyle, textStyle, providersContainer, errorMsgContainerStyle, errorMsgStyle } from "styles/CommonStyles";
// import { reducer } from "helpers/Validation";

export const SignUp: React.FC = () => {

  const emailRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();
  const passwordRepeatRef = React.createRef<HTMLInputElement>();
  const [emailValid, setEmailValidity] = useState(true)
  const [errorMsg, setErrorMsg] = useState<String | null>(null)
  const { signup, signInWithProvider } = useAuth()
  const history = useHistory()

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()

    const email = emailRef.current && emailRef.current.value
    const password = passwordRef.current && passwordRef.current.value
    const passwordRepeat = passwordRepeatRef.current && passwordRepeatRef.current.value

    if (!email) {
      setErrorMsg('no email entered')
      return
    }

    if (!emailValid) {
      setErrorMsg('email is not valid')
      return
    }

    if (!password || !passwordRepeat) {
      setErrorMsg('must enter password')
      return
    }

    if (password !== passwordRepeat) {
      setErrorMsg("passwords don't match");
      return
    }

    if (!password.match("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$")) {
      setErrorMsg('password complexity not met');
      return
    }

    try {
      await signup(email, password)
      history.push('/dashboard')
    } catch ({ code }) {
      if (code == "auth/email-already-in-use") {
        setErrorMsg('email address already in use')
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
          {errorMsg ? <div style={errorMsgContainerStyle}>
            <div style={errorMsgStyle}>
              {errorMsg}
            </div>
          </div> : ''}
          <form
            style={formStyle}>
            <Input
              ref={emailRef}
              type="email"
              placeholder="Email"
              autocomplete="email"
              onValidityChange={(e) => setEmailValidity(e)}
              setValidity={emailValid}
              required />
            <Input
              ref={passwordRef}
              type="password"
              placeholder="Password"
              autocomplete="password"
              setValidity={true}
              required />
            <Input
              ref={passwordRepeatRef}
              type="password"
              placeholder="Password"
              autocomplete="password"
              setValidity={true}
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