import mongoose from "mongoose";
import Comment from "../models/comment";
import { addComment } from "./post";

// Request Response type controllers
export async function createComment(request, response) {
  const { text, parent_id, user_id, post_id } = request.body;
  // const user_id = request.user._id;
  const comment = new Comment({
    _id: mongoose.Types.ObjectId(),
    text,
    user_id,
    post_id
  });

  try {
    await comment.save();
    await addComment(post_id, comment._id);
    return response.status(200).json(comment);
  } catch(error) {
    return response.sendStatus(500);
  }
}

export async function replyComment(request, response) {
  const { text, user_id } = request.body;
  const parent_id = request.params.commentId;
  // const user_id = request.user._id;
  const comment = new Comment({
    _id: mongoose.Types.ObjectId(),
    text,
    user_id
  });

  try {
    await comment.save();
    await _addComment(comment._id, parent_id);
    return response.status(200).json(comment);
  } catch(error) {
    return response.sendStatus(500);
  }
}

export async function updateComment(request, response) {
  const { text } = request.body;
  const comment_id = request.params.commentId;

  // Add logic for authorization of updateComment
  
  try {
    const comment = await Comment.findById(comment_id);
    comment.text = text;
    await comment.save();
    return response.sendStatus(200);
  } catch(error) {
    return response.sendStatus(500);
  }
}

// Helper type controllers
async function _addComment(comment_id, parent_id) {
  const parentComment = await Comment.findById(parent_id);
  if (parentComment) {
    parentComment.children.push(comment_id);
    return await parentComment.save();
  }
}



