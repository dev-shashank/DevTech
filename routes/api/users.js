const express = require('express');
const router = express.Router();

// @route   GET api/users/test
// @desc    Test users route
// @access  Public route
router.get('/test', (req, res) => res.json({msg: "Users Works"}));

module.exports = router;