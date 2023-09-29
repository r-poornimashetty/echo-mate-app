import React from 'react'
import { Link, Navigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

const Landing = ({ isAuthenticated }) => {
  if(isAuthenticated){
    return <Navigate to='/dashboard' />
  }
  return (
      // <section className="container">
      <div className="container">
        <div >
          <h1 className="x-large  blue-text text-darken-4">Echo Mate </h1>
          <p className="lead">
           A social media platform
          </p>
          <div className="buttons">
            <Link to="/register" className="btn blue darken-4">Sign Up</Link>
            <Link to="/login" className="btn blue darken-4">Login</Link>
          </div>
        </div>
      </div>
    // </section>
  )
}

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated
})
export default connect(mapStateToProps)(Landing)