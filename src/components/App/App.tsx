import React from 'react';
// import './App.css';
import { AuthProvider } from "../../context/AuthContext";
import Login from "../Login";
import SignUp from "../SignUp";

// import { Container } from 'react-bootstrap';
import { PrivateRoute } from '../PrivateRoute';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


function App() {

  return (
    <div className="App">
      {/* <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}> */}
      <Router>
        <AuthProvider>

          <Switch>
            {/* <PrivateRoute path="/app" component={Dashboard} /> */}
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>

          {/* <PrivateRoute exact path="/" component={Login}/>           */}
          {/* <div>
            <Login />
          </div> */}
          {/* <InternalComp></InternalComp> */}
          {/* <SignUp /> */}


        </AuthProvider>
      </Router>
      {/* </Container> */}



    </div>
  );
}

export default App;
