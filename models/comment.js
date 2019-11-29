import mongoose from "mongoose";
import { isEmpty } from "validator";

mongoose.Promise = global.Promise;

const commentSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  text: {
    type: String,
    required: true,
    validate: (value) => {
      return !isEmpty(value);
    }
  },
  created_at: {
    type: Date,
    required: true,
    default: new Date()
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  children: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }],
  post_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }
});

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;