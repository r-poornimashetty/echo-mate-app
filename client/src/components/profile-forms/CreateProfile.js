import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import { Fragment } from 'react';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    instagram: '',
    youtube: '',
  });

  const [socialInputs, toggleSocialInputs] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    facebook,
    twitter,
    linkedin,
    instagram,
    youtube,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history)
  };

  return (
    <div className='container'>

      <h1 className='large teal-text'>Create Your Profile</h1>
      <h5 className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </h5>

      <form className='form' onSubmit={(e) => onSubmit(e)}>

        <div className='form-group'>
          {/* <select name='status' onChange={(e) => onChange(e)} value={status}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select> */}
          <p className='form-text'>
            Give us an idea of where you are at in your career eg:- Actor, Engineer etc.
          </p>
          <div className='form-group'>
          <input
            type='text'
            placeholder='Status'
            name='status'
            onChange={(e) => onChange(e)}
            value={status}
          />

          <p className='form-text'>
            Could be your own company or one you work for
          </p>
        </div>

        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            onChange={(e) => onChange(e)}
            value={company}
          />
          <p className='form-text'>
            Could be your own company or one you work for
          </p>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            name='website'
            onChange={(e) => onChange(e)}
            value={website}
          />
          <p className='form-text'>
            Could be your own or a company website
          </p>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            onChange={(e) => onChange(e)}
            value={location}
          />
          <p className='form-text'>
            City & state suggested (eg. Boston, MA)
          </p>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='* Skills'
            name='skills'
            onChange={(e) => onChange(e)}
            value={skills}
          />
          <p className='form-text'>
            Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
          </p>
        </div>

        <div className='form-group'>
          <input
            type='text'
            placeholder='Github Username'
            name='githubusername'
            onChange={(e) => onChange(e)}
            value={githubusername}
          />
          <p className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </p>
        </div>
        
        <div className='form-group'>
          <textarea
            placeholder='A short bio of yourself'
            name='bio'
            onChange={(e) => onChange(e)}
            value={bio}
          ></textarea>
          <p className='form-text'>Tell us a little about yourself</p>
        </div>

        <div className='my-2' style={{ marginBottom: '10px'}}>
          <button
            type='button'
            onClick={(e) => toggleSocialInputs(!socialInputs)}
            className='btn grey darken-1'
          >
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {socialInputs && (
          <Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                onChange={(e) => onChange(e)}
                value={twitter}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                onChange={(e) => onChange(e)}
                value={facebook}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                type='text'
                placeholder='YouTube URL'
                name='youtube'
                onChange={(e) => onChange(e)}
                value={youtube}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                onChange={(e) => onChange(e)}
                value={linkedin}
              />
            </div>

            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                onChange={(e) => onChange(e)}
                value={instagram}
              />
            </div>
          </Fragment>
        )}
        <input type='submit' className='btn my-1' />
        
        <a className='btn  my-1' href='/dashboard'>
          Go Back
        </a>
      </form>
    </div>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(CreateProfile);
