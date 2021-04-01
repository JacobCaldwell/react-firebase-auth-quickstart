import React from 'react';
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login, SignUp, Dashboard, ForgotPassword } from "containers";
import { PrivateRoute, GuestRoute } from "components";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            <GuestRoute exact path="/" component={Login} />
            <GuestRoute path="/login" component={Login} />
            <GuestRoute path="/signup" component={SignUp} />
            <GuestRoute path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;