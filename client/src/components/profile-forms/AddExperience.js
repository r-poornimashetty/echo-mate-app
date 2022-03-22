import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';

const AddExperience = ({ addExperience }) => {
  const [formData, setFormData] = useState({
    title: '',
    company: '',
    location: '',
    from: '',
    current: false,
    to: '',
    description: '',
  });

  const [toDateDisable, toggleDisable] = useState(false);

  const { title, company, location, from, current, to, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(e.target.name);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    // console.log(formData);
    addExperience(formData);
  };

  
  return (
    <div className='container'>
      <h1 className='large blue-text text-darken-4'>Add An Experience</h1>
      <h5>
        <i className='fas fa-code-branch'></i> Add any developer/programming
        positions that you have had in the past
      </h5>
     
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Job Title'
            name='title'
            value={title}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='* Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Location'
            name='location'
            value={location}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <h5>From Date</h5>
          <input
            type='date'
            name='from'
            value={from}
            onChange={(e) => onChange(e)}
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='current'
              value={current}
              checked={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current })
                toggleDisable(!toDateDisable);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <h5>To Date</h5>
          <input
            type='date'
            name='to'
            value={to}
            onChange={(e) => onChange(e)}
            disabled={toDateDisable ? 'disabled' : ''}
          />
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Description'
            value={description}
            onChange={(e) => onChange(e)}
          ></textarea>
        </div>
        <input type='submit' className='btn blue darken-4' />
        <a className='btn grey darken-4' href='/dashboard'>
          Go Back
        </a>
      </form>
    </div>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(AddExperience);
