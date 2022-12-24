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

// POST request to create new blogpost
router.post('/', async (req, res) => {
    console.log('\nReached /posts');
    console.log(req.body);
    try {
        const postData = await Blogpost.create({
            title: req.body.postTitle,
            content: req.body.postBody,
            user_id: req.session.userId
        });

        res.status(200).json(postData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Delete user's blogpost with same ID
router.delete('/:id', async (req, res) => {
    console.log('\n Reached /posts/:id');

    try {
        const postData = await Blogpost.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.userId
            }
        });

        if (!postData) {
            res.status(404).json({ message: 'No blogpost found with this ID!'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Update user's blogpost with same ID
router.put('/:id', async (req, res) => {
    console.log('\n Reached PUT request at /posts/:id');

    try {
        const postData = await Blogpost.update(
            {
                title: req.body.title,
                content: req.body.content,
            },
            {
                where: {
                    id: req.params.id,
                    user_id: req.session.userId
                }
            }
        );

        if (!postData) {
            res.status(404).json({ message: 'No blogpost found with this ID!'});
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;