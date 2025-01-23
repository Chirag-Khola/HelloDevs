import React, { Fragment , useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Navbar from "./components/layout/Navbar";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Landing from "./components/layout/Landing";
// Redux
import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

if(localStorage.token){
  setAuthToken(localStorage.token);
}

function App() {

  useEffect(() => {
    store.dispatch(loadUser());

  } , []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          {/* Alert component should be outside of Routes */}
          <Alert />
          <Routes>
            <Route exact path="/" element={<Landing />} />
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
          </Routes>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

