const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { response } = require("express");

const signUp = async (request, response, next) => {
  const { body } = request;

  try {
    const queriedUser = await User.findOne({ email: body.email });

    if (queriedUser) {
      response.status(400).json({ error: "Email already in use" });
      return;
    }
  } catch (err) {
    response.status(400).json(err);
  }

  const newUser = new User(body);

  try {
    const newUserObj = await newUser.save();
    response.json(newUserObj);
  } catch (err) {
    response.status(400).json(err);
  }
};

const signIn = async (request, response, next) => {
  const { body } = request;

  if (!body.email) {
    response.status(400).json({ error: "no email provided" });
  }

  let userQuery;

  try {
    userQuery = await User.findOne({ email: body.email });
  } catch (err) {
    response.status(400).json({ error: "Email is not found" });
  }

  if (userQuery === null) {
    response.status(400).json({ error: "email not found" });
    return;
  }

  const passwordCheck = await bcrypt.compareSync(
    body.password,
    userQuery.password
  );

  if (!passwordCheck) {
    response.status(400).json({ error: "Email and password must match" });
    return;
  }

  // Admin is verified as an admin
  const userToken = jwt.sign({ id: userQuery._id }, process.env.SECRET_KEY);
  console.log(`token ${userToken}`);
  response
    .cookie("usertoken", userToken, process.env.SECRET_KEY, {
      httpOnly: true,
      expires: new Date(Date.now() + 9000000),
    })
    .json({ message: "successful login" });
};

const protected = (request, response) => {
  response.send("you got to the protected route");
};

const logout = (request, response) => {
  response.clearCookie("userToken");
  response.status(200).json({ message: "logout succesful!!!" });
};

module.exports = {
  signUp,
  signIn,
  protected,
  logout,
//   updateUserProfile,
};
