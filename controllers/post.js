import mongoose from "mongoose";
import Post from "../models/post";
import moment from "moment";

// Request Response type controllers
export async function createPost(request, response) {
  const { text, title } = request.body;
  const user_id = request.user._id;
  const created_at = new Date();
  const post = new Post({
    _id: mongoose.Types.ObjectId(),
    text,
    title,
    user_id,
    created_at
  });

  try {
    await post.save();
    return response.sendStatus(200);
  } catch (error) {
    return response.sendStatus(500);
  }
}

export async function getPosts(request, response) {
  try {
    let posts = await Post.find({})
      .populate("user_id")
      .sort({ created_at: "desc" });
    posts = posts.map(post => ({
      id: post._id,
      title: post.title,
      relativeTime: moment(post.created_at).fromNow(),
      commentsCount: post.comments.length,
      username: post.user_id.username
    }));
    response.json(posts);
  } catch (error) {
    console.log(error);
    return response.sendStatus(500);
  }
}

// Helper type controllers
export async function addComment(post_id, comment_id) {
  const post = await Post.findById(post_id);
  if (post) {
    post.comments.push(comment_id);
    return await post.save();
  }
}
