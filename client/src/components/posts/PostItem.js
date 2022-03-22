import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import Moment from 'react-moment';
import { addLike, removeLike, deletePost } from '../../actions/post';

const PostItem = ({
  post:{ _id, text, name, avatar, user, likes, comments, date},
  auth,
  addLike,
  removeLike,
  deletePost,
  showActions
}) => {
  return (
    // <div>
          <div className="row">
          <div className='col s12'>
            <Link to={`/profile/${user}`} className=' blue-text text-darken-4'>
              <img
                className="responsive-img"
                height={250}
                width={250}
                
                src={avatar}
                alt=""
              />
              <h4 className='center'>{name}</h4>
            </Link>
          </div>
          <div>
            <p className="my-1">
             {text}
            </p>
            <p className="post-date">
                Posted on <Moment format='DD-MM-YYYY'>{date}</Moment>
            </p>
            {showActions && (
              <Fragment>
                    <button type="button" className="btn blue darken-4" onClick={e=> addLike(_id)}>
              <i className="fas fa-thumbs-up"></i>{' '}
              <span>{likes.length > 0 && <span> {likes.length} </span>}</span>
            </button>

            <button type="button" className="btn blue darken-4" onClick={e=> removeLike(_id)}>
              <i className="fas fa-thumbs-down"></i>
            </button>

            <Link to={`/posts/${_id}`} className="btn blue darken-4">
              Discussion{' '}
              {comments.length > 0  && (<span className='comment-count'>{comments.length}</span>)}
            </Link>

           { !auth.loading && user === auth.user._id && (
              <button      
              type="button"
              className="btn red"
              onClick={e=> deletePost(_id)}
            >
              <i className="fas fa-times"></i>
            </button>
           )}
              </Fragment>
            )}

        
          </div>
        </div>
    // </div>
  )
}

PostItem.defaultProps ={
  showActions : true
}

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
  auth: state.auth
})

export default connect(mapStateToProps, {addLike, removeLike, deletePost})(PostItem)