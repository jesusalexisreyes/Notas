import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { useDispatch } from "react-redux";

import { PrivateRoute } from "./PrivateRouter";
import { firebase } from "../firebase/firebaseConfig";
import { AuthRouter } from "./AuthRouter";
import Dashboard from "../views/Dashboard";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";
import { PublicRoute } from "./PublicRouter";
import Cargando from "../components/Cargando";
import Error from "../views/Error";


export const AppRouter = () => {
  const dispatch = useDispatch();

  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);
        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setChecking(false);
    });
  }, [dispatch, setChecking, setIsLoggedIn]);

  if (checking) {
    return (
      <Cargando/>
    );
  }

  return (
    <Router>
      <Switch>
        <PublicRoute
          path="/auth"
          isAuthenticated={isLoggedIn}
          component={AuthRouter}
        />

        <PrivateRoute
          exact
          isAuthenticated={isLoggedIn}
          path="/"
          component={Dashboard}
        />

        <Route path="*">
          <Error />
        </Route>
      </Switch>
    </Router>
  );
};
