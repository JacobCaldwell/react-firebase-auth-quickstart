import React, { useState } from 'react'
import { Link, useHistory } from "react-router-dom"
import { useAuth } from "context/AuthContext";
import { Input, Button } from 'components'
import { wrapperStyle, containerStyle, headerStyle, formStyle, textStyle, errorMsgContainerStyle, errorMsgStyle } from "styles/CommonStyles";

export const ForgotPassword: React.FC = () => {

  const emailRef = React.createRef<HTMLInputElement>();

  const { forgot } = useAuth()
  const [errorMsg, setErrorMsg] = useState<String | null>(null)
  const history = useHistory()

  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault()

    const email = emailRef.current && emailRef.current.value

    if (!email) {
      setErrorMsg('no email entered')
      return
    }

    try {
      await forgot(email)
      setErrorMsg('check your email to reset your password')
      // history.push('/login')
    } catch ({ code }) {
      setErrorMsg('could not reset password, try again later')
    }
  }

  return (
    <>
      <div style={wrapperStyle} >
        <div style={containerStyle}>
          <h3 style={headerStyle}>Forgot Password</h3>
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
              checkValidity={false}
              required />
            <Button
              name="Reset"
              onClick={handleSubmit}
            />
          </form>
          <div style={textStyle}>
            already have an account?
            <Link to="/login"> login</Link>
          </div>
        </div>
      </div>
    </>
  )
}