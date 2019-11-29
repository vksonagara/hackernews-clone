import mongoose from "mongoose";
import { isEmpty } from "validator";

mongoose.Promise = global.Promise;

const postSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date()
  },
  title: {
    type: String,
    required: true,
    validate: value => {
      return !isEmpty(value);
    }
  },
  text: {
    type: String,
    required: true,
    validate: value => {
      return !isEmpty(value);
    }
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ]
});

const Post = mongoose.model("Post", postSchema);

export default Post;
