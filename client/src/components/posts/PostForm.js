import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { addPost } from '../../actions/post'
import { connect} from 'react-redux';

const PostForm = ({addPost}) => {

  const [text, setFormData]  = useState('');

  return (
          <div className="post-form">
        <div className="bg-primary p">
          <h3>Say Something...</h3>
        </div>

        <form className="form my-1"
        onSubmit={e=>{
          e.preventDefault();
          addPost({text});
          setFormData('');
        }}
        >
          <textarea
            cols="30"
            className='materialize-textarea'
            rows="5"
            placeholder="Create a post"
            name='text'
            value={text}
            onChange={e => setFormData(e.target.value)}
          ></textarea>
          <input type="submit" className="btn blue darken-4" value="Submit" />
        </form>
        </div>
  )
}

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
}

export default connect(null, { addPost})(PostForm)