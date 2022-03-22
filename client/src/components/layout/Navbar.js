import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {
  const authLinks = (
   
    <ul className='right hide-on-med-down'>
      <li><Link to="/profiles">Developers</Link></li>
      <li>
        <Link to='/dashboard'>
          <i className='fa fa-user' /> Dashboard
        </Link>
      </li>
      <li>
        <Link to='/posts'>
          <i className='fa fa-user' /> Posts
        </Link>
      </li>
      <li>
        <Link to='/' onClick={logout}>
          <i className='fa fa-sign-out-alt' />{' '}
          <span className='hide-sm'> Logout</span>
        </Link>
      </li>
    </ul>

   
  );

  const guestLinks = (
  
      
    <ul className='right hide-on-down'>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
   
  );
  return (
    <div className="navbar-fixed ">
      
    <nav className='blue darken-4'> 
      <div className="nav-wrapper ">
        
        <Link to='/' className='brand-logo left'>
           Developerworld
        </Link>
        
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
        </div>
     
    </nav>
    </div>

  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
