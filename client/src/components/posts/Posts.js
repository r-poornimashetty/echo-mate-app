import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Fragment } from 'react'
import PostForm from './PostForm'
import PostItem from './PostItem'
import { getAllPosts } from '../../actions/post';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const Posts = ({ getAllPosts,auth, post: {posts, loading, _id, user }}) => {

  useEffect(()=>{
    getAllPosts();
  }, [getAllPosts])

  return loading ?  <Spinner /> : <div className='container'>
          <Fragment>
           <h1 className="large  blue-text text-darken-4">
        Posts
      </h1>
      <h4 className="lead"><i className="fas fa-user"></i> Welcome to the community!</h4>

       { auth.user && (
          <PostForm />
       )}

     
          <div className="posts">
          { posts.map(post=>(<PostItem key={post._id} post={post} />))}
     </div>
   
      </Fragment>

    </div>
  
}

Posts.propTypes = {
  getAllPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state =>({
  post: state.post,
  auth: state.auth
})

export default connect(mapStateToProps, { getAllPosts })(Posts)