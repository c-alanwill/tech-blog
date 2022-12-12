const router = require('express').Router();
const { User } = require('../../models');

// login user ('/api/user/login')
router.post('/login', async (req, res) => {
console.log(req.body);
try {
  // Retrieve user from db based on their username
  const userData = await User.findOne({
    where: {username: req.body.username}
  });

  //  Exit if no username found
  if (!userData) {
    return res.status(400).json('Invalid information')
};

  //  Check password
  const pwValidated = await userData.checkPassword(req.body.password)  
  if(!pwValidated) {
    return res.status(400).json('Invalid information')
  };

  // Create session and send reponse back
  req.session.save(() => {
    // declare session variables
    req.session.userId = userData.id;
    req.session.username = userData.username;
    req.session.logged_in = true;
 
  // Send response to client
  res.status(200).json('You are logged in.');
});

} catch (error) {
  console.log(error)
  res.status(500).json(error)
}
});
// sign up
router.post('/', async (req, res) => {
  // try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });
  // } catch (err) {
  //   res.status(400).json(err);
  // }
});

module.exports = router