const router = require('express').Router();
const { Post, User } = require('../models');

// Login
router.get('/login', async (req, res) => {
  res.render('login'); 
 });

 // Signup
router.get('/signup', async (req, res) => {
  res.send('Show signup view') 
 });

// Get all posts
router.get('/', async (req, res) => {
	// try {
		// Get all posts from db
		const dbPostData = await Post.findAll({
			include: [User],
		}); 
		// Serialize data received
		const posts = dbPostData.map(post => post.get({plain:true}));
		console.log(posts);

		// Respond with template to render and data received.
		res.render('homepage', { posts: posts });
	// } catch (error) {
	// 		res.status(500).json(error);
	// }
});

// Get individual post
router.get('/post/:id', async (req, res) => {
  res.send(`Show single posts view with id ${req.params.id}`) 
 });

module.exports = router