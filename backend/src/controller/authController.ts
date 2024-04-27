import express, { RequestHandler } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

export const getLoginPage: RequestHandler = (req, res, next) => {};

export const login: RequestHandler = (req, res, next) => {
  // Implementation for handling the login request
};

export const getSignUpPage: RequestHandler = (req, res, next) => {
  // Implementation for handling the sign-up page request
  res.json({ hi: "ho" });
};

export const signup: RequestHandler = async (req, res, next) => {
  const data = req.body;
  if (data.password.length >= 12) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    console.log(hashedPassword);
    const user = new User({
      ...data,
      password: hashedPassword,
      image: [],
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
