import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import PrivateRoute from "./components/routing/PrivateRoute";
import EditProfile from "./components/profile-forms/EditProfile";
// Adjusted for React Router v6
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route
              path="/register"
              element={
                <section className="container">
                  <Register />
                </section>
              }
            />
            <Route
              path="/login"
              element={
                <section className="container">
                  <Login />
                </section>
              }
            />
            {/* Private Route */}
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <section className="container">
                    <Dashboard />
                  </section>
                </PrivateRoute>
              }
            />
            <Route
              path="/create-profile"
              element={
                <PrivateRoute>
                  <section className="container">
                    <CreateProfile />
                  </section>
                </PrivateRoute>
              }
            />
            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <section className="container">
                    <EditProfile />
                  </section>
                </PrivateRoute>
              }
            />
            <Route
              path="/add-experience"
              element={
                <PrivateRoute>
                  <section className="container">
                    <AddExperience />
                  </section>
                </PrivateRoute>
              }
            />
            <Route
              path="/add-education"
              element={
                <PrivateRoute>
                  <section className="container">
                    <AddEducation />
                  </section>
                </PrivateRoute>
              }
            />
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
