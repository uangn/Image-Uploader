import express, { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AuthRequest from "models/AuthRequest";

export const getLoginPage: RequestHandler = (req: AuthRequest, res, next) => {
  if (req.userId) {
    res.status(200).json({ username: req.username });
  } else {
    res.status(401).json({ message: "Please login" });
  }
};

export const login: RequestHandler = async (req, res, next) => {
  const loginData = req.body as { username: string; password: string };
  const user = await User.findOne({ username: loginData.username });
  if (!user) {
    return res.status(403).json({
      message: "Name wasn't created yet",
    });
  }

  const correct = await bcrypt.compare(loginData.password, user.password);
  if (!correct) {
    return res.status(403).json({
      message: "Wrong password",
    });
  }

  const token = jwt.sign(
    { username: user.username, userId: user._id.toString() },
    "mayakepatum",
    { expiresIn: "5 days" }
  );
  res.status(200).json({
    token: token,
    username: user.username,
    userId: user._id.toString(),
  });
};

export const getSignUpPage: RequestHandler = (req, res, next) => {
  // Implementation for handling the sign-up page request
  res.json({ hi: "ho" });
};

export const signup: RequestHandler = async (req, res, next) => {
  const data = req.body;

  const user = await User.exists({ username: data.username });
  if (user) {
    res.status(403).json({ message: "Name already used" });
    return;
  }

  if (data.password.length >= 12) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    console.log(hashedPassword);
    const user = new User({
      ...data,
      password: hashedPassword,
    });
    user.save();
    res.status(202).json({});
  } else {
    res.status(400).json({ message: "Validation failed" });
  }
};

export const getEditPasswordPage: RequestHandler = (req, res, next) => {
  // Implementation for handling the edit password page request
};

export const editPassword: RequestHandler = (req, res, next) => {
  // Implementation for handling the edit password request
};

export const getDeleteUserPage: RequestHandler = (req, res, next) => {
  // Implementation for handling the delete user page request
};

export const deleteUser: RequestHandler = (req, res, next) => {
  // Implementation for handling the delete user request
};
