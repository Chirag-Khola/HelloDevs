import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layout/Spinner";
import { DashboardActions } from "./DashboardActions";
import { getCurrentProfile } from "../../actions/profile";
import Experience from "./Experience";
import Education from './Education';
import { deleteAccount } from "../../actions/profile";

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount
}) => {
  console.log("Dashboard component rendered"); // Debug log
  useEffect(() => {
    console.log("Dashboard: useEffect triggered");
    getCurrentProfile();
  }, []);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user" /> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />

          <div className="my-2">
            <buuton className = "button.btn.btn-danger" onClick={() => deleteAccount()}>
              <is className="fas fa-user-minus"></is>Delete My Account
            </buuton>
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <p>You have not yet setup a profile , please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </Fragment>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  
});

export default connect(mapStateToProps, { getCurrentProfile , deleteAccount})(Dashboard);
