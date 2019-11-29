import mongoose from "mongoose";
import User from "../models/user";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function createUser(request, response) {
  const { username, password } = request.body;
  const user = new User({
    _id: mongoose.Types.ObjectId(),
    username,
    password
  });

  try {
    await user.save();
    return response.sendStatus(200);
  } catch (error) {
    console.log(error);
    return response.sendStatus(400);
  }
}

export async function signInUser(request, response) {
  const { username, password } = request.body;

  try {
    const user = await User.findOne({ username });
    if (user) {
      const safeUser = { _id: user._id, username: user.username };
      bcrypt
        .compare(password, user.password)
        .then(res => {
          if (res === true) {
            jwt.sign(safeUser, "secret", function(error, token) {
              response.cookie("token", token).json({ token });
            });
          } else {
            response.sendStatus(400);
          }
        })
        .catch(err => {
          response.sendStatus(500);
        });
    } else {
      response.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    response.sendStatus(500);
  }
}
