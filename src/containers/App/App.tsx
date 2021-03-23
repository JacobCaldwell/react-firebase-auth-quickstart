import React from 'react';
import { AuthProvider } from "../../context/AuthContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Login, SignUp, Dashboard } from "containers";
import PrivateRoute from "components/PrivateRoute";


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Router>
          <Switch>
            <PrivateRoute exact path="/dashboard" component={Dashboard} />
            {/* <Route exact path="/" component={Login} /> */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;