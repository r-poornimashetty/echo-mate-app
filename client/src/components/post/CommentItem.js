import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';

const CommentItem = ({
  comment: { name,text, avatar, _id, date, user},
  auth,
  postId,
  deleteComment
}) => {
  return (
    // <div>
        <div className="row">
          <div className='col s4'>
            <Link to={`/profile/${user}`}>
              <img
                className="round-img"
                src={avatar}
                width='100px'
                alt=""
              />
              <h5 className='cyan-text'>{name}</h5>
            </Link>
          </div>
          <div className='col s8'>
            <p className="my-1">
              {text}
            </p>
             <p className="post-date">
                Posted on <Moment format='DD-MM-YYYY'>{date}</Moment>
           

           {!auth.loading && user === auth.user._id && (
               <button      
               type="button"
               className="btn right red"
               onClick={e=> deleteComment(postId, _id)}
             >
               <i className="fas fa-times"></i>
             </button>
           )}

</p>
          </div>
        </div>
    // </div>
  )
}

CommentItem.propTypes = {
  comment: PropTypes.object.isRequired,
  postId: PropTypes.number.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
  auth: state.auth
})

export default connect(mapStateToProps, {deleteComment})(CommentItem)