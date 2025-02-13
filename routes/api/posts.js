const express = require("express");
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const Profile = require("../../models/Profile");
const User = require("../../models/user");
const Post = require("../../models/Post");
const { post } = require("request");

// @route POST api/posts
//  @desc create a post
// @access private

router.post(
  "/",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const newPost = new Post({
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Server error");
    }
  }
);

// @route GET api/posts
//  @desc get all posts
// @access private

router.get("/", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route GET api/posts/:id
//  @desc get post by id
// @access private

router.get("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: " Post not found" });
    }
    res.json(post);
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: " Post not found" });
    }
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route DELETE api/posts/:id
//  @desc delete a post
// @access private

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: " Post not found" });
    }
    // check user

    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.deleteOne({ _id: post.id });
    res.json({ msg: "Post removed" });
  } catch (err) {
    if (err.kind == "ObjectId") {
      return res.status(404).json({ msg: " Post not found" });
    }
    console.log(err.message);
    res.status(500).send("Server error");
  }
});

// @route PUT api/posts/like/:id
//  @desc like a post
// @access private

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if post is already liked by the user

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post already liked" });
    }

    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route PUT api/posts/unlike/:id
//  @desc unlike a post
// @access private

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // check if post is already liked by the user

    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post has not been liked" });
    }

    // Get remove index

    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

// @route POST api/posts/comment/:id
//  @desc comment on a  post
// @access private

router.post(
  "/comment/:id",
  [auth, [check("text", "Text is required").not().isEmpty()]],
  async (req, res) => {
    errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select("-password");

      const post = await Post.findById(req.params.id);

      const newComment = {
        text: req.body.text,
        name: user.name,
        avatar: user.avatar,
        user: req.user.id,
      };

      post.comments.unshift(newComment);

      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.log(err.message);
      res.status(500).json("Server error");
    }
  }
);

// @route Delete api/posts/comment/:id/:comment_id
//  @desc delete comment on a  post
// @access private

router.delete("/comment/:id/:comment_id", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    const post = await Post.findById(req.params.id);

    //  get the comment from the post

    const comment = post.comments.find(
      comment => comment.id === req.params.comment_id
    );

    //  checking if comment exists

    if (!comment) {
      return res.status(404).json({ msg: "Comment not found" });
    }

    //  checking if the user deleteing is the user who made the comment

    if (comment.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    // Get remove index

    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.log(err.message);
    res.status(500).json("Server Error");
  }
});

module.exports = router;
