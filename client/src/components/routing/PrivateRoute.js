import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, auth: { isAuthenticated, loading } }) => {
  console.log("PrivateRoute Debug:", { isAuthenticated, loading }); // Debug log

  if (loading) {
    return <div>Loading...</div>; // Loading placeholder
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
