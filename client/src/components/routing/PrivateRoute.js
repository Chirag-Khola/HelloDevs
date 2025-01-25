import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({ auth: { isAuthenticated, loading } }) => {
  if (loading) {
    return <div>Loading...</div>; // Optionally display a loading spinner
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
    loading: PropTypes.bool.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
