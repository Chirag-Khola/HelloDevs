const express = require('express');
const router = express.Router();

// @route GET api/profile
// @access public
router.get('/' , (req , res) => res.send('profile route'));


module.exports = router;