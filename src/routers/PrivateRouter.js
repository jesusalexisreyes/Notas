import React from "react";
import PropTypes from "prop-types";

import { Route, Redirect } from "react-router-dom";
import { Navbar } from "../components/layouts/Navbar";

export const PrivateRoute = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => {
  return (
    <div>

      <div>
        <Navbar />
        <div>
          <main>
            <Route
              {...rest}
              component={(props) =>
                isAuthenticated ? (
                  <Component {...props} />
                ) : (
                  <Redirect to="/auth/login" />
                )
              }
            />
          </main>
        </div>
      </div>
    </div>
  );
};

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
};
