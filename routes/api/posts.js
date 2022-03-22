const express = require('express');
const router = express.Router();
const { validationResult, body } = require('express-validator');

const auth = require('../../middleware/auth');
const User = require('../../models/User');
const Post = require('../../models/Post');

// @route    POST api/posts
// @desc     Add a post
// @access   Private
router.post('/',
  [  
        auth,
        [
            body('text', 'Text is required').not().isEmpty()
        ]
  ],
 async (req, res) => {
      const errors = validationResult(req);

      if(!errors.isEmpty()){
         return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = await User.findById(req.user.id).select('-password');

        const newPost = new Post({
              text: req.body.text,
              name: user.name,
              avatar: user.avatar,
              user: req.user.id
        })

        const post = await newPost.save();

        res.json(post);

      } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
      }
});

//@router         GET api/posts
//@desc           Get all post
//access          Private
router.get('/', auth, async (req, res)=>{
     try {
      const post = await Post.find().sort({ date: -1 });

      res.json(post);
      // console.log(post);
     } catch (err) {
           console.log(err.message);
           res.status(500).send('Server Error');
     }
})

//@router         GET api/posts/:id
//desc            Get post by id
//access          Private
router.get('/:id', auth, async (req, res) =>{
      try {
      const post = await Post.findById(req.params.id);
            
      if(!post){
          return  res.status(404).json({ msg: 'Post not found'})
      }

      res.json(post);
      } catch (err) {
            console.log(err.message);

            if(err.kind === 'OjbectId'){   // Throw error if its not a valid objectid 
                  return res.status(404).json({ msg: 'Post not found'})
            }
            
            res.status(500).send('Server Error');
      }
})

//@router         DELETE api/posts/:id
//@desc           Delete post by id
//@access         Private
router.delete('/:id', auth, async (req, res)=>{
    try {
      const post = await Post.findById(req.params.id);   /// this is post id (req.params.id)
      
      if(!post){
            return res.json({ msg: 'Post not found'});
      }

      console.log(post.user.toString())  // This is user id
      console.log(req.user.id)           // This is user id

      // check user authorization
      if(post.user.toString() !== req.user.id){// (req.user.id) is string  that is why toString() has used with post.user
            return res.status(404).json({ msg: 'User not authorized'});
      }

      await post.remove();

      res.json({ msg: 'Post removed'});

    } catch (err) {
          console.log(err.message);

          if(err.kind === 'ObjectId'){ // it checks the valid object id
            return res.status(404).json({ msg : 'Post not found'});
          }
          res.status(500).send('Server Error');
    }
})

//@route          PUT api/posts/like/:id
//@desc           like a post
//@access         Private
router.put('/like/:id', auth, async (req, res) =>{
      try {
      const post = await Post.findById(req.params.id);
            
      // check if post has already been  liked
      if(post.likes.filter(like=> like.user.toString() === req.user.id).length > 0){
            return res.status(400).json({ msg: 'Post already liked'})
      }

       post.likes.unshift({ user: req.user.id });

       await post.save();

       res.json(post.likes);

      } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
      }      
})

//@route          PUT api/post/unlike/:id
//@desc           Unlike post
//access          Private
router.put('/unlike/:id', auth, async (req, res) =>{
     try {
      const post = await Post.findById(req.params.id);

      // check if post has already been liked
      if(post.likes.filter(like=> like.user.toString() === req.user.id ).length === 0 ){
            return res.status(400).json({ msg : 'Post has not yet been liked'});
      }

      // Get remove index
      const removeIndex = post.likes.map(like=> like.user.toString()).indexOf(req.user.id);

      post.likes.splice(removeIndex, 1);

      await post.save();

      res.json(post.likes);

     } catch (err) {
           
      console.log(err.message);
      res.status(500).send('Server Error')
     }
})

//@router         POST api/posts/comment/:id
//@desc           Post a comment
//@access         Private
router.post('/comment/:id',
      [
            auth,[
                  body('text', 'Text is required').not().isEmpty()
            ],
      ],

      async (req, res) =>{

      const errors = validationResult(req);

      if(!errors.isEmpty()){
            return res.status(400).json({ errors: errors.array() });
      }

      // const { name, text, avatar, date} = req.body;

      // const newComments = { name, text, avatar, date };

      try {
            const user = await User.findById(req.user.id).select('-password');
            const post = await Post.findById(req.params.id);

            const newComments = {
                  text: req.body.text,
                  name: user.name,
                  avatar: user.avatar,
                  user: req.user.id
            }

            post.comments.unshift(newComments);

            await post.save();

            res.json(post.comments);
      } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
      }

      })

//@router         DELETE api/posts/comment/:id/comment_id
//@desc           Delete a comment
//acces           Private
router.delete('/comment/:id/:comment_id', auth, async (req, res)=>{
     try {
      const post = await Post.findById(req.params.id);

      // Pull out comments
      const comment = post.comments.find(comment=> comment.id === req.params.comment_id);

      // Check if comment exists
      if(!comment){
            return res.status(404).json({ msg: 'Comment does not exists'});
      }

      // Check user
      if(comment.user.toString() !== req.user.id){
            return res.status(401).json({ msg : 'User not authorized'});
      }

      // Get remove index
      const removeIndex = post.comments.map(comment=> comment.id.toString()).indexOf(req.params.comment_id);
      console.log(removeIndex);

      post.comments.splice(removeIndex, 1);

      await post.save();

      res.json(post.comments);

     } catch (err) {
           console.log(err.message);
           res.status(500).send('Server Error');
     }

})

module.exports = router;