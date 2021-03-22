import React, { FormEvent, ReactEventHandler } from 'react'
import { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom"

import { useAuth } from "../../context/AuthContext";
import Input from '../../components/Input';
import ProviderButton from 'components/ProviderButton'



export const Login: React.FC = () => {

  const emailRef = React.createRef<HTMLInputElement>();
  const passwordRef = React.createRef<HTMLInputElement>();



  const { signInWithEmailAndPassword } = useAuth()
  const history = useHistory()
  // const [error, setError] = useState(null)
  // const [loading, setLoading] = useState(false)


  // // const [loading, setLoading] = useState()


  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault()
    if ((emailRef.current) && (passwordRef.current)) {
      const { value: email } = emailRef.current
      const { value: password } = passwordRef.current
      if (!email || !password) {
        // todo: add error handling and validation for null states
        return
      }
      await signInWithEmailAndPassword(email, password)
        .then(() => {
          history.push('/dashboard')
        })
        .catch((error: Error) => {
          console.log(error)
        })
    }
  }

  // const handleFormSubmit = async (event: FormEvent) => {
  //   event.preventDefault()
  //   if ((emailRef.current) && (passwordRef.current)) {
  //     await signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
  //   }
  // }


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
            <SubmitButton
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


    // <>
    //   <Card>
    //     <Card.Body>
    //       <h2 className="text-center mb-4">Sign Up</h2>
    //       {/* {JSON.stringify(currentUser && currentUser)} */}
    //       {error && <Alert variant="danger">{error}</Alert>}
    //       <Form onSubmit={handleFormSubmit}>
    //         {/* <Form.Group id="email">
    //                         <Form.Label>Email</Form.Label>
    //                         <Form.Control type="email" ref={emailRef} required />
    //                     </Form.Group> */}
    //         {/* <Input type="email" placeholder="Email" autocomplete="email" ref={emailRef} required /> */}
    //         <Form.Group id="password">
    //           <Form.Label>Password</Form.Label>
    //           <Form.Control type="password" ref={passwordRef} required />
    //         </Form.Group>
    //         {/* <Form.Group id="password-repeat">
    //                         <Form.Label>Password Confirmation</Form.Label>
    //                         <Form.Control type="password" ref={passwordRepeatRef} required />
    //                     </Form.Group> */}
    //         <Button className="w-100" type="submit" disabled={loading}>Sign Up</Button>
    //       </Form>
    //     </Card.Body>
    //   </Card>
    //   <div className="w-100 text-center mt-2">
    //     {/* Already have an account? <Link to="/login">Login</Link> */}

    //   </div>

    //   {/* {JSON.stringify(user)} */}
    // </>
  )
}

type SubmitButtonProps = {
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

const SubmitButton: React.FC<SubmitButtonProps> = (props) => {
  // console.count('button render')

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
      onClick={props.onClick}
      onMouseEnter={() => setSubmitButtonHover(!submitButtonHover)}
      onMouseLeave={() => setSubmitButtonHover(!submitButtonHover)}
      onFocus={() => setSubmitButtonFocusState(!submitButtonFocusState)}
      onBlur={() => setSubmitButtonFocusState(!submitButtonFocusState)}
      style={submitButtonStyle}>
      Create Account
    </button>
  )
}


export default Login
