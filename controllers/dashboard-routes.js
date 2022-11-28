const router = require('express').Router();
const { Post, User } = require('../models');

// Dashboard
router.get('/', async (req,res) => {
  res.render('dashboard');
});

module.exports = router