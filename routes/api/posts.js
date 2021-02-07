const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Import Models
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');

// Load Input Validation
const validatePostInput = require('../../validation/post');

// @route   GET api/posts
// @desc    Get posts
// @access  Public route
router.get('/', (req, res) => {
    const errors = {};

    Post.find()
        .sort({ date: -1 })
        .then(posts => res.json(posts))
        .catch(err => {
            errors.nopostsfound = 'No posts found';
            res.status(404).json(errors);
        });
});

// @route   GET api/posts/:id
// @desc    Get posts by id
// @access  Public route
router.get('/:id', (req, res) => {
    const errors = {};

    Post.findById(req.params.id)
        .then(posts => res.json(posts))
        .catch(err => {
            errors.nopostfound = 'No post found for that id';
            res.status(404).json(errors);
        });
});

// @route   Post api/posts
// @desc    Create Post
// @access  Private route
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    const newPost = new Post({
        user: req.user.id,
        text: req.body.text,
        name: req.body.name,
        avatar: req.body.avatar
    });

    newPost.save().then(post => res.json(post));

});

// @route   DELETE api/posts/:id
// @desc    Delete Post by ID
// @access  Private route
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    // Check for post owner
                    if(post.user.toString() !== req.user.id) {
                        errors.notauthorized = 'User not authorized';
                        return res.status(401).json(errors);
                    }

                    // Delete
                    post.remove().then(() => res.json({ success: true}));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
        })
        .catch(err => res.status(404).json({ usernotfound: 'User not found'}));
});

// @route   POST api/posts/like/:id
// @desc    Like Post
// @access  Private route
router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length > 0) {
                        return res.status(400).json({ alreadyliked: 'User already liked this post'})
                    }
                    // Add user id to likes array
                    post.likes.unshift({ user: req.user.id });
                    // Save
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
        })
        .catch(err => res.status(404).json({ usernotfound: 'User not found'}));
});

// @route   POST api/posts/unlike/:id
// @desc    UnLike Post
// @access  Private route
router.post('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const errors = {};

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.likes.filter(like => like.user.toString() === req.user.id).length === 0) {
                        return res.status(400).json({ notliked: 'User has not liked this post yet'})
                    }
                    // Remove user id from likes array
                    const removeIndex = post.likes
                        .map(item => item.user.toString())
                        .indexOf(req.user.id);
                    post.likes.splice(removeIndex, 1);
                    // Save
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
        })
        .catch(err => res.status(404).json({ usernotfound: 'User not found'}));
});

// @route   POST api/posts/comment/:id
// @desc    Add comment to Post
// @access  Private route
router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    // Check Validation
    if(!isValid) {
        return res.status(400).json(errors);
    }

    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    const newComment = {
                        text: req.body.text,
                        name: req.body.name,
                        avatar: req.body.avatar,
                        user: req.user.id
                    };
                    // Add user id to likes array
                    post.comments.unshift(newComment);
                    // Save
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: 'Post not found'}));
        })
        .catch(err => res.status(404).json({ usernotfound: 'User not found'}));
});

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Delete comment to Post
// @access  Private route
router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
    Profile.findOne({ user: req.user.id })
        .then(profile => {
            Post.findById(req.params.id)
                .then(post => {
                    if(post.comments.filter(comment => comment._id.toString() === req.params.comment_id).length === 0) {
                        return res.status(404).json({ commentnotexists: 'Comment does not exists'});
                    }
                    // Remove comment using index
                    const removeIndex = post.comments
                        .map(item => item._id.toString())
                        .indexOf(req.params.comment_id);
                    post.comments.splice(removeIndex, 1);
                    // Save
                    post.save().then(post => res.json(post));
                })
                .catch(err => res.status(404).json({ postnotfound: req.params.id }));
        })
        .catch(err => res.status(404).json({ usernotfound: 'User not found'}));
});

module.exports = router;