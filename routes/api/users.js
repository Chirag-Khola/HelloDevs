// const express = require("express");
// const router = express.Router();
// const { check, validationResult } = require('express-validator');

// // @route GET api/profile
// // @access public
// router.post(
//   '/',
//   [
//     check('name').not().isEmpty(),
//     check('email').isEmail(),
//     check('password').isLength({ min: 5 })
//   ],
//   (req, res) => {
//     const errors = validationResult(req);

//     if(!errors.isEmpty()){
//         return res.status(400).json({ errors: errors.array() });
//     }
//     // console.log(req.body);
//     res.send("user route");
//   }
// );



const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

// @route POST /api/users
// @access public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 5 characters long").isLength({ min: 5 }),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    res.send("User registered successfully!");
  }
);

module.exports = router;
