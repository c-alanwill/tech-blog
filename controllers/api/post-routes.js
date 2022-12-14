const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
});

router.delete('/:id', withAuth, async (req, res) => {
    console.log(req.session.user_id, req.params.id)
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No project found with this id!' });
      return;
    }

    res.status(200).json(postData);
});

router.put('/:id', withAuth, async (req, res) => {
    console.log(req.session.user_id, req.params.id)
    console.log
    const postData = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'Failed to update Post' });
      return;
    }

    res.status(200).json(postData);
});

module.exports = router;
