import React, { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import ProfileItem from './ProfileItem';

const Profiles = ({ profile: { profiles, loading }, getAllProfile }) => {
  useEffect(() => {
    getAllProfile();
  }, [getAllProfile]);

  return (
        <Fragment>
    {/* <div className='container'> */}
      {loading ? <Spinner /> : <Fragment>
            <h1 className='large blue-text text-darken-4'>Developers</h1>
            <h5 className="lead">
                  <i className="fas fa-globe"></i> Connect with the developers
            </h5>
            <div className="profiles">
                  { profiles.length > 0 ? (
                        profiles.map(profile =>(
                              <ProfileItem key={profile._id} profile={profile} />
                        ))
                  ) : (
                        <h3>No Profile Found</h3>
                  )}
            </div>
            </Fragment>}
    {/* </div> */}
    </Fragment>
  );
};

Profiles.propTypes = {
  profile: PropTypes.object.isRequired,
  getAllProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});
export default connect(mapStateToProps, { getAllProfile })(Profiles);
