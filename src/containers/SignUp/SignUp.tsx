import React, { useState, useEffect, useCallback } from 'react';
// import { useAuth } from "../auth/AuthContext"
import { Link, useHistory } from "react-router-dom"
import Input from "../../components/Input";

import ProviderButton from "components/ProviderButton";



export const SignUp: React.FC = () => {
  console.count('Signup Page Render')

  const emailRef = React.createRef();
  const passwordRef = React.createRef();
  const passwordRepeatRef = React.createRef();

  // Retireieve fucntions from our AuthContext
  // const { signup } = useAuth()

  // const history = useHistory()

  // const handleSubmit = async (event) => {
  //   event.preventDefault();
  //   console.log('submit form')
  //   // if (passwordRef.current.value !== passwordRepeatRef.current.value) {
  //   //   return
  //   // }
  //   // try {
  //   //   await signup(emailRef.current.value, passwordRef.current.value);
  //   //   history.push('/');
  //   // } catch (error) {
  //   //   console.log(error)
  //   // }
  // }

  const [windowMatches, setWindowMatches] = useState(false)

  // console.log(window.matchMedia("(min-width: 640px)").matches)

  const handleWindowChange = useCallback(
    (event) => {
      setWindowMatches(event.matches)
    },
    [windowMatches, setWindowMatches],
  )

  useEffect(() => {
    const test = window.matchMedia("(min-width: 640px)").addEventListener("change", handleWindowChange)

    return () => test
    // window.matchMedia("(min-width: 640px)")
    //   .removeEventListener("change", handleWindowChange)


  }, [windowMatches, handleWindowChange])


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

  // const providersButtons: React.CSSProperties = {
  //   alignItems: 'center',
  //   border: '1px solid #E4E4E7',
  //   color: '#71717A',
  //   display: 'flex',
  //   flexDirection: 'row',
  //   height: '3rem',
  //   justifyContent: 'center',
  //   overflow: 'hidden',
  //   borderRadius: '0.375rem',
  //   transitionColor: 'background-color, border-color, color, fill, stroke',
  //   transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
  //   transitionDuration: '150ms',
  //   width: '100%',
  // }

  return (
    <>
      <div style={wrapperStyle} >
        <div style={containerStyle}>
          <h3 style={headerStyle}>Sign up</h3>
          <form
            // onSubmit={() => handleSubmit}
            style={formStyle}>
            <Input
              // ref={emailRef}
              type="email"
              placeholder="Email"
              autocomplete="email"
              required />
            <Input
              // ref={passwordRef}
              type="password"
              placeholder="Password"
              autocomplete="password"
              required />
            <Input
              // ref={passwordRepeatRef}
              type="password"
              placeholder="Password"
              autocomplete="password"
              required />
            <SubmitButton></SubmitButton>
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

const SubmitButton = () => {
  console.count('button render')

  const [submitButtonHover, setSubmitButtonHover] = useState(false)
  const [submitButtonFocusState, setSubmitButtonFocusState] = useState(false)

  const submitButtonStyle: React.CSSProperties = {
    alignItems: 'center',
    backgroundColor: submitButtonHover ? '#34D399' : '#10B981',
    borderRadius: '0.375rem',
    color: '#ffffff',
    display: 'flex',
    height: '3rem',
    justifyContent: 'center',
    outline: submitButtonFocusState ? '2px solid transparent' : '',
    outlineOffset: submitButtonFocusState ? '2px' : '',
    transitionProperty: 'background-color, border-color, color, fill, stroke',
    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
    transitionDuration: '150ms',
    width: '100%',
  }

  // useEffect(() => {
  //   console.log('submit button hover')
  //   return () => {
  //     // cleanup
  //   }
  // }, [submitButtonHover])


  return (
    <button
      type="submit"
      onMouseEnter={() => setSubmitButtonHover(!submitButtonHover)}
      onMouseLeave={() => setSubmitButtonHover(!submitButtonHover)}
      onFocus={() => setSubmitButtonFocusState(!submitButtonFocusState)}
      onBlur={() => setSubmitButtonFocusState(!submitButtonFocusState)}
      style={submitButtonStyle}>
      Create Account
    </button>
  )
}
