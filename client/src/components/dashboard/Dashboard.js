import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import DashboardActions from './DashboardActions';
import Education from './Education';
import Experience from './Experience';

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    // <div className='container'>
      <Fragment>
        <h1 className='large blue-text text-darken-4'>Dashboard</h1>
        <h4 className='lead med'>
          <i className='fa fa-user' /> Welcome  {user &&  user.name}
        </h4>

        {profile !== null ? (
          <Fragment>
            <DashboardActions />
            <Education education={profile.education} />
            <Experience experience={profile.experience} />

            <div className="my-2">
              <button className="btn red" style={{marginTop: '10px'}} onClick={()=> deleteAccount() }>
                <i className="fas fa-user-minus"></i> Delete Account
              </button>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <p>Setup your profile</p>
            <Link to='/create-profile' className='btn blue darken-4 '>
                Create Profile
            </Link>
          </Fragment>
        )}
      </Fragment>
    //  </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(Dashboard);
