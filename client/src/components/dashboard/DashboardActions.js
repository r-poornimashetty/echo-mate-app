import React from 'react'
import { Link } from 'react-router-dom'


const DashboardActions = () => {
  return (
    <div className='button'>
          <Link to='/edit-profile' className='btn blue darken-4'>
                <i className="fa fa-user-circle"></i> Edit Profile
          </Link>
          <Link to='/add-experience' className='btn blue darken-4'>
                <i className="fas fa-graduation-cap text-primary"></i> Add Experience
          </Link>
          <Link to='/add-education' className='btn blue darken-4'>
                <i className="fab fa-black-tie text-primary"></i> Add Education
          </Link>
    </div>
  )
}

export default DashboardActions