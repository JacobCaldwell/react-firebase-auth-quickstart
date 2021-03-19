import React, { FormEvent, ReactEventHandler } from 'react'
import { Card, Form, Button, Alert } from "react-bootstrap"
import { useRef, useState } from "react";
import { useAuth } from "../../context/AuthContext";
// import { Link } from "react-router-dom";



export const Login: React.FC = () => {

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const passwordRepeatRef = useRef(null)
    const { signInWithEmailAndPassword, logout, user } = useAuth()
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    // const [loading, setLoading] = useState()

    const handleFormSubmit = async (event: FormEvent) => {
        event.preventDefault()
        if ((emailRef.current) && (passwordRef.current)) {
            await signInWithEmailAndPassword(emailRef.current.value, passwordRef.current.value)
        }
    }


    return (
        <>
            <Card>
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {/* {JSON.stringify(currentUser && currentUser)} */}
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef} required />
                        </Form.Group>
                        {/* <Form.Group id="password-repeat">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordRepeatRef} required />
                        </Form.Group> */}
                        <Button className="w-100" type="submit" disabled={loading}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                {/* Already have an account? <Link to="/login">Login</Link> */}
                {JSON.stringify(user)}
            </div>
        </>
    )
}

export default Login
