import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ProfileItem = ({
  profile: {
    user: { _id, avatar, name },
    status,
    company,
    location,
    skills,
  },
}) => {
  return (
    <div className='row card valign-wrapper '>

      <div className='col s4 '>
        <img src={avatar} className='circle responsive-img' alt='' />
        
      </div>

      <div className='col s4 profile-name'>
        <h3>{name}</h3>
        <p>
          {status} {company && <span> at {company} </span>}{' '}
        </p>
        <p >{location && <span>{location}</span>}</p>
        <Link to={`/profile/${_id}`} className='btn blue darken-4'>
          View Profile
        </Link>
       
      </div>

      <div className='col s4'>
        <ul>
          {skills.slice(0, 4).map((skill, index) => (
            <li key={index}>
              <i className='fas fa-check' ></i> {skill}
            </li>
          ))}
        </ul>
      
      </div>
    </div>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
