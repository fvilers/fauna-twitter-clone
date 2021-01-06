import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./containers/AuthProvider";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/sign-up" component={SignUpPage} />
          <Route exact path="/sign-in" component={SignInPage} />
          <Route exact path="/u/:username" component={UserPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
