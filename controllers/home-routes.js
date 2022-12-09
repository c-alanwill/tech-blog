const router = require('express').Router();
const { Post, User } = require('../models');
// const withAuth = require('../utils/auth');
const sequelize = require('../config/connection');

// Login
router.get('/login', (req, res) => {
	try {
			res.render('login', {
				login: true,
			});
	} catch (error) {
			res.status(500).json({ message: error });
	}
});

 // Signup
router.get('/signup', async (req, res) => {
 try {
	res.render('signup', {
			signup: true,
	});
} catch (error) {
	res.status(500).json({ message: error });
}
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
		res.render('homepage', { posts: posts, loggedIn: req.session.loggedIn });
	// } catch (error) {
	// 		res.status(500).json(error);
	// }
});

// Get individual post
router.get('/post/:id', async (req, res) => {
  res.send(`Show single posts view with id ${req.params.id}`) 
 });

module.exports = router