import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Alert from './components/layout/Alert';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';
import PrivateRoute from './components/routing/PrivateRoute';

/// redux
import { Provider } from 'react-redux';
import store from './store';
import Dashboard from './components/dashboard/Dashboard';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddExperience from './components/profile-forms/AddExperience';
import AddEducation from './components/profile-forms/AddEducation';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
// import Footer from './components/layout/Footer';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        
        <Fragment>
          <Navbar />

          <section className='container'>

            <Alert />

            <Routes>
            <Route exact path='/' element={<Landing />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/register' element={<Register />} />
              <Route exact path='/profiles' element={<Profiles />} />
              <Route exact path='/profile/:id' element={<Profile />} />
              <Route exact path='/posts' element={<Posts />} />

            {/* private routes */}
              <Route path='/*' element={<PrivateRoute />}>
                <Route path='dashboard' element={ <Dashboard/>} />
                <Route exact path='posts' element={<Posts />} />
                <Route exact path='posts/:id' element={<Post />} />

                <Route path='create-profile' element={ <CreateProfile/>} />
                <Route path='add-experience' element={ <AddExperience/>} />
                <Route path='add-education' element={ <AddEducation/>} />
                <Route path='edit-profile' element={ <EditProfile/>} />
              </Route>

            </Routes>


          </section>
          {/* <Footer /> */}
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
