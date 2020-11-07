import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Login from "../views/Login";

export const AuthRouter = () => {
  return (
    <Switch>
      <Route exact path="/auth/login" component={Login} />

      <Redirect to="/auth/login" />
    </Switch>
  );
};
