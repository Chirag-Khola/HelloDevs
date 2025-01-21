const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const config = require("config");
const { check, validationResult } = require("express-validator");

const User = require("../../models/user");

// @route POST /api/users
// @access public
router.post(
  "/",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 5 characters long").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    try {
      // Check if the user exists -> if yes, return error
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "User already exists" }] });
      }

      // Get the user's Gravatar
      const avatar = gravatar.url(email, {
        s: "200",
        r: "pg",
        d: "mm",
      });

      // Create new user
      user = new User({
        name,
        email,
        avatar,
        password,
      });

      // Encrypt the password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      // Save the user to the database
      await user.save();

      // Create payload for JWT
      const payload = {
        user: {
          id: user.id,
        },
      };

      // Sign JWT and send response with token and user info
      jwt.sign(
        payload,
        config.get("jwtSecret"),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;

          // Respond with token and user data
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email,
              avatar: user.avatar, // Optionally include avatar or other user info
            },
          });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

module.exports = router;
