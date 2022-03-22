import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

const ProfileAbout =({
      profile:{
            bio,
            skills,
            user: { name }
      }
}) => {
  return (
    <div className='center card'>
          { bio && (
                <Fragment>
                      <h4 className="blue-text text-darken-4">{name.trim().split(' ')[0]}'s Bio</h4>
                      <p>{bio}</p>
                      <div className="line"></div>
                </Fragment>
          )}

          <h4 className="blue-text text-darken-4">Skill Set</h4>
          <div className="">
                {skills && skills.map((skill, index) =>(
                      <div key={index} className=" card-action">
                         <i className="fas fa-check"></i>   {skill}
                      </div>
                ))}
          </div>
    </div>
  )
}

ProfileAbout.propTypes = {
      profile: PropTypes.object.isRequired,
}

export default ProfileAbout