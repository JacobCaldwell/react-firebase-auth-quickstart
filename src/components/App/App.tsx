import React from 'react';
// import './App.css';
import { AuthProvider } from "../../context/AuthContext";
import Login from "../Login";
import { Container } from 'react-bootstrap';
import { PrivateRoute } from '../PrivateRoute';

function App() {

  return (
    <div className="App">
      <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
        <AuthProvider>

          {/* <PrivateRoute exact path="/" component={Login}/>           */}
          {/* <div>
            <Login />
          </div> */}
          {/* <InternalComp></InternalComp> */}
          <Login />


        </AuthProvider>
      </Container>



    </div>
  );
}

export default App;
