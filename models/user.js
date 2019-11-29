import mongoose from "mongoose";
import { isEmpty } from "validator";
import bcrypt from "bcryptjs";

mongoose.Promise = global.Promise;

const userSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  username: {
    type: String,
    required: true,
    unique: true,
    validate: value => {
      return !isEmpty(value);
    }
  },
  password: {
    type: String,
    required: true,
    validate: value => {
      return !isEmpty(value);
    }
  }
});

userSchema.pre("save", async function(next) {
  if (this.password && this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
