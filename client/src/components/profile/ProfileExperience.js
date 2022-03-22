import React from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment';  

const ProfileExperience = ({
      experience :{
            title, company, from, to, current, location, description
      }
}) => {
  return (
    <ul className='collection'>
          <li className='collection-item'><h3 className="text-dark">{company}</h3></li>
          <li className='collection-item'>
                  { location && <strong>Location : {location} </strong>  }
            </li>
          <li className='collection-item'>
                <Moment format='DD-MM-YYYY'>{from}</Moment> ---{' '}
                {!to ? 'Now' : <Moment format='DD-MM-YYYY'> {to} </Moment>}
          </li>
          <li className='collection-item'>
                <strong>Position: </strong> {title}
          </li>
          <li className='collection-item'>
              { description &&   <strong>Description: { description}</strong> }
          </li>
    </ul>
  )
}

ProfileExperience.propTypes = {
      experience: PropTypes.object.isRequired,
}

export default ProfileExperience