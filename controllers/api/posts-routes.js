const router = require('express').Router();
const { User, Blogpost, Comment } = require('../../models');

// POST request to create new comment
router.post('/:id/comments', async (req, res) => {
    console.log('\nReached /:id/comments');
    console.log(req.session);
    try {
        const commentData = await Comment.create({
            body: req.body.comment,
            user_id: req.session.userId,
            blogpost_id: req.params.id
        });
        console.log('Hello');

        res.status(200).json(commentData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;