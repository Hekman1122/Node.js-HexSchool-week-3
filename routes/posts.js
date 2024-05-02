const express = require("express");
const router = express.Router();
const Post = require("../model/postSchema");

//取得所有文章列表
router.get("/", async (req, res, next) => {
  try {
    const posts = await Post.find({});
    res.json({
      message: "Get all articles successfully.",
      data: posts,
    });
  } catch (e) {
    next(e);
  }
});

//新增文章
router.post("/", async (req, res, next) => {
  try {
    const newPost = new Post(req.body);
    const savePost = await newPost.save();
    res.json({
      message: "Post new article successfully.",
      data: savePost,
    });
  } catch (e) {
    next(e);
  }
});

//刪除所有文章
router.delete("/", async (req, res, next) => {
  try {
    await Post.deleteMany({});
    res.json({
      message: "Delete all articles successfully",
      data: null,
    });
  } catch (e) {
    next(e);
  }
});

//刪除指定文章
router.delete("/:id", async (req, res, next) => {
  //檢查是否有該筆資料
  let target;
  try {
    target = await Post.findById(req.params.id);
    if (target) {
      const deletePost = await Post.findByIdAndDelete(req.params.id);
      res.json({
        message: "Delete article successfully.",
        data: deletePost,
      });
    }
  } catch (e) {
    res.status(404).json({
      message: "No such article.",
    });
  }
});

//更新指定文章
router.patch("/:id", async (req, res, next) => {
  //檢查是否有該筆資料
  let target;
  try {
    target = await Post.findById(req.params.id);
    if (target) {
      try {
        const updatePost = await Post.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
        );
        res.json({
          message: "Update article successfully.",
          data: updatePost,
        });
      } catch (e) {
        next(e);
      }
    }
  } catch (e) {
    res.status(404).json({
      message: "No such article.",
    });
  }
});

module.exports = router;
