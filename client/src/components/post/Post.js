import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import CommentForm from './CommentForm'
import CommentItem from './CommentItem'
import { connect } from 'react-redux'
import { getPost } from '../../actions/post';
import { useParams } from 'react-router-dom'
import PostItem from '../posts/PostItem'
import Spinner from '../layout/Spinner';

const Post = ({getPost, post: { post, loading }}) => {
  const { id }  = useParams();

  useEffect(() => {
   getPost(id)
  }, [getPost, id]);

  return loading || post === null ? (<Spinner />) : (
    <Fragment>
      {/* <section className='container'> */}

      <PostItem post={post} showActions={false} />
          <CommentForm postId={post._id}/>

          <div className="comments">
            {post.comments.map(comment=>(
              <CommentItem key={comment._id} comment={comment} postId={post._id} />
            ))}
          </div>
      {/* </section> */}
    </Fragment>
  )
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  getPost: PropTypes.func.isRequired,
}

const mapStateToProps = state =>({
  post: state.post
})

export default connect(mapStateToProps, {getPost})(Post)