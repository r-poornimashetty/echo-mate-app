import React, { Fragment, useState } from 'react';
// import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';
import { register } from '../../actions/auth';



const Register = ({setAlert, register , isAuthenticated}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) =>{

        setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const onSubmit = async (e) =>{
        e.preventDefault();

        if(password !== password2){
              // console.log('Password do not match');
              setAlert('Password do not match' , 'danger');
        }else{
            //   console.log(formData);
            // const newUser = {name, email, password};
            // try {
            //       const config = {
            //             headers: {
            //                   'Content-Type': 'application/json'
            //             }
            //       }

            //       const body = JSON.stringify(newUser);

            //       const res = await axios.post('/api/users', body, config)
            //       console.log(res.data);
            // } catch (err) {
            //       console.error(err.response.data)
            // }
            // console.log('success');
            register({ name, email, password });
        }
  }

  // Redirect to dashboard if logged in
  if(isAuthenticated){
    return <Navigate to="/dashboard" />   // Redirect is deprecated in v6
  }

  return (
    <Fragment>
      {/* <section className='container'> */}
      <h1 className='large blue-text text-darken-4'>Sign Up</h1>
      <h5 className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </h5>
      <form className='form' onSubmit={e=> onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Name'
            name='name'
            value={name}
            onChange={(e) => onChange(e)}
       
          />
        </div>
        <div className='form-group'>
          <input 
            type='email' 
            placeholder='Email Address' 
            name='email' 
            value={email}
            onChange={(e) => onChange(e)}
            />
          <small className='form-text'>
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => onChange(e)}
            // minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            name='password2'
            value={password2}
            onChange={(e) => onChange(e)}
            // minLength='6'
          />
        </div>
        <input type='submit' className='btn blue darken-4' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
      {/* </section> */}
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state =>({
  isAuthenticated: state.auth.isAuthenticated   // it redirect to dashboard after registering
})

export default connect(mapStateToProps, { setAlert, register})(Register);
