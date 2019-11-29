import express from "express";
import jwtMiddleware from "../jwtMiddleware";
import { createUser, setPassword, signInUser } from "../controllers/user";
import {
  createComment,
  updateComment,
  replyComment
} from "../controllers/comment";
import { createPost, getPosts } from "../controllers/post";

const router = express.Router();

router.get("/", (request, response) => {
  response.send("API Home");
});

router.post("/auth/signup", createUser);
router.post("/auth/signin", signInUser);
router.post("/auth/resetPassword", setPassword);

router.post("/comments", createComment);
router.post("/comments/:commentId/reply", replyComment);
router.put("/comments/:commentId", updateComment);

router.post("/posts", jwtMiddleware, createPost);
router.get("/posts", getPosts);

export default router;
