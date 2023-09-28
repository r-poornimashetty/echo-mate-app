import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import Moment from 'react-moment'

const ProfileEducation = ({
      education:{
            school,degree, fieldofstudy,from , to, current, description
      }
}) => {
  return (
    <ul className='collection'>
         <li className="collection-item"> <h3 className="text-dark">{school}</h3></li>
          <li className='collection-item'>
                <Moment format='DD-MM-YYYY'>{from}</Moment> to {' '}
                {!to ? 'Continue' : <Moment format='DD-MM-YYYY'>{to}</Moment>}
          </li>
          <li className='collection-item'>
                <strong>Degree : </strong> { degree }
          </li>
          <li className='collection-item'>
                <strong>Field of Study : </strong> {fieldofstudy}
          </li>
          <li className='collection-item'>
                { description && (
                <Fragment>
                   <strong>Description : </strong>   { description }
                </Fragment> 

                )}
          </li>
    </ul>
  )
}

ProfileEducation.propTypes = {
      education : PropTypes.object.isRequired,
}

export default ProfileEducation