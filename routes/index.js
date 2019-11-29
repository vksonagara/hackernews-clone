import express from "express";
import jwtMiddleware from "../jwtMiddleware";
import { createUser, signInUser } from "../controllers/user";
import {
  createComment,
  updateComment,
  replyComment
} from "../controllers/comment";
import { createPost, getPosts, getPost } from "../controllers/post";

const router = express.Router();

router.get("/", (request, response) => {
  response.send("API Home");
});

router.post("/auth/signup", createUser);
router.post("/auth/signin", signInUser);

router.post("/comments", createComment);
router.post("/comments/:commentId/reply", replyComment);
router.put("/comments/:commentId", updateComment);

router.post("/posts", jwtMiddleware, createPost);
router.get("/posts", getPosts);
router.get("/posts/:postId", getPost);

export default router;
