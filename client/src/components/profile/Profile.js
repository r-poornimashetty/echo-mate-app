import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getProfileById } from '../../actions/profile';
import Spinner from '../layout/Spinner';
import { Link, useParams } from 'react-router-dom';
import ProfileTop from './ProfileTop';
import ProfileAbout from './ProfileAbout';
import ProfileExperience from './ProfileExperience';
import ProfileEducation from './ProfileEducation';
import ProfileGithub from './ProfileGithub';

const Profile = ({ getProfileById, profile: { profile, loading }, auth }) => {
  let { id } = useParams(); /// it fetches the id from the url

  useEffect(() => {
    getProfileById(id);
  }, [getProfileById, id]);

  return (
    <div className='container'>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <Link to='/profiles' className='btn blue darken-4'>
            Back to Profiles
          </Link>

          <div className=''>
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            {/* <div className="row"> */}
            <div className='card'>
              <h2 className='blue-text text-darken-4'>Experience</h2>
              <div className="card-action">
              {profile.experience.length > 0 ? (
                <Fragment>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      experience={experience}
                      key={experience._id}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Experience</h4>
              )}
              </div>
            </div>

            <div className='card'>
              <h2 className='blue-text text-darken-4'>Education</h2>
              <div className="card-action">
              {profile.education.length > 0 ? (
                <Fragment>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </Fragment>
              ) : (
                <h4>No Education </h4>
              )}
              </div>
            </div>
           

            {profile.githubusername && (
              <ProfileGithub username={profile.githubusername} />
            )}

          </div>
        </Fragment>
      )}
    </div>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.profile,
});

export default connect(mapStateToProps, { getProfileById })(Profile);
